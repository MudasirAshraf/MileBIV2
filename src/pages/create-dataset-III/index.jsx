import React, { useState } from "react";
import "./dataset-III.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Group from "../../assets/svg/group-III.svg";
import Back from "../../assets/svg/Back.svg";
import Cross from "../../assets/svg/cross.svg";
import Line from "../../assets/svg/line.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataset,
  getSingleTableData,
  setSingleTableData,
  setRequestPayload,
} from "../../actions/datasetActions";
import { connect } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { setDatabaseDataPayload } from "../../actions/dataSourceActions";
import { toast } from "react-toastify";

const DatasetIII = ({
  data,
  setDatabaseDataPayload,
  dataSource,
  tables,
  loading,
  getSingleTableData,
  setSingleTableData,
  tabledata,
  addDataset,
  selectedDatabase,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payload } = location.state || {};
  const dispatch = useDispatch();

  const [selectedColumns, setSelectedColumns] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedTables, setSelectedTables] = useState(new Set());
  const [tableDatas, setTableDatas] = useState([]);
  const handleDatasetII = () => {
    navigate("/create-dataset-II");
  };

  const handleDatasetIV = async () => {
    try {
      if (tableDatas.length == 0) {
        toast.warn("Please select at least one dataset");
        return;
      }
      let hasError = false;
      const newErrors = {};
      tableDatas.forEach((_, index) => {
        if (!selectedColumns[index]) {
          newErrors[index] = "Primary key selection is required.";
          hasError = true;
        } else {
          _.primaryKey = selectedColumns[index];
        }
      });

      setErrors(newErrors);

      if (!hasError) {
        tableDatas.forEach(async (_, index) => {
          const requestPayload = {
            ...payload,
            connectionString: "connectionString",
            datasetTitle: _.tableName,
            userName: "userName",
            PrimaryKeyColumn: _.primaryKey,
            password: "password",
            databaseType: selectedDatabase,
            DataSourceData: _.Table,
          };
          await addDataset(requestPayload);
        });
        navigate("/create-dataset-IV");
      } else {
        toast.error("Please select primary key for all tables");
      }
    } catch (error) {
      console.error("Error saving dataset:", error);
    }
  };

  const handleColumnChange = (value, tableIndex) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [tableIndex]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [tableIndex]: value ? "" : "Primary key selection is required.",
    }));

    setTableDatas((prev) =>
      prev.map((tableData, index) =>
        index === tableIndex ? { ...tableData, primaryKey: value } : tableData
      )
    );
  };

  const handleCheckboxChange = async (tableName) => {
    try {
      // Check if the table is already selected
      if (selectedTables.has(tableName)) {
        // If table is already selected, remove it
        setSelectedTables((prev) => {
          const newSelected = new Set(prev);
          newSelected.delete(tableName);
          return newSelected;
        });

        // Remove table data from tableDatas
        setTableDatas((prev) =>
          prev.filter((tableData) => tableData.tableName !== tableName)
        );
      } else {
        // If table is not selected, fetch and add it
        const requestPayload = {
          ...payload,
          tableName,
        };

        dispatch(setRequestPayload(requestPayload));

        const databaseData = {
          ...dataSource,
          tableName: tableName,
        };

        dispatch(setDatabaseDataPayload(databaseData));

        // Fetch data for the table
        const value = await getSingleTableData(tableName, databaseData);
        if (value) {
          await setSingleTableData(value);
          tabledata &&
            setTableDatas((prev) => [
              ...prev,
              { tableName, primaryKey: "", Table: tabledata.Table },
            ]);
          // Add to selectedTables set
          setSelectedTables((prev) => new Set(prev).add(tableName));
        }
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const renderTables = () => {
    if (!tableDatas || tableDatas.length === 0) {
      return <p>No tables available to display.</p>;
    }

    return (
      <div>
        {tableDatas.map((tableData, tableIndex) => {
          if (!tableData || !tableData.Table || tableData.Table.length === 0) {
            return (
              <p key={tableIndex}>
                No data available for{" "}
                {tableData.tableName || `Table ${tableIndex + 1}`}
              </p>
            );
          }
          const columns = Object.keys(tableData.Table[0]);
          return (
            <div key={tableIndex} className="second-row-table-ds-III">
              <div style={{ marginTop: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel>Select Column</InputLabel>
                  <Select
                    value={selectedColumns[tableIndex] || ""}
                    onChange={(e) =>
                      handleColumnChange(e.target.value, tableIndex)
                    }
                  >
                    <MenuItem value="" disabled>
                      Choose a column
                    </MenuItem>
                    {columns.map((column) => (
                      <MenuItem key={column} value={column}>
                        {column}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.Table.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column) => (
                        <td className="text-primary" key={column}>
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  if (!tables) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <div className="main-container-dataset-III">
      <div className="header-dataset-III">
        <div>
          <img
            src={Back}
            alt="Back"
            style={{ cursor: "pointer" }}
            onClick={handleDatasetII}
          />
        </div>
        <div>
          <img src={Cross} alt="Close" />
        </div>
      </div>
      <div className="container-dataset-III">
        <div className="first-row-dataset-III">
          <p>Create a Dataset</p>
          <div className="progress-bar-forget-password-II">
            <img src={Group} alt="logo" />
          </div>
        </div>
        <div className="header-dashboard-modals">
          <p>Select Table / Data</p>
          <img src={Line} alt="Line" />
        </div>
        <div className="container-table-dataset-III">
          <div className="main-container-table-dataset-III">
            <div className="first-row-table-ds-III">
              {tables.map((item, index) => (
                <div className="first-column-ds-III" key={item.table_name}>
                  <input
                    type="checkbox"
                    name={index}
                    onChange={() => handleCheckboxChange(item.table_name)}
                  />
                  <p>{item.table_name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="render-table-data">{renderTables()}</div>
        </div>
        <div className="row d-flex justify-content-center text-center mt-3">
          <button
            type="submit"
            className="btn btn-primary w-auto"
            onClick={handleDatasetIV}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Submitting...
              </>
            ) : (
              "Save and Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataSource: state.dataSource.connectingDetail,
  tables: state.dataset.tables,
  tabledata: state.dataset.tabledata,
  loading: state.dataset.loading,
  selectedDatabase: state.dataSource.selectedDatabase,
});

export default connect(mapStateToProps, {
  setDatabaseDataPayload,
  getSingleTableData,
  setSingleTableData,
  addDataset,
})(DatasetIII);
