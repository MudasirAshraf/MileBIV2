import React from 'react';
import './simple-table.scss';

const SimpleTable = ({ option }) => {
  // Extract headers dynamically from the first element in data
  const headers = option?.options?.data?.length > 0 ? Object.keys(option?.options?.data[0]) : [];
  return (
    <div className="simple-table-container">
      {/* <h2 className="table-title">{option?.options?.title}</h2> */}
      <table className="simple-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {option?.options?.data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((key, colIndex) => (
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
