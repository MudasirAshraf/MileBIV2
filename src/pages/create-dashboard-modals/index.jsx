import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './create-dash-modals.scss';
import Cross from '../../assets/svg/cross.svg';
import One from '../../assets/png/1.png';
import PI from '../../assets/svg/P1.svg';
import Polygon from '../../assets/svg/Polygon 3.svg';
import Line from '../../assets/svg/line.svg';
import CustomSelect from '../../components/custom-select';

const CreateDashboardModals = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customSelect:"",
    dashboardName:"",
    projectName:"",
  })

  let handleNameChange = (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData)=> {
     return {...currData, [fieldValue] : newValue}
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    navigate('/create-dashboard-I');
  }

  return (
    <div className='main-container-create-dashboard-modals'>
      <div className='cross-icon-dashboard-modals'>
       <img src={Cross} alt='logo'/>
      </div>
      <div className='container-dashboard-modals'>
        <div className='first-row-dashboard-modals'>
          <p>Create a Dashboard</p>
          <img src={PI} alt="logo"/>
          <div className='third-row-dashboard-modals'>
            <img src={Polygon} alt="logo"/>
          </div>
        </div>
        <div className='second-row-dashboard-modals'>
          <img src={One} alt="logo"/>
        </div>
        <div className='header-dashboard-modals'>
          <p>Dashboard Details</p>
          <img src={Line} alt="logo"/>
        </div>
        <div>
          <form className='form-dashboard-modals' onSubmit={handleSubmit}>
            {/* first row */}
            <div>
              <CustomSelect
               id="customSelect" 
               name="customSelect"
               value={formData.customSelect}
               onChange={handleNameChange}
               />
            </div>
            {/* second row */}
            <div className="input-group-sign-in-row-I-dm">
              <input className='input-details-sign-in-row-I-dm'
               type='text'
                placeholder='Dashboard Name'
                 name='dashboardName'
                 id='dashboardName'
                 value={formData.dashboardName}
                 onChange={handleNameChange}
                 required />
            </div>
            {/* third row */}
            <div className="input-group-sign-in-row-I-dm">
              <input className='input-details-sign-in-row-I-dm'
               type='text' 
               placeholder='Project Name'
                name='projectName' 
                id='projectName'
                value={formData.projectName}
                onChange={handleNameChange}
                required />
            </div>
            <div className='button-dashboard-modal'>
          <button type='submit'>Proceed</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  )
}

export default CreateDashboardModals;
