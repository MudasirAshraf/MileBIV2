import React from 'react';
import './simple-table.scss';

const SimpleTable = ({
  title = 'Table Title',
  headers = { HeaderI: 'Text', HeaderII: 'Sum', HeaderIII: 'Price', HeaderIV: 'Date' },
  data = [
    { HeaderI: 'Item A', HeaderII: 5, HeaderIII: 20.00, HeaderIV: '2024-08-01' },
    { HeaderI: 'Item B', HeaderII: 5, HeaderIII: 20.00, HeaderIV: '2024-08-01' },
    { HeaderI: 'Item C', HeaderII: 5, HeaderIII: 20.00, HeaderIV: '2024-08-01' },
    { HeaderI: 'Item D', HeaderII: 5, HeaderIII: 20.00, HeaderIV: '2024-08-01' },
  ],
}) => {
  return (
    <div className="simple-table-container">
      <h2 className="table-title">{title}</h2>
      <table className="simple-table">
        <thead>
          <tr>
            {Object.entries(headers).map(([key, label], index) => (
              <th key={index} className="table-header">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(headers).map((key, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
