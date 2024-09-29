import React from 'react';
import "./modal-V.scss";
import CenterLogo from "../../assets/svg/data.svg";
import { useNavigate } from 'react-router-dom';

const CreateDashboardModalV = () => {
  const navigate = useNavigate();

  const handleNavigate = ()=> {
    navigate("/create-dashboard ")
  }

  return (
    <div className='main-container-dashboard-V'>
        <div className='container-dashboard-V'>
       {/* first column */}
       <div>
        <img src={CenterLogo} alt="logo"/>
       </div>
       {/* second column */}
       <div className='second-column-dashboard-V'>
        <h1>Congratulations!</h1>
        <p>The data was loaded successfully</p>
       </div>
       {/* Third Column */}
       <div className='third-column-dashboard-V'>
       <button onClick={handleNavigate}>I'm Done</button>
       </div>
        </div>
      
    </div>
  )
}

export default CreateDashboardModalV;
