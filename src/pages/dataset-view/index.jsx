import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  getSpecificDataset,
  updateDataset,
} from "../../actions/datasetActions";
import { evaluate } from "mathjs";
import "./dataset-view.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const evaluateExpression = (data, expression) => {
  try {
    const context = { ...data };
    const result = evaluate(expression, context);
    return typeof result === "object" ? JSON.stringify(result) : result;
  } catch (error) {
    return "";
  }
};

const DatasetView = ({ updateDataset, dataset, getSpecificDataset }) => {
  console.log("Dataset",dataset)
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const datasetId = searchParams.get("id");
  useEffect(() => {
    datasetId && getSpecificDataset(datasetId);
    //eslint-disable-next-line
  }, []);
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
      type: newColumnType,
      expression: newColumnExpression,
    };
  
    try {
      // Update transformation steps first
      const updatedTransformationSteps = dataset.transformationSteps || [];
      updatedTransformationSteps.push({
        column: newColumn.title,
        type: newColumnType,
        expression: newColumnExpression,
      });
  
      // Append new column to safe data
      const updatedSafeData = safeData.Table.map(row => ({
        ...row,
        [newColumn.title]: newColumnType === 'Expression'
          ? evaluateExpression(row, newColumn.expression)
          : '',
      }));
  
      // Update dataset after appending column and updating transformation steps
      const updatedDataset = {
        ...dataset,
        transformationSteps: updatedTransformationSteps,
        dataSourceData: JSON.stringify(updatedSafeData),
      };
  
      // Calling updateDataset 
      await updateDataset(updatedDataset);
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }

    handleCancelClick();
  };
  
  
  const safeData = Array.isArray(dataset?.dataSourceData)
  ? dataset?.dataSourceData
  : JSON.parse(dataset?.dataSourceData || "[]");

  console.log("save data", safeData)
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
                  <select
                    value={newColumnType}
                    onChange={(e) => setNewColumnType(e.target.value)}
                  >
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
                  <button onClick={handleSaveColumn }>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              )}
            </div>
            <div className="data-set-table-container">
            <table>
  <thead>
    <tr>
      {safeData?.Table?.length > 0 &&
        Object.keys(safeData.Table[0] || {}).map((key) => (
          <th key={key}>{key}</th>
        ))}
      {isAddingColumn && <th>{newColumnTitle}</th>}
    </tr>
  </thead>
  <tbody>
    {safeData?.Table?.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key, i) => (
          <td key={i}>{row[key]}</td>
        ))}
           {isAddingColumn && (
          <td>{newColumnType === 'Expression'
            ? evaluateExpression(row, newColumnExpression)
            : ''}</td>
        )}
      </tr>
    ))}
  </tbody>
</table>
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

export default connect(mapStateToProps, { getSpecificDataset })(DatasetView);
