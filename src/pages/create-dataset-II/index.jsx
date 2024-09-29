import React, { useState } from 'react';
import "./dataset-II.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import DII from "../../assets/svg/D2.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import Two from '../../assets/png/2.png';
import Line from '../../assets/svg/line.svg';
import Ring from "../../assets/svg/ringround.svg";
import axios from 'axios';

const DatasetII = ({ setData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { databaseType } = location.state || {};

  const handleDatasetI = () => {
    navigate("/create-dataset-I");
  };

  const [formData, setFormData] = useState({
    serverName: "",
    userName: "",
    password: "",
  });

  let handleNameChange = (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      return { ...currData, [fieldValue]: newValue };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        connectionString: formData.serverName,
        userName: formData.userName,
        password: formData.password,
        selectedDataSource: databaseType,
      };

      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IiIsImVtYWlsIjoibWFzaHJhZkBhYXRjLmNvLmluIiwibmFtZWlkIjoiNDMiLCJVc2VySWQiOiI0MyIsIk9yZ2FuaXphdGlvbklkIjoiMzMiLCJuYmYiOjE3MDE4NTUwOTAsImV4cCI6MTcwMjQ1OTg5MCwiaWF0IjoxNzAxODU1MDkwLCJpc3MiOiJ5b3VySXNzdWVyIiwiYXVkIjoieW91ckF1ZGllbmNlIn0.B1AleyHA1nH4xrOxEw-J7833e80lCi9hEZP4gXE-yk8`
        }
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_CONNECTOR}PostgreConnector/getalltables`, payload, config);
      console.log('Response:', response.data);
      setData(response.data);
      navigate("/create-dataset-III", { state: { payload } });  
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(formData);
  };

  return (
    <div className='main-container-dataset-II'>
      <div className='header-dataset-II'>
        <div>
          <img src={Back} alt="logo" style={{ cursor: "pointer" }} onClick={handleDatasetI} />
        </div>
        <div>
          <img src={Cross} alt="logo" />
        </div>
      </div>
      <div className='container-dataset-II'>
        <div className='first-row-dataset-II'>
          <p>Create a Dataset</p>
          <img src={DII} alt="logo" />
          <div className='second-row-dataset-II'>
            <img src={Polygon} alt="logo" />
          </div>
          <div className='ring-dataset-II'>
            <img src={Ring} alt="logo" />
          </div>
        </div>
        <div className='third-row-dataset-II'>
          <img src={Two} alt="logo" />
        </div>
        <div className='header-dashboard-modals'>
          <p>Enter Credentials</p>
          <img src={Line} alt="logo" />
        </div>
        <div>
          <form className='form-container-dataset-II' onSubmit={handleSubmit}>
            <div className='form-container-dataset-II-input-details'>
              <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                  type='text'
                  placeholder='Server'
                  name='serverName'
                  id='serverName'
                  value={formData.serverName}
                  onChange={handleNameChange}
                  required />
              </div>
              <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                  type='text'
                  placeholder='Username'
                  name='userName'
                  id='userName'
                  value={formData.userName}
                  onChange={handleNameChange}
                  required />
              </div>
              <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                  type='password'
                  placeholder='Password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleNameChange}
                  required />
              </div>
            </div>
            <div className='button-dataset-II'>
              <button type='submit'>Connect</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DatasetII;
