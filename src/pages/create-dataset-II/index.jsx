import React from 'react';
import "./dataset-II.scss";
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import DII from "../../assets/svg/D2.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import Two from '../../assets/png/2.png';
import Line from '../../assets/svg/line.svg';
import Ring from "../../assets/svg/ringround.svg";

const DatasetII = () => {
    const navigate = useNavigate();
    const handleDatasetI = () => {
        navigate("/create-dataset-I")
    };

    const handleDatasetIII = () =>{
     navigate("/create-dataset-III")
    };

  return (
    <div className='main-container-dataset-II'>
        <div className='header-dataset-II'>
        {/* Adding Header */}
      <div>
  <img src={Back} alt="logo" style={{cursor:"pointer"}} onClick={handleDatasetI}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
      </div>
        {/* Main container */}
        <div className='container-dataset-II'>
      {/* first row */}
      <div className='first-row-dataset-II'>
      <p>Create a Dataset</p>
      <img src={DII} alt="logo"/>
      <div className='second-row-dataset-II'>
        <img src={Polygon} alt="logo"/>
      </div>
      <div className='ring-dataset-II'>
        <img src={Ring} alt="logo"/>
      </div>
      </div>
      <div className='third-row-dataset-II'>
      <img src={Two} alt="logo"/>
      </div>
      <div className='header-dashboard-modals'>
          <p>Enter Credentials</p>
          <img src={Line} alt="logo"/>
        </div>
           {/* Adding Form */}
           <div>
            <form className='form-container-dataset-II'>
                {/* first row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input type='text' placeholder='Server' name='server' className='input-details-sign-in-row-I-dataset-II' required/>
            </div>
            {/* second row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input type='text' placeholder='Username' name='username' className='input-details-sign-in-row-I-dataset-II' required/>
            </div>
            {/* third row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input type='password'placeholder='Password' name='password' className='input-details-sign-in-row-I-dataset-II' required />
            </div>
            </form>
        </div>
        <div className='button-dataset-II'>
            <button onClick={handleDatasetIII}>Connect</button>
        </div>
        </div>
    </div>
  )
}

export default DatasetII;
