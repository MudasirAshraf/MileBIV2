import React, {useState} from 'react';
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

    const [formData, setFormData] = useState({
      server:"",
      userName:"",
      password:"",
    })

    let handleNameChange = (event) => {
      let fieldValue = event.target.name;
      let newValue = event.target.value;
      setFormData((currData)=> {
        return{...currData, [fieldValue]: newValue}
      });
    };

    let handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/create-dashboard-IV");
    }
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
            <form className='form-container-create-dashboard-III' onSubmit={handleSubmit}>
              <div className='form-container-create-dashboard-III-input-details'>
                {/* first row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input className='input-details-sign-in-row-I-dm-III'
                 type='text'
                  placeholder='Server' 
                  name='server' 
                  id='server'
                  value={formData.server}
                  onChange={handleNameChange}
                  required/>
            </div>
            {/* second row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input className='input-details-sign-in-row-I-dm-III' 
                type='text' 
                placeholder='Username'
                 name='userName'
                 id='userName'
                 value={formData.userName}
                 onChange={handleNameChange}
                 required/>
            </div>
            {/* third row */}
            <div className='input-group-sign-in-row-I-dm-III'>
                <input className='input-details-sign-in-row-I-dm-III' 
                 type='password'
                 placeholder='Password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleNameChange}
                   required />
            </div>
            </div>
            <div className='button-dashboard-modal-III'>
            <button type='submit'>Connect</button>
        </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default CreateDashboardModalIII;