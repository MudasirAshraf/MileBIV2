import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./account-settings-security.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";

const AccoutSettingsSecurity = () => {

   // Navigation to Account-Settings
   const navigate = useNavigate();

   const handleAccountSettings = ()=>{
     navigate("/account-settings");
   };

  const [formData, setFormData] = useState({
    oldPassword:"",
    newPassword:"",
    confirmPassword:"",
  });

  let handleNameChange = (event) =>{
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData)=>{
      return{...currData, [fieldValue] : newValue}
    });
  };
  let handleSubmit = (event) =>{
    event.preventDefault();
    console.log(formData);
    if (formData.oldPassword === formData.newPassword) {
      alert("Old Passwords & New Password are same!");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword){
      alert('New passwords do not match!')
    }
    setFormData({
      oldPassword:"",
    newPassword:"",
    confirmPassword:"", 
    })
  }
  return (
    <div className='main-container-account-settings-security'>
      <div className='container-account-settings-security'>
      <DashboardWrapper>
      <div className='account-settings-security'>
            <img src={Check} alt="logo"/>
            <p className='account-settings-ci-paragraph' onClick={handleAccountSettings}>Account Settings</p> 
            <img src={EArrow} alt='logo'/>
            <p>Security</p>
            </div>
             {/* adding another header */}
        <div  className='account-settings-security-header'>
                <p>Change Password</p>
                <img src={Line} alt='line'/>
            </div>
               {/* Adding Form Details */}
               <div>
            <form className='form-account-settings-pi' onSubmit={handleSubmit}>
              <div className='account-settings-pi-form'>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input class="input-details-sign-in-account-settings-pi"
               type="password"
                id="oldPassword" 
                placeholder="Enter old password"
                 name="oldPassword" 
                 value={formData.oldPassword}
                 onChange={handleNameChange}
                 required />
              </div>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input class="input-details-sign-in-account-settings-pi"
               type="password"
                id="newPassword"
                 placeholder="Enter New password"
                  name="newPassword" 
                  value={formData.newPassword}
                  onChange={handleNameChange}
                  required />
              </div>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input class="input-details-sign-in-account-settings-pi"
               type="password"
                id="confirmPassword"
                 placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleNameChange}
                  required />
              </div>
              </div>
              <div className='account-settings-pi-form-button'>
                <button type="submit">Update</button>
              </div>
            </form>
            </div>
      </DashboardWrapper>
      </div>
    </div>
  )
}

export default AccoutSettingsSecurity;
