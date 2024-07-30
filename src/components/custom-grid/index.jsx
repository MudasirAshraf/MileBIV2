import React, { useState } from 'react';
import './custom-grid.scss';

const CustomGrid = ({ onCreate }) => {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);

  const handleCreate = () => {
    onCreate(rows, cols);
  };

  return (
    <div className="container">
      <h6 className="title">Custom Grid</h6>
      <div className='main-container-control'>
        <div className="control">
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min="1"
            className="input"
          />
          <label>Rows</label>
        </div>
        <div className="control">
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
            min="1"
            className="input"
          />
          <label>Cols</label>
        </div>
      </div>
      <button className="button" onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CustomGrid;
