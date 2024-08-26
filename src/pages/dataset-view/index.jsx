import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { evaluate } from 'mathjs'; 
import "./dataset-view.scss";
import { useLocation } from 'react-router-dom';

const DatasetView = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const datasetTitle = location.state?.datasetTitle;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("Regular");
  const [newColumnExpression, setNewColumnExpression] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Load persisted columns from localStorage
    const savedColumns = JSON.parse(localStorage.getItem('addedColumns')) || [];
    if (data.length > 0) {
      const updatedData = data.map(row => ({
        ...row,
        dataSourceData: (row.dataSourceData || []).map(dtx => ({
          ...dtx,
          ...savedColumns.reduce((acc, col) => ({
            ...acc,
            [col.title]: col.type === 'Expression' ? evaluateExpression(dtx, col.expression) : ""
          }), {})
        }))
      }));
      setData(updatedData);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        }
      });
      console.log('Fetched Data:', response.data); // Debug data structure
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        throw new Error('Unexpected data format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAddingColumn(true);
  };

  const handleSaveColumn = () => {
    if (!newColumnTitle) return;

    // Save new column data to localStorage
    const savedColumns = JSON.parse(localStorage.getItem('addedColumns')) || [];
    const updatedColumns = [...savedColumns, {
      title: newColumnTitle,
      type: newColumnType,
      expression: newColumnType === 'Expression' ? newColumnExpression : ""
    }];
    localStorage.setItem('addedColumns', JSON.stringify(updatedColumns));

    // Update data with the new column
    const updatedData = data.map(row => ({
      ...row,
      dataSourceData: (row.dataSourceData || []).map(dtx => ({
        ...dtx,
        [newColumnTitle]: newColumnType === "Expression" ? evaluateExpression(dtx, newColumnExpression) : ""
      }))
    }));

    setData(updatedData);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
    setIsAddingColumn(false);
  };

  const evaluateExpression = (data, expression) => {
    try {
      // Defined a context with data variables
      const context = { ...data };
      // Use mathjs to safely evaluate the expression within the context
      const result = evaluate(expression, context);

      // Ensure the result is a primitive value
      if (typeof result === 'object') {
        console.error("Evaluation result is an object:", result);
        // Convert object to string if needed
        return JSON.stringify(result); 
      }
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return "";
    }
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='main-container-dataset-view'>
      <div className='container-dataset-view'>
        <div className='dataset-table-container'>
          <div className='dataset-table-header'>
          <p>{datasetTitle}</p>
            {!isAddingColumn && <button onClick={handleAddClick}>Add</button>}
            {isAddingColumn && (
              <div className="add-column-inputs">
                <input className='inp'
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
                  <input className='inp'
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
                  {data.length > 0 &&
                    Object.keys(data[0].dataSourceData?.[0] || {}).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  {isAddingColumn && <th>{newColumnTitle}</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <React.Fragment key={index}>
                    {row.dataSourceData?.map((dtx, j) => (
                      <tr key={`${index}-${j}`}>
                        {Object.keys(dtx || {}).map((key, k) => (
                          <td key={k}>
                            {typeof dtx[key] === 'object' ? JSON.stringify(dtx[key]) : dtx[key]}
                          </td>
                        ))}
                        {isAddingColumn && (
                          <td>
                            {newColumnType === "Regular" ? "" : evaluateExpression(dtx, newColumnExpression)}
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
