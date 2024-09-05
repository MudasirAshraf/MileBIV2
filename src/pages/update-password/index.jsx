import React from 'react';
import "./update-password.scss";
import CenterLogo from "../../assets/svg/data.svg";
import { useNavigate } from 'react-router-dom';


const UpdatePassword = () => {

    const navigate = useNavigate();

  const handleNavigateLogin = ()=> {
    navigate("/")
  }
  return (
    <div className='main-container-update-password'>
        <div className='container-update-password'>
       {/* first column */}
       <div>
        <img src={CenterLogo} alt="logo"/>
       </div>
       {/* second column */}
       <div className='second-column-update-password'>
        <h1>Congratulations!</h1>
        <p>Password Reset successfully</p>
       </div>
       {/* Third Column */}
       <div className='third-column-update-password'>
       <button onClick={handleNavigateLogin}>Go to Login Page</button>
       </div>
        </div>
      
    </div>
  )
}

export default UpdatePassword;
