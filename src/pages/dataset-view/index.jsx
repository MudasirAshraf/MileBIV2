import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { getSpecificDataset, updateDataset } from "../../actions/datasetActions";
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

const DatasetView = ({updateDataset,dataset,getSpecificDataset}) => {
  const location = useLocation();
  const [searchParams]=useSearchParams();
  const datasetId=searchParams.get("id");
  useEffect(()=>{
datasetId && getSpecificDataset(datasetId)
//eslint-disable-next-line
  },[])
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

    try {
      const updatedDataset = {
        ...dataset,
        columns: [...(dataset.columns || []), newColumn] 
      };

      setCurrent(updatedDataset);
      await updateDataset(updatedDataset);
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }

    handleCancelClick();
  };
 

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
                  {dataset.columns && dataset.columns.length > 0 &&
                    dataset.columns.map((column, index) => (
                      <th key={index}>{column.title}</th>
                    ))}
                  {isAddingColumn && <th>{newColumnTitle}</th>}
                </tr>
              </thead>
              <tbody>
                {dataset.rows && dataset.rows.map((row, index) => (
                  <tr key={index}>
                    {dataset.columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.type === 'Expression' && isAddingColumn
                          ? evaluateExpression(row, newColumnExpression)
                          : row[column.title] || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
DatasetView.propTypes = {
  getSpecificDataset: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  response: state.response.response,
  dataset:state.dataset.current,

});

export default connect(mapStateToProps, { getSpecificDataset })(DatasetView);