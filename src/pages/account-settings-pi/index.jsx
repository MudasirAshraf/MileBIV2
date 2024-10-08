import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleAccountSettings = () => {
    navigate("/account-settings");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  let handleNameChange = (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      return { ...currData, [fieldValue]: newValue };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    const phoneRegex = /^\d{7,13}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Phone number must be between 7 and 13 digits.");
      return;
    }
    console.log(formData);
    alert("Your information has been updated");
    navigate("/account-settings-ci");
  };

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
            <img src={Check} alt="logo" />
            <p className='account-settings-ci-paragraph' onClick={handleAccountSettings}>Account Settings</p>
            <img src={EArrow} alt='logo' />
            <p>Personal Info</p>
          </div>
          <div className='account-settings-pi-header'>
            <p>Change Avatar</p>
            <img src={Line} alt='line' />
          </div>
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
                <div>
                  <button className='change-button' onClick={handleClick}>Change</button>
                  <input
                    type="file"
                    id="imageUploadInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {isImageUploaded && (
                  <>
                    <div className='upload-image'>
                      <img src={Upload} alt="logo" />
                    </div>
                  </>
                )}
              </div>
              {isImageUploaded && (
                <>
                  <div className='alert-text'><p>Avatar Updated Successfully!</p></div>
                </>
              )}
            </div>
          </div>
          <div className='account-settings-pi-header'>
            <p>Personal Info</p>
            <img src={Line} alt='line' />
          </div>
          <div>
            <form className='form-account-settings-pi' onSubmit={handleSubmit}>
              <div className='account-settings-pi-form'>
                <div className='input-group-sign-in-row-I-account-settings-pi'>
                  <input className='input-details-sign-in-row-I-account-settings-pi'
                    type="text"
                    id="firstName"
                    placeholder='First Name'
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleNameChange}
                    required />
                </div>
                <div className='input-group-sign-in-row-I-account-settings-pi'>
                  <input className='input-details-sign-in-row-I-account-settings-pi'
                    type="text"
                    id="lastName"
                    placeholder='Last Name'
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleNameChange}
                    required />
                </div>
                <div className="input-group-sign-in-account-settings-pi">
                  <img src={Phone} alt="passlogo" />
                  <input className='input-details-sign-in-account-settings-pi'
                    type="tel"
                    id="phoneNumber"
                    placeholder='Phone Number'
                    name="phoneNumber"
                    value={formData.phoneNumber}
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

export default AccountSettingsPI;
