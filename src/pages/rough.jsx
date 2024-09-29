import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getSpecificDataset, updateDataset, appendTransformation } from "../../actions/datasetActions";
import { evaluate } from "mathjs";
import { DataGrid } from "@mui/x-data-grid";
import "./dataset-view.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

// Utility function to evaluate expressions using math.js
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
  const [searchParams] = useSearchParams();
  const datasetId = searchParams.get("id");
  const location = useLocation();
const { requestPayload } = location.state || {};

  useEffect(() => {
    datasetId && getSpecificDataset(datasetId);
    fetchData(requestPayload);
  }, []);

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("Regular");
  const [newColumnExpression, setNewColumnExpression] = useState("");
  const [primaryKey, setPrimaryKey] = useState(""); // State for primary key

  const handleAddClick = () => {
    setIsAddingColumn(true);
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
    setPrimaryKey("");
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleSaveColumn = async () => {
    const newColumn = {
      title: newColumnTitle,
      type: newColumnType || "Regular",
      expression: newColumnExpression,
      uuid: generateUUID(),
    };


    try {
      const updatedTransformationSteps = dataset.transformationSteps || [];
      const regularColumnValues = dataset.dataSourceData.map(row => ({
        primary: row[primaryKey],
        rowid: row[primaryKey],
        value: row[newColumn.title] || '',
      }));

      updatedTransformationSteps.push({
        column: newColumn.title,
        type: newColumnType,
        expression: newColumn.type === "Expression" ? newColumnExpression : "",
        primary: primaryKey,
        values: regularColumnValues,
        uuid: newColumn.uuid,
      });

      dataset.transformationSteps = updatedTransformationSteps;

      // Append new column to safe data
      const updatedSafeData = dataset.dataSourceData.map((row) => ({
        ...row,
        [newColumn.title]: newColumnType === "Expression" ? evaluateExpression(row, newColumn.expression) : "",
      }));

      dataset.dataSourceData = updatedSafeData;

      // Update dataset
      await updateDataset(dataset);
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }

    handleCancelClick();
  };

  // Fetch Data from coonector API
  const fetchConnectorData = async (requestPayload) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_CONNECTOR}PostgreConnector/gettabledata`,
        requestPayload,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
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
  

  // Fetch data from connector API and merge with dataset
  const fetchData = async (requestPayload) => {
    try {
      const connectorData = await fetchConnectorData(requestPayload); 
      mergeData(connectorData); 
      console.log("Connector DATA ", connectorData);
    } catch (error) {
      console.error("Failed to fetch or merge data:", error);
    }
  };
  

  // Function to merge dataset data with connector data
  const mergeData = (connectorData) => {
    const mergedData = dataset?.dataSourceData.map((row) => {
      const matchingConnectorRow = connectorData.find(
        (connectorRow) => connectorRow.primaryKey === row[primaryKey]
      );

      return matchingConnectorRow
        ? { ...row, ...matchingConnectorRow }
        : row;
    });
    console.log("merged data:", mergedData);

    // Add new rows from connectorData 
    connectorData.forEach((connectorRow) => {
      if (!mergedData.some((row) => row[primaryKey] === connectorRow.primaryKey)) {
        mergedData.push(connectorRow);
      }
    });
    console.log("Final merged data :", mergedData);

  
    dataset.dataSourceData = mergedData;
    updateDataset(dataset); 
  };

  const safeData = dataset?.dataSourceData || [];

  // Generating columns for DataGrid
  const columns = Object.keys(safeData[0] || {}).map((key) => {
    return {
      field: key,
      headerName: key,
      width: 150,
      editable: dataset.transformationSteps && dataset.transformationSteps.find(col => col.column === key)
        ? dataset.transformationSteps.find(col => col.column === key).type !== 'Expression' 
          ? true 
          : false 
        : false,
    };
  });

  // Add new column if adding
  if (isAddingColumn) {
    columns.push({
      field: newColumnTitle,
      headerName: newColumnTitle,
      width: 150,
      editable: newColumnType === 'Regular',
      renderCell: (params) => {
        return newColumnType === "Expression" 
          ? evaluateExpression(params.row, newColumnExpression) 
          : params.value;
      },
    });
  }

  // Updating Data rows
  const rows = safeData.map((row, index) => ({ id: index, ...row }));
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map(row => {
      const { id, ...rowWithoutId } = row;
      return row.id === newRow.id ? { ...newRow } : rowWithoutId;
    });
    dataset.dataSourceData = updatedRows;
    updateDataset(dataset);
    return newRow;
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
                  <input
                    className="inp-adding-button"
                    type="text"
                    placeholder="Enter Primary Key"
                    value={primaryKey}
                    onChange={(e) => setPrimaryKey(e.target.value)}
                  />
                  <button onClick={handleSaveColumn}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              )}
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
