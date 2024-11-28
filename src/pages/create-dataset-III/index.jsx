import React, { useState } from "react";
import "./dataset-III.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Back from "../../assets/svg/Back.svg";
import Cross from "../../assets/svg/cross.svg";
import Three from "../../assets/png/3.png";
import DIII from "../../assets/svg/D3.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Line from "../../assets/svg/line.svg";
import Ring from "../../assets/svg/ringround.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataset,
  getSingleTableData,
  setSingleTableData,
  setRequestPayload,
} from "../../actions/datasetActions";
import { connect } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { setDatabaseDataPayload } from "../../actions/dataSourceActions";

const DatasetIII = ({
  data,
  setDatabaseDataPayload,
  dataSource,
  tables,
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
  // const tabledata = useSelector((state) => state.dataset.tabledata);
  const [primaryKeyModal, setPrimaryKeyModal] = useState({
    open: false,
    columns: [],
    onSelect: () => {},
  });

  const [clickedTableData, setClickedTableData] = useState({});
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  const handleDatasetII = () => {
    navigate("/create-dataset-II");
  };

  const closeModal = () => {
    setPrimaryKeyModal((prev) => ({ ...prev, open: false }));
  };

  const handleDatasetIV = async () => {
    try {
      // Loop through selected tablesni

      // for (const tableName of selectedTables) {
      // const tableData = clickedTableData;
      const safeData = tabledata;

      // Open modal to select primary key
      const columns = Object.keys(safeData.Table[0]);
      const primaryKey = await openPrimaryKeyModal(columns);

      // Continue with the API request if primary key is selected
      if (!primaryKey) {
        alert("Primary key selection is required.");
        return;
      }

      const requestPayload = {
        ...payload,
        connectionString: "connectionString",
        datasetTitle: selectedTable,
        userName: "userName",
        PrimaryKeyColumn: primaryKey,
        password: "password",
        databaseType: selectedDatabase,
        DataSourceData: safeData.Table,
      };

      await addDataset(requestPayload);
      navigate("/create-dataset-IV");
      // }
    } catch (error) {
      console.error("Error saving dataset:", error);
    }
  };

  const handleCheckboxChange = async (tableName) => {
    try {
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
      const value = await getSingleTableData(tableName, databaseData);
      if (value) {
        await setSingleTableData(value);
      }
      setSelectedTable(tableName);
      // setClickedTableData(tabledata);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const renderTables = () => {
    const parsedData = tabledata;
    if (!parsedData || !parsedData?.Table?.length)
      return (
        <p key={dataSource.tableName}>No data available for {selectedTable}</p>
      );

    const columns = Object.keys(parsedData.Table[0]);
    return (
      <div key={selectedTable} className="second-row-table-ds-III">
        <h3>{selectedTable}</h3>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.Table.map((row, index) => (
              <tr key={index}>
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
  };

  if (!tables) {
    return <p className="text-center">No data available</p>;
  }

  // Component for Primary Key Modal
  const PrimaryKeyModal = ({ open, onClose, columns, onSelect }) => (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          minWidth: "300px",
        }}
      >
        <h2>Select Primary Key</h2>
        <FormControl fullWidth>
          <InputLabel>Select Primary Key</InputLabel>
          <Select onChange={(e) => onSelect(e.target.value)} defaultValue="">
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={onClose} style={{ marginTop: "20px" }}>
          Close
        </Button>
      </div>
    </Modal>
  );

  // Function to open modal and wait for selection
  const openPrimaryKeyModal = (columns) => {
    return new Promise((resolve) => {
      setPrimaryKeyModal({
        open: true,
        columns,
        onSelect: (selectedColumn) => {
          resolve(selectedColumn);
          closeModal();
        },
      });
    });
  };

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
          <img src={DIII} alt="D3" />
          <div className="second-row-dataset-III">
            <img src={Polygon} alt="Polygon" />
          </div>
          <div className="ring-dataset-III">
            <img src={Ring} alt="Ring" />
          </div>
          <div className="ring-i-dataset-III">
            <img src={Ring} alt="Ring" />
          </div>
        </div>
        <div className="third-row-dataset-III">
          <img src={Three} alt="Three" />
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
                    type="radio"
                    name={index}
                    checked={selectedTable == item.table_name}
                    onChange={() => handleCheckboxChange(item.table_name)}
                  />
                  <p>{item.table_name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="render-table-data">{renderTables()}</div>
        </div>
        {/* <div className="button-dataset-III">
          <button>Modify</button>
        </div>
        <div className="sql-query-ds-III">
          <div className="input-data-ds-III">
            <input
              type="text"
              placeholder="Enter SQL Query"
              name="sql-query"
              className="input-details-ds-III"
            />
          </div>
        </div>
        <div className="second-column-sql-query-ds-III">
          <p>SQL Query Executed Successfully!</p>
          <button>Execute</button>
        </div> */}
        <div className="load-data-btn-ds-III">
          <button onClick={handleDatasetIV}>Save</button>
        </div>
      </div>

      {primaryKeyModal.open && (
        <PrimaryKeyModal
          open={primaryKeyModal.open}
          onClose={closeModal}
          columns={primaryKeyModal.columns}
          onSelect={primaryKeyModal.onSelect}
        />
      )}
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
