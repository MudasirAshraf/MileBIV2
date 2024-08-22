import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./dataset-view.scss"

const DatasetView = () => {
  const location = useLocation();
  const title = location.state?.title;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DASHBOARD}Dataset`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
            params: { title },
          });
          setData(response.data.data || response.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch data');
          setLoading(false);
        }
      }
    fetchData();
  },[]);

  if (loading && !data) {
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
            <p>{title}</p>
          </div>
          <div className='data-set-table-container'>
          <table>
  <thead>
    <tr>
      {
      data.length > 0 &&
        Object.keys(data[0].dataSourceData[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
    </tr>
  </thead>
  <tbody>
    { 
    data.map((row, index) => (
      <React.Fragment key={index}>
        {row.dataSourceData?.map((dtx, j) => (
          <tr key={`${index}-${j}`}>
            {Object.keys(dtx).map((key, k) => (
              <td key={k}>{dtx[key]}</td>
            ))}
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
