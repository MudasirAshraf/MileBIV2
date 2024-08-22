import React, { useState } from 'react';
import "./dataset-III.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import Three from '../../assets/png/3.png';
import DIII from "../../assets/svg/D3.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import Line from '../../assets/svg/line.svg';
import Ring from "../../assets/svg/ringround.svg";
import axios from 'axios';

const DatasetIII = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payload } = location.state || {};

  const [clickedTableData, setClickedTableData] = useState({});
  const [selectedTables, setSelectedTables] = useState([]);

  const handleDatasetII = () => {
    navigate("/create-dataset-II");
  };

  const handleDatasetIV = async () => {
    try {
      const requestPayload = {
        ...payload, 
        connectionString: "connectionString",
        datasetTitle: "tableName",
        userName: "userName",
        password: "password",
        DataSourceData: selectedTables.map(tabledata => clickedTableData[tabledata]?.Table || []),
      };
      console.log('Request Payload for save:', requestPayload);
      const config = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`,
        requestPayload,
        config
      );
      if (response.status === 200) {
        navigate("/create-dataset-IV");
      }
    } catch (error) {
      console.error('Error saving dataset:', error);
    }
  };

  const handleCheckboxChange = async (tableName) => {
    const newSelectedTables = selectedTables.includes(tableName)
      ? selectedTables.filter(name => name !== tableName)
      : [...selectedTables, tableName];
    
    setSelectedTables(newSelectedTables);

    if (!clickedTableData[tableName]) {
      try {
        const requestPayload = {
          ...payload,
          tableName,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        };
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_CONNECTOR}PostgreConnector/gettabledata`,
          requestPayload,
          config
        );
        setClickedTableData(prevState => ({
          ...prevState,
          [tableName]: response.data
        }));
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    }
  };
  const renderTables = () => {
    if (selectedTables.length === 0) {;
    }
  
    return selectedTables.map(tableName => {
      const tableData = clickedTableData[tableName];
      if (!tableData || !tableData.data) return <p key={tableName}>No data available for {tableName}</p>;
  
      const parsedData = JSON.parse(tableData.data);
      if (!parsedData.Table || !parsedData.Table.length) return <p key={tableName}>No data available for {tableName}</p>;
  
      const columns = Object.keys(parsedData.Table[0]);
  
      return (
        <div key={tableName} className="second-row-table-ds-III">
          <h3>{tableName}</h3>
          <table>
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.Table.map((row, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={column}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  };
  if (!data?.data) {
    return <p>No data available</p>;
  }

  return (
    <div className='main-container-dataset-III'>
      <div className='header-dataset-III'>
        <div>
          <img src={Back} alt="Back" style={{ cursor: "pointer" }} onClick={handleDatasetII} />
        </div>
        <div>
          <img src={Cross} alt="Close" />
        </div>
      </div>
      <div className='container-dataset-III'>
        <div className='first-row-dataset-III'>
          <p>Create a Dataset</p>
          <img src={DIII} alt="D3" />
          <div className='second-row-dataset-III'>
            <img src={Polygon} alt="Polygon" />
          </div>
          <div className='ring-dataset-III'>
            <img src={Ring} alt="Ring" />
          </div>
          <div className='ring-i-dataset-III'>
            <img src={Ring} alt="Ring" />
          </div>
        </div>
        <div className='third-row-dataset-III'>
          <img src={Three} alt="Three" />
        </div>
        <div className='header-dashboard-modals'>
          <p>Select Table / Data</p>
          <img src={Line} alt="Line" />
        </div>
        <div className='container-table-dataset-III'>
          <div className='main-container-table-dataset-III'>
            <div className='first-row-table-ds-III'>
              {JSON.parse(data.data).map((item) => (
                <div
                  className='first-column-ds-III'
                  key={item.table_name}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedTables.includes(item.table_name)} 
                    onChange={() => handleCheckboxChange(item.table_name)} 
                  />
                  <p>{item.table_name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='render-table-data'>  
            {renderTables()}
          </div>
        </div>
        <div className='button-dataset-III'>
          <button>Modify</button>
        </div>
        <div className='sql-query-ds-III'>
          <div className='input-data-ds-III'>
            <input type='text' placeholder='Enter SQL Query' name='sql-query' className='input-details-ds-III' />
          </div>
        </div>
        <div className='second-column-sql-query-ds-III'>
          <p>SQL Query Executed Successfully!</p>
          <button>Execute</button>
        </div>
        <div className='load-data-btn-ds-III'>
          <button onClick={handleDatasetIV}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DatasetIII;
