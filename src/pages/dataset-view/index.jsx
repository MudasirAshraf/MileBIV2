import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataset, addColumn, updateDataset } from '../../redux/datasetSlice';
import './dataset-view.scss';
import { evaluateExpression } from '../../redux/datasetSlice';

const DatasetView = () => {
  const dispatch = useDispatch();

  //  the current state using useSelector
  const { data, loading, error, transformationSteps } = useSelector((state) => state.dataset);

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnType, setNewColumnType] = useState('Regular');
  const [newColumnExpression, setNewColumnExpression] = useState('');

  useEffect(() => {
    dispatch(fetchDataset()); // Fetch the dataset when component mounts
  }, [dispatch]);

  const handleAddClick = () => {
    setIsAddingColumn(true);
  };

  const handleSaveColumn = () => {
    if (!newColumnTitle) return;

    const newColumn = {
      title: newColumnTitle,
      type: newColumnType,
      expression: newColumnType === 'Expression' ? newColumnExpression : '',
    };

    // Dispatch addColumn to update local state
    dispatch(addColumn(newColumn));

    // Create the updated dataset
    const currentDataset = {
      data: (data || []).map(row => ({
        ...row,
        dataSourceData: (row.dataSourceData || []).map(dtx => ({
          ...dtx,
          [newColumn.title]: newColumn.type === 'Expression'
            ? evaluateExpression(dtx, newColumn.expression)
            : '',
        })),
      })),
      transformationSteps: [
        ...transformationSteps,
        {
          Step: transformationSteps.length + 1,
          Type: 'AddColumn',
          Title: newColumn.title,
          ColumnCategory: newColumn.type,
          ...(newColumn.type === 'Expression' && { Expression: newColumn.expression }),
        },
      ],
    };

    // updateDataset to save to the server
    dispatch(updateDataset(currentDataset));

    setIsAddingColumn(false);
    setNewColumnTitle('');
    setNewColumnType('Regular');
    setNewColumnExpression('');
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle('');
    setNewColumnType('Regular');
    setNewColumnExpression('');
  };

  if (loading) {
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
                        {isAddingColumn && <td>{dtx[newColumnTitle] || ''}</td>}
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
