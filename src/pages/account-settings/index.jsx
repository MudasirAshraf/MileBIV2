import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./account-settings.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import CardI from '../../components/card-I';
import USER from "../../assets/svg/user.svg";
import LOCK from "../../assets/svg/lock.svg";
import INFO from "../../assets/svg/info.svg";
import Settings from "../../assets/svg/settings.svg";

const AccountSettings = () => {
    const navigate = useNavigate();

    const handlepersonalinformation = () => {
      navigate('/account-settings-pi');
    };

    const handlesecurity=()=>{
      navigate("/account-settings-security");
    };

    const handlecompanyinfo=()=>{
      navigate("/account-settings-ci");
    };
  return (
    <div className='main-container-account-settings'>
        <div className='container-account-settings'>
       <DashboardWrapper>
       <div className='account-settings'>
        <img src={Check} alt=""/>
       <p>Account Settings</p> 
       </div> 
       {/* Adding Card Components */}
       <div className='account-settings-card-component-container'>
          {/* ist */}
          <div style={{width:"full", height:"full", flex:"none"}}>
            <CardI
            logo={USER}
            title="Personal Info"
            subtitle="Change Personal Information"
            subtitleI="like First Name, Last Name, Avatar etc."
            onLogoClick={handlepersonalinformation}
            />
          </div>
           {/* 2nd */}
           <div style={{width:"full", height:"full", flex:"none"}}>
           <CardI
            logo={INFO}
            title="Company Info"
            subtitle="Change Company Info"
            subtitleI="like Company Name, Country etc."
            onLogoClick={handlecompanyinfo}
            />
           </div>
            {/* 3rd */}
          <div style={{width:"full", height:"full", flex:"none"}}>
          <CardI
            logo={Settings}
            title="Security"
            subtitle="Change Security Settings"
            subtitleI="like Change/Update Password etc."
            onLogoClick={handlesecurity}
            />
          </div>
           {/* 4th */}
           <div style={{width:"full", height:"full", flex:"none"}}>
           <CardI
            logo={LOCK}
            title="Settings"
            subtitle="Change General Setting Like"
            subtitleI="User Permissions, Notifications etc."
            // onLogoClick={handleLogoClick}
            />
           </div>
            {/* 5th */}
          <div style={{width:"full", height:"full", flex:"none"}}>

          </div>
       </div>
       </DashboardWrapper>
 
       </div>
    </div>
  )
}

export default AccountSettings;
