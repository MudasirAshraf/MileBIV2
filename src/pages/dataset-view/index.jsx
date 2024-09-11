import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { updateDataset } from "../../actions/datasetActions";
import { evaluate } from 'mathjs';
import "./dataset-view.scss";
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';


export const evaluateExpression = (data, expression) => {
  try {
    const context = { ...data }; 
    const result = evaluate(expression, context); 
    return typeof result === 'object' ? JSON.stringify(result) : result;
  } catch (error) {
    console.error('Error evaluating expression:', error.message);
    return ''; 
  }
};

const DatasetView = ({updateDataset,dataset}) => {
  const location = useLocation();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnType, setNewColumnType] = useState('Regular');
  const [newColumnExpression, setNewColumnExpression] = useState('');
  

  const handleAddClick = () => {
    setIsAddingColumn(true);
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle('');
    setNewColumnType('Regular');
    setNewColumnExpression('');
  };

  const handleSaveColumn = async () => {
    const newColumn = {
      title: newColumnTitle,
      type: newColumnType,
      expression: newColumnExpression
    };

//add column => create a function in datasetactions that updates transformation steps of current variable
//or i can just do it here directly then send single complete dataset to updatedataset action
//updateDataset(safeData) if it is in local page then append transformation node here directly, if object is in reducer state then define actions




    try {
      // Update the local dataset state first
      const updatedDataset = {
        columns: [...(data.columns || []), newColumn] 
      };

      //  setCurrent action to update the state
      dispatch(setCurrent(updatedDataset));

      await dispatch(updateDataset(updatedDataset));

    } catch (error) {
      console.error("Failed to save dataset:", error);
    }

    handleCancelClick();
  };
console.log(dataset)
  const safeData =dataset && Array.isArray(dataset) ? dataset : [];
  console.log(safeData)

  return (dataset &&
    <div className='main-container-dataset-view'>
      <div className='container-dataset-view'>
        <div className='dataset-table-container'>
          <div className='dataset-table-header'>
            {!isAddingColumn && <button onClick={handleAddClick}>Add</button>}
            {isAddingColumn && (
              <div className="add-column-inputs">
                <input
                  className='inp'
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
                {newColumnType === 'Expression' && (
                  <input
                    className='inp'
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
          </div>
          <div className='data-set-table-container'>
            <table>
              <thead>
                <tr>
                  {safeData.length > 0 &&
                    Object.keys(safeData[0].dataSourceData?.[0] || {}).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  {isAddingColumn && <th>{newColumnTitle}</th>}
                </tr>
              </thead>
              <tbody>
                {safeData.map((row, index) => (
                  <React.Fragment key={index}>
                    {row.dataSourceData?.map((dtx, j) => (
                      <tr key={`${index}-${j}`}>
                        {Object.keys(dtx || {}).map((key) => (
                          <td key={key}>{dtx[key]}</td>
                        ))}
                        {isAddingColumn && (
                          <td>
                            {newColumnType === 'Expression'
                              ? evaluateExpression(dtx, newColumnExpression)
                              : dtx[newColumnTitle] || ''}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetView;
