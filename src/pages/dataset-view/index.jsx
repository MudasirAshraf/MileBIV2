import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { evaluate } from 'mathjs';
import "./dataset-view.scss";
import { useLocation } from 'react-router-dom';

const DatasetView = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const datasetTitle = location.state?.datasetTitle;
  const datasetId = location.state?.datasetId; // Obtain DatasetId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("Regular");
  const [newColumnExpression, setNewColumnExpression] = useState("");
  const [transformationSteps, setTransformationSteps] = useState([]);
  const [updatedColumn, setUpdatedColumn] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem('addedColumns')) || [];
    if (data.length > 0) {
      console.log("Adding saved columns to the dataset:", savedColumns);
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
      console.log("Updated data after adding saved columns:", updatedData);
      setData(updatedData);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      console.log("Fetching data from API...");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        }
      });
      console.log("API response data:", response.data);
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        console.log("Data successfully fetched and set:", response.data.data);
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
    console.log("Add button clicked. Preparing to add a new column...");
    setIsAddingColumn(true);
  };

  const handleSaveColumn = async () => {
    if (!newColumnTitle) {
      console.warn("New column title is empty. Aborting save.");
      return;
    }

    const savedColumns = JSON.parse(localStorage.getItem('addedColumns')) || [];
    const newColumn = {
      title: newColumnTitle,
      type: newColumnType,
      expression: newColumnType === 'Expression' ? newColumnExpression : ""
    };

    const updatedColumns = [...savedColumns, newColumn];
    localStorage.setItem('addedColumns', JSON.stringify(updatedColumns));
    console.log("New column saved to localStorage:", newColumn);

    // Update data with the new column
    const updatedData = data.map(row => ({
      ...row,
      dataSourceData: (row.dataSourceData || []).map(dtx => ({
        ...dtx,
        [newColumnTitle]: newColumnType === "Expression" ? evaluateExpression(dtx, newColumn.expression) : "" // Default empty string for "Regular"
      }))
    }));
    console.log("Data updated with new column:", updatedData);

    setData(updatedData);
    setUpdatedColumn(newColumn);

    // Add transformation step
    const newStep = {
      Step: transformationSteps.length + 1,
      Type: 'AddColumn',
      Title: newColumnTitle,
      ColumnCategory: newColumnType,
      DatasetPrimaryKey: datasetId,
      ...(newColumnType === 'Expression' && { Expression: newColumnExpression })
    };

    setTransformationSteps([...transformationSteps, newStep]);
    console.log("New transformation step added:", newStep);

    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
    setIsAddingColumn(false);

    await updateDataOnServer();
  };

  const evaluateExpression = (data, expression) => {
    try {
      const context = { ...data };
      console.log("Evaluating expression:", expression, "with context:", context);
      const result = evaluate(expression, context);
      console.log("Evaluation result:", result);

      if (typeof result === 'object') {
        console.error("Evaluation result is an object:", result);
        return JSON.stringify(result);
      }
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", expression, "Error:", error.message);
      return "";
    }
  };

  const handleCancelClick = () => {
    console.log("Cancel button clicked. Resetting input fields.");
    setIsAddingColumn(false);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
  };

  const updateDataOnServer = async () => {
    try {
      if (datasetId && updatedColumn) {
        const payload = {
          columns: [{
            columnName: updatedColumn.title,
            columnType: updatedColumn.type,
            columnFormula: updatedColumn.expression
          }],
          transformationSteps: transformationSteps,  
        };

        console.log("Sending updated data to server with payload:", payload);
        const url = `${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset/${datasetId}`;
        const response = await axios.put(url, payload, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            'Content-Type': 'application/json',
          }
        });
        console.log('Data successfully updated on server:', response.data);
      }
    } catch (error) {
      console.error('Error updating data on server:', error.response?.data || error.message);
      setError('Failed to update data');
    }
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
                        {Object.keys(dtx || {}).map((key) => (
                          <td key={key}>{dtx[key]}</td>
                        ))}
                        {isAddingColumn && <td>{dtx[newColumnTitle] || ""}</td>}
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
