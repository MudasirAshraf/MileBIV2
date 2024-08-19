import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./dataset-I.scss";
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import DI from "../../assets/svg/D1.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import One from '../../assets/png/1.png';
import Line from '../../assets/svg/line.svg';
import I1 from '../../assets/svg/I1.svg';
import I2 from '../../assets/svg/I2.svg';
import I3 from '../../assets/svg/I3.svg';
import I4 from '../../assets/svg/I4.svg';
import I5 from '../../assets/svg/I5.svg';

const DatasetI = () => {
    const navigate = useNavigate();

    const handleDatasetII = (databaseType) => {
      navigate('/create-dataset-II', { state: { databaseType } });
    };

    const handleCreateDashboard = () => {
      navigate("/create-dashboard");
    };

    return (
      <div className='main-container-dataset-I'>
        <div className='header-dataset-I'>
          {/* Adding Header */}
          <div>
            <img src={Back} alt="logo" style={{ cursor: "pointer" }} onClick={handleCreateDashboard} />
          </div>
          <div>
            <img src={Cross} alt="logo" />
          </div>
        </div>
        {/* Main container */}
        <div className='container-dataset-I'>
          {/* first row */}
          <div className='first-row-dataset-I'>
            <p>Create a Dataset</p>
            <img src={DI} alt="logo" />
            <div className='second-row-dataset-I'>
              <img src={Polygon} alt="logo" />
            </div>
          </div>
          <div className='third-row-dataset-I'>
            <img src={One} alt="logo" />
          </div>
          <div className='header-dashboard-modals'>
            <p>Select Data Source</p>
            <img src={Line} alt="logo" />
          </div>
          {/* cards container */}
          <div className='cards-container-dataset-I'>
            {/* first card */}
            <div className='card-I-dataset-I' onClick={() => handleDatasetII('SQLServer')}>
              <div>
                <img src={I1} alt="logo" />
              </div>
              <div>
                <p>SQL Server</p>
              </div>
            </div>
            {/* second card */}
            <div className='card-I-dataset-I' onClick={() => handleDatasetII('Postgre')}>
              <div>
                <img src={I2} alt="logo" />
              </div>
              <div>
                <p>Postgre</p>
              </div>
            </div>
            {/* Third card */}
            <div className='card-I-dataset-I' onClick={() => handleDatasetII('Oracle')}>
              <div>
                <img src={I3} alt="logo" />
              </div>
              <div>
                <p>Oracle Database</p>
              </div>
            </div>
            {/* Fourth card */}
            <div className='card-I-dataset-I' onClick={() => handleDatasetII('IBM')}>
              <div>
                <img src={I4} alt="logo" />
              </div>
              <div>
                <p>IBM DB</p>
              </div>
            </div>
            {/* Fifth card */}
            <div className='card-I-dataset-I' onClick={() => handleDatasetII('Excel')}>
              <div>
                <img src={I5} alt="logo" />
              </div>
              <div>
                <p>Excel</p>
              </div>
            </div>
          </div>
          {/* Adding Button */}
          <div className='button-dataset-I'>
            <button onClick={() => handleDatasetII()}>Proceed</button>
          </div>
        </div>
      </div>
    )
}

export default DatasetI;
