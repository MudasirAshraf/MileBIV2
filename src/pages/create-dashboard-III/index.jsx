import React from 'react';
import "./modal-III.scss";
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import Four from '../../assets/png/4.png';
import PIV from '../../assets/svg/p4.svg';
import Polygon from '../../assets/svg/Polygon 3.svg';
import Ring from "../../assets/svg/ringround.svg";
import Line from '../../assets/svg/line.svg';

const CreateDashboardModalIII = () => {
    const navigate = useNavigate();

    const handleDashboardII = () => {
      navigate('/create-dashboard-II');
    };

    const handleDashboardIV = () =>{
        navigate("/create-dashboard-IV");
    };
  return (
    <div className='main-container-create-dashboard-modals-III'>
    <div className='header-create-dashboard-III'>
 <div>
  <img src={Back} alt="logo"style={{cursor:"pointer"}} onClick={handleDashboardII}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
</div>
{/* Adding Header */}
<div className='container-dashboard-modals-III'>
   <div className='first-row-dashboard-modals-III'>
   <p>Create a Dashboard</p>
          <img src={PIV} alt="logo"/>
          <div className='third-row-dashboard-modals-III'>
            <img src={Polygon} alt="logo"/>
          </div>
          <div className='fourth-row-dashboard-modals-III'>
            <img src={Ring} alt="logo"/>
          </div>
          <div className='fifth-row-dashboard-modals-III'>
            <img src={Ring} alt="logo"/>
          </div>
          <div className='sixth-row-dashboard-modals-III'>
            <img src={Ring} alt="logo"/>
          </div>
   </div>
   <div className='second-row-dashboard-modals-I'>
          <img src={Four} alt="logo"/>
        </div>
        <div className='header-dashboard-modals'>
          <p>Enter Credentials</p>
          <img src={Line} alt="logo"/>
        </div>
        {/* Adding Form */}
        <div>
            <form className='form-container-create-dashboard-III'>
                {/* first row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input type='text' placeholder='Server' name='server' className='input-details-sign-in-row-I-dm-III' required/>
            </div>
            {/* second row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input type='text' placeholder='Username' name='username' className='input-details-sign-in-row-I-dm-III' required/>
            </div>
            {/* third row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input type='password'placeholder='Password' name='password' className='input-details-sign-in-row-I-dm-III' required />
            </div>
            </form>
        </div>
        <div className='button-dashboard-modal-III'>
            <button onClick={handleDashboardIV}>Connect</button>
        </div>
        </div>
    </div>
  )
}

export default CreateDashboardModalIII;