import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./account-settings-ci.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Message from "../../assets/svg/Message_light.svg";
import Adress from "../../assets/svg/adress.svg";
import Line from "../../assets/svg/line.svg"; 


const AccountSettingsCI = () => {

  const navigate = useNavigate();

  const handleAccountSettings = ()=>{
    navigate("/account-settings");
  };

  const [formData, setFormData] = useState({
    companyName:"",
    email:"",
    country:"",
    city:"",
    address:"",
  })

  let handleNameChange = (event) => {
    let fieldValue=event.target.name;
    let newValue = event.target.value;
    setFormData((currData)=>{
       return{...currData, [fieldValue] : newValue}
    })
  }

  let handleSubmit = (event) => {
    event.preventDefault();
  //  Adding Email Updation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email is not valid");
      return;
    }
  // Alert Update Information
    alert("your information has been updated")
    console.log(formData);
    navigate("/account-settings-security");
  };

  return (
    <div className='main-container-account-settings-ci'>
      <div className='container-account-settings-ci'>
        <DashboardWrapper>
        <div className='account-settings-ci'>
            <img src={Check} alt="logo"/>
            <p className='account-settings-ci-paragraph' onClick={handleAccountSettings}>Account Settings</p> 
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
              <form className='account-settings-ci-form-container' onSubmit={handleSubmit}>
                {/* ist row */}
                <div className='account-settings-ci-ist-row'>
                <div className='input-group-sign-in-row-I-account-settings-pi'>  
                <input className='input-details-sign-in-row-I-account-settings-pi'
                 type="text"
                  id="companyName" 
                  placeholder='Company Name'
                   name="companyName"  
                   value={formData.companyName}
                   onChange={handleNameChange}
                   required />
              </div>
                <div className='input-group-sign-in-account-settings-ci'>
                <img src={Message} alt="passlogo"/>
                <input className="input-details-sign-in-account-settings-ci"
                 type="email" 
                 id="email"
                  placeholder="Email Address" 
                  name="email"
                  value={formData.email}
                  onChange={handleNameChange}
                  required />
                </div>
               <div>
               <select   className="styled-select"
               id="country" 
               name="country"  
              value={formData.country}
              onChange={handleNameChange}
                required>
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
               <select className="styled-select"
                id="city"
                 name="city" 
                 value={formData.city}
                 onChange={handleNameChange}
                  required>
        <option value="" disabled selected>City</option>
        <option value="madinah">Madinah</option>
        <option value="riyadh">Riyadh</option>
        <option value="haram">Haram</option>
        <option value="muntaha">Muntaha</option>
    </select>
               </div>
                <div className='input-group-ci'>
                <img src={Adress} alt="passlogo"/>
                <input className='input-details-adress-ci'
                 type="text" 
                 id="address" 
                 placeholder='Address'
                  name="address" 
                  value={formData.address}
                  onChange={handleNameChange}
                  required />
                </div>
                </div>
                {/* third row */}
                <div className='account-settings-ci-third-row'>
                <button type='submit'>Update</button>
                </div>
              </form>
            </div>
        </DashboardWrapper>
      </div>
    </div>
  )
}

export default AccountSettingsCI;
