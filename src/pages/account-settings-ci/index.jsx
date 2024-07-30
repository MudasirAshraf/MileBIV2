import React from 'react';
import "./account-settings-ci.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Line from "../../assets/svg/line.svg";
import Phone from "../../assets/svg/Phone_light.svg";
import Message from "../../assets/svg/Message_light.svg";
import Adress from "../../assets/svg/adress.svg";

const AccountSettingsCI = () => {
  return (
    <div className='main-container-account-settings-ci'>
      <div className='container-account-settings-ci'>
        <DashboardWrapper>
        <div className='account-settings-ci'>
            <img src={Check} alt="logo"/>
            <p>Account Settings</p> 
            <img src={EArrow} alt='logo'/>
            <p>Company Info</p>
            </div>
             {/* adding another header */}
        <div  className='account-settings-ci-header'>
                <p>Change Company Info</p>
                <img src={Line} alt='line'/>
            </div>
            {/* Adding form */}
            <div>
              <form className='account-settings-ci-form-container'>
                {/* ist row */}
                <div className='account-settings-ci-ist-row'>
                <div className='input-group-sign-in-row-I-account-settings-pi'>  
                <input type="text" id="company-name" placeholder='Company Name' name="company-name" className='input-details-sign-in-row-I-account-settings-pi' required />
              </div>
                <div className='input-group-sign-in-account-settings-ci'>
                <img src={Message} alt="passlogo"/>
                <input type="email" id="email-address" placeholder="Email Address" name="email-address" className="input-details-sign-in-account-settings-ci" required />
                </div>
               <div>
               <select id="country" name="country" className="styled-select" required>
        <option value="" disabled selected>Country</option>
        <option value="usa">United States</option>
        <option value="canada">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="australia">Australia</option>
        <option value="india">India</option>
    </select>
               </div>
                </div>
                {/* second row */}
                <div className='account-settings-ci-2nd-row'>
                <div>
               <select id="city" name="city" className="styled-select" required>
        <option value="" disabled selected>City</option>
        <option value="madinah">Madinah</option>
        <option value="riyadh">Riyadh</option>
        <option value="haram">Haram</option>
        <option value="muntaha">Muntaha</option>
    </select>
               </div>
                <div className='input-group-ci'>
                <img src={Adress} alt="passlogo"/>
                <input type="text" id="adress" placeholder='Address' name="adress" className='input-details-adress-ci' required />
                </div>
                </div>
                {/* third row */}
                <div className='account-settings-ci-third-row'>
                <button>Update</button>
                </div>
              </form>
            </div>
        </DashboardWrapper>
      </div>
    </div>
  )
}

export default AccountSettingsCI;
