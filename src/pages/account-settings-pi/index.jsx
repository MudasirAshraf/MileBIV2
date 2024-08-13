import React, { useState } from 'react';
import "./account-settings-pi.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Line from "../../assets/svg/line.svg";
import Avatar from "../../assets/png/avataar.png";
import Phone from "../../assets/svg/Phone_light.svg";
import Upload from '../../assets/svg/Avtr.svg';

const AccountSettingsPI = () => {
    const [image, setImage] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) { 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsImageUploaded(true); 
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    document.getElementById('imageUploadInput').click();
  };

  return (
    <div className='main-container-sccount-settings-pi'>
      <div className='container-account-settings-pi'>
        <DashboardWrapper>
            <div className='account-settings-pi'>
            <img src={Check} alt="logo"/>
            <p>Account Settings</p> 
            <img src={EArrow} alt='logo'/>
            <p>Personal Info</p>
            </div>
            {/* adding header */}
            <div  className='account-settings-pi-header'>
                <p>Change Avatar</p>
                <img src={Line} alt='line'/>
            </div>
            {/* adding image avatar */}
            <div className='image-upload-container'>
                <div className='backgroung-image-container'>
      <div className='image-preview'>
        {image ? (
          <img src={image} alt="Uploaded" className='uploaded-image' />
        ) : (
          <img src={Avatar} alt="Default" className='default-image' />
        )}
      </div>
      </div>
      <div className='alert-button'>
        <div className='alert-button-inside'>
          <div> <button className='change-button' onClick={handleClick}>Change</button>
      <input
        type="file"
        id="imageUploadInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      /></div>
          {isImageUploaded && (
            <>
          <div className='upload-image'>
            <img src={Upload} alt="logo"/>
          </div>
          </>
          )}
     
      </div>
      {isImageUploaded && (
        <>
      <div className='alert-text'><p>Avatar Updated Sucessfully!</p></div>
      </>
      )}
      </div>
      </div>
        {/* adding another header */}
        <div  className='account-settings-pi-header'>
                <p>Personal Info</p>
                <img src={Line} alt='line'/>
            </div>
            {/* Adding Form Details */}
            <div>
            <form className='form-account-settings-pi'>
              <div className='account-settings-pi-form'>
              <div className='input-group-sign-in-row-I-account-settings-pi'>  
                <input type="text" id="first-name" placeholder='First Name' name="first-name" className='input-details-sign-in-row-I-account-settings-pi' required />
              </div>
              <div className='input-group-sign-in-row-I-account-settings-pi'>
                
                <input type="text" id="last-name" placeholder='Last Name' name="last-name" className='input-details-sign-in-row-I-account-settings-pi' required />
              </div>
              <div className="input-group-sign-in-account-settings-pi">
              <img src={Phone} alt="passlogo"/>
                <input type="tel" id="phone-number" placeholder='Phone Number' name="phone-number" className='input-details-sign-in-account-settings-pi' required />
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

export default AccountSettingsPI;
