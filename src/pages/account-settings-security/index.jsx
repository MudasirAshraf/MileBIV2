import React from 'react';
import "./account-settings-security.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";

const AccoutSettingsSecurity = () => {
  return (
    <div className='main-container-account-settings-security'>
      <div className='container-account-settings-security'>
      <DashboardWrapper>
      <div className='account-settings-security'>
            <img src={Check} alt="logo"/>
            <p>Account Settings</p> 
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
            <form className='form-account-settings-pi'>
              <div className='account-settings-pi-form'>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input type="password" id="old-password" placeholder="Enter old password" name="old-password" class="input-details-sign-in-account-settings-pi" required />
              </div>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input type="password" id="old-password" placeholder="Enter New password" name="old-password" class="input-details-sign-in-account-settings-pi" required />
              </div>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Password} alt="passlogo"/>
              <input type="password" id="old-password" placeholder="Confirm password" name="old-password" class="input-details-sign-in-account-settings-pi" required />
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
