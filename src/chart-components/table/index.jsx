import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import "./simple-table.scss";

const SimpleTable = ({ option, gridHeight, overflow, index, dashboard, updateDashboard }) => {
  const initialHeaders = option?.options?.data?.length > 0 ? Object.keys(option?.options?.data[0]) : [];

  const existingHeaders = dashboard?.datasetsTree?.[index]?.headerMappings || {};
  const savedHeaders = initialHeaders.reduce((acc, key) => {
    acc[key] = existingHeaders[key] ?? key;
    return acc;
  }, {});

  const [headerMappings, setHeaderMappings] = useState(savedHeaders);
  const [editingHeader, setEditingHeader] = useState(null);

  useEffect(() => {
    setHeaderMappings(savedHeaders);
  }, [dashboard, index]);

  const handleHeaderChange = (key, newLabel) => {
    setHeaderMappings((prev) => ({ ...prev, [key]: newLabel }));
  };

  const handleBlur = async (key) => {
    setEditingHeader(null);

    const updatedDashboard = {
      ...dashboard,
      datasetsTree: dashboard.datasetsTree.map((item, i) =>
        i === index ? { ...item, headerMappings } : item
      ),
    };

    await updateDashboard(updatedDashboard);
  };

  return (
    <div className="simple-table-container" style={{ height: gridHeight + "px", overflowY: overflow }}>
      <table className="simple-table">
        <thead>
          <tr>
            {initialHeaders.map((key, colIndex) => (
              <th key={colIndex} className="table-header" onClick={() => setEditingHeader(key)}>
                {editingHeader === key ? (
                  <input
                    type="text"
                    value={headerMappings[key]}
                    onChange={(e) => handleHeaderChange(key, e.target.value)}
                    onBlur={() => handleBlur(key)}
                    autoFocus
                    className="header-input"
                  />
                ) : (
                  <span title={`Original: ${key}`}>{headerMappings[key]}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {option?.options?.data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {initialHeaders.map((key, colIndex) => (
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

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, { updateDashboard })(SimpleTable);
