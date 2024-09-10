import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrent, updateDataset } from "../../actions/datasetActions";
import { evaluate } from 'mathjs';
import "./dataset-view.scss";


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

const DatasetView = () => {
  const location = useLocation();
  const title = location.state?.title;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnType, setNewColumnType] = useState('Regular');
  const [newColumnExpression, setNewColumnExpression] = useState('');
  const dispatch = useDispatch();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          params: { title },
        });
        setData(response.data.data || response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, [title]);

  if (loading && !data) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const safeData = Array.isArray(data) ? data : [];

  return (
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
