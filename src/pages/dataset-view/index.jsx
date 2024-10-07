import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSpecificDataset, updateDataset, appendTransformation } from "../../actions/datasetActions";
import { evaluate } from "mathjs";
import { DataGrid } from "@mui/x-data-grid";
import "./dataset-view.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

 
export const evaluateExpression = (data, expression) => {
  try {
    const context = { ...data };
    const result = evaluate(expression, context);
    return typeof result === "object" ? JSON.stringify(result) : result;
  } catch (error) {
    return "";
  }
};

const DatasetView = ({ updateDataset, dataset, getSpecificDataset, appendTransformation }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const datasetId = searchParams.get("id");


const requestPayload = useSelector(state => state.dataset.requestPayload);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    datasetId && getSpecificDataset(datasetId); 
    fetchData(requestPayload);
  }, []);


  const fetchDataAndMerge = async (requestPayload, dataSourceData) => {
    try {
      const connectorData = await fetchConnectorData(requestPayload);

      // Merge the data and generate UUIDs
      const mergedData = dataSourceData.map((datasetRow) => {
        const connectorRow = connectorData.find((connectorRow) => connectorRow.id === datasetRow.id);
        return {
          ...datasetRow,
          ...connectorRow, 
          id: uuidv4(), 
        };
      });
      setMergedData(mergedData); 
      console.log("Merged Data: ", mergedData);
    } catch (error) {
      console.error("Failed to merge data:", error);
    }
  };

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("Regular");
  const [newColumnExpression, setNewColumnExpression] = useState("");

  const handleAddClick = () => {
    setIsAddingColumn(true);
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
  };

  const handleSaveColumn = async () => {
    const newColumn = {
      title: newColumnTitle,
      type: newColumnType || "Regular",
      expression: newColumnExpression,
    };
    try {
      // Update transformation steps first
      const updatedTransformationSteps = [];
      updatedTransformationSteps.push({
        column: newColumn.title,
        type: newColumnType,
        expression: newColumn.type === "Expression" ? newColumnExpression : "",
        uuid: uuidv4(), 
      });
      //appendTransformation(updatedTransformationSteps);
      const steps=dataset.transformationSteps===null?[]:dataset.transformationSteps;
      steps.push(updatedTransformationSteps[0])
       dataset.transformationSteps=[...steps]
       console.log("Steps" ,steps);

      // Append new column to safe data
      const updatedSafeData = dataset.dataSourceData.map((row) => ({
        ...row,
        [newColumn.title]: newColumnType === "Expression" ? evaluateExpression(row, newColumn.expression) : "",
      }));
      dataset.dataSourceData = updatedSafeData;
      // Calling updateDataset
      await updateDataset(dataset);
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }

    handleCancelClick();
  };

  const safeData = dataset?.dataSourceData || [];
// Generating columns for DataGrid
const columns = Object.keys(safeData[0] || {}).map((key) => {
  return {
    field: key,
    headerName: key,
    width: 150,
    editable: dataset.transformationSteps && dataset.transformationSteps.find(col => col.column === key)?dataset.transformationSteps.find(col => col.column === key).type !==  'Expression'?true:false:false,
  };
});

 // Fetch Data from coonector API
 const fetchConnectorData = async (requestPayload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL_CONNECTOR}PostgreConnector/gettabledata`,
      requestPayload,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json', 
        },
      }
    );
    const connectorData = JSON.parse(response.data.data); 
    console.log('Connector data fetched successfully:', connectorData);
    return connectorData.Table; 
  } catch (error) {
    console.error('Failed to fetch connector data:', error);
    throw error;
  }
};

// Fetch connector data
const fetchData = async (requestPayload) => {
  console.log("Request Payload: ", requestPayload);
  try {
    const connectorData = await fetchConnectorData(requestPayload); 
    console.log("Connector DATA ", connectorData);
  } catch (error) {
    console.error("Failed to fetch or merge data:", error);
  }
};

// Refesh Button Functionality 
const handleRefresh = async () => {
  try {
    if (requestPayload && dataset?.dataSourceData) {
      await fetchDataAndMerge(requestPayload, dataset.dataSourceData);
    }
  } catch (error) {
    console.error("Failed to refresh data:", error);
  }
};


  // Add new column
  if (isAddingColumn) {
    columns.push({
      field: newColumnTitle,
      headerName: newColumnTitle,
      width: 150,
      editable: newColumnType === 'Regular',
      renderCell: (params) => {
        return newColumnType === "Expression" ? evaluateExpression(params.row, newColumnExpression) : params.value;
      },
    });
  }

  //Updating  Data rows
  const rows = safeData.map((row, index) => ({ id: index, ...row }));
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map(row => {
      const { id, ...rowWithoutId } = row; // Exclude id when adding column
      return row.id === newRow.id ? { ...newRow } : rowWithoutId;
    });
    dataset.dataSourceData = updatedRows;
    updateDataset(dataset);
    return newRow;
  };

  const ShowTransformationSteps = () => {
    navigate("/transformation-steps", { state: { steps: dataset.transformationSteps } });
  };

  return (
    dataset && (
      <div className="main-container-dataset-view">
        <div className="container-dataset-view">
          <div className="dataset-table-container">
            <div className="dataset-table-header">
              {!isAddingColumn && <button onClick={handleAddClick}>Add</button>}
              {isAddingColumn && (
                <div className="add-column-inputs">
                  <input
                    className="inp-adding-button"
                    type="text"
                    placeholder="Enter Title"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                  />
                  <select value={newColumnType} onChange={(e) => setNewColumnType(e.target.value)}>
                    <option value="Regular">Regular</option>
                    <option value="Expression">Expression</option>
                  </select>
                  {newColumnType === "Expression" && (
                    <input
                      className="inp-adding-button"
                      type="text"
                      placeholder="Enter Expression"
                      value={newColumnExpression}
                      onChange={(e) => setNewColumnExpression(e.target.value)}
                    />
                  )}
                  <button onClick={handleSaveColumn}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              )}
              <button onClick={ShowTransformationSteps}>Show Transformation Steps</button>
              <button onClick={handleRefresh}>Refresh Data</button>
            </div>
            <div className="data-set-table-container">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                processRowUpdate={handleProcessRowUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

DatasetView.propTypes = {
  getSpecificDataset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.response.response,
  dataset: state.dataset.current,
});

export default connect(mapStateToProps, { getSpecificDataset, appendTransformation, updateDataset })(DatasetView);