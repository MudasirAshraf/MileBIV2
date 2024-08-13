import React, { useState } from 'react';
import "./forget-pass-III.scss";
import Logo from "../../assets/svg/logo.svg";
import Thrd from "../../assets/svg/third.svg";
import Back from "../../assets/svg/Back.svg";
import Three from "../../assets/png/3.png";
import Ring from '../../assets/svg/ringtick.svg';
import I from "../../assets/svg/1.svg";
import UnionII from '../../assets/svg/Union(3).svg';
import Two from "../../assets/svg/2(1).svg";
import EllipseI from "../../assets/svg/Ellipse 103.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";
import Question from "../../assets/svg/Question_light.svg";
import LineI from "../../assets/svg/line1.svg";


const ForgetPasswordIII = () => {

  const [formData, setFormData] = useState({
    setNewPassword:"",
    confirmPassword:"",
  })

  let handleNameChange = (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData)=> {
     return{...currData, [fieldValue] : newValue}
    })
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.setNewPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setFormData({
      setNewPassword:"",
    confirmPassword:"",
    });
    alert("Your password has been successfully reset. You can now log in with your new password.");
  }
  return (
    <div className='main-container-forget-password-III'>
         <div className='header-details-sign-in-page-I'>
        <div>
          <img src={Back} alt="backlogo" className='image-sign-up'/>
        </div>
        {/* adding select option */}
        <div className='login-page-select-option'>
          <select className='select-option'>
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className='container-sign-in-page-III'>
        {/* adding Logo to the page */}
        <div>
          <img src={Logo} alt='logo'/>
        </div>
        {/* adding form container */}
        <div className='form-container-sign-in-page-I'>
          <div className='header-container-forget-password-III'>
            {/* header */}
            <div className='form-header-forget-password-III'>
              <div className='form-header-forget-password-III-div'>
                <h1 className='form-header-text-sign-in-page'>Forget Password</h1>
              </div>
              {/* Progress bar */}
              <div className='progress-bar-forget-password-III'>
                {/* first */}
                <div className='progress-sp-III-I-fp-III'>
                  <div className='progress-sp-III-I-image-I-fp-III'><img src={I} alt=""/></div>
                  <div className='progress-sp-III-I-image-II-fp-III'><img src={EllipseI} alt=""/></div>
                  <div className='progress-sp-III-I-image-III-fp-III'><img src={Ring} alt=""/></div>
                </div>
                {/* Second */}
                <div className='progress-sp-III-II-fp-III'>
                  <div className='progress-sp-III-II-image-I-fp-III'>
                    <img src={UnionII} alt=""/></div>
                </div>
                {/* Third */}
                <div className='progress-sp-III-III-fp-III'>
                    <div className='progress--III-images-fp-III'>
                  <div className='progress-sp-III-III-image-II-fp-III'>
                  <img src={EllipseI} alt=""/>
                  <img src={Two} alt="" className='progress-sp-III-III-image-I-fp-III'/>
                  </div>
                  <div className='progress-sp-III-III-image-III-fp-III'><img src={Ring} alt=""/></div>
                  </div>
                </div>
                  {/* Fourth */}
                 <div className='progress-sp-III-IV-fp-III'>
                 <div className='progress-sp-III-IV--image-I-fp-III'>
                 <img src={UnionII} alt=""/></div>
                 </div>
                  {/* Fifth */}
                <div className='progress-sp-III-V-fp-III'>
                <div className='progress-sp-III-V-image-I-fp-III'>
                      <img src={EllipseI} alt=""/>
                    </div>
                    <div className='progress-sp-III-V-image-II-fp-III'>
                      <img src={Thrd} alt=""/>
                    </div>
                    <div className='progress-sp-III-V-image-III-fp-III'>
                      <img src={Polygon} alt=""/>
                    </div>

                </div>
                
              </div>
            </div>
            {/* Adding side logo */}
            <div className='side-logo-sign-in-page'>
              <img src={Three} alt="logo"/>
            </div>
          </div>
          {/* adding text */}
          <div className='sub-header-sign-in-page-I'>
            <div className='sub-header-sign-in-page-I-text'>
              <p>Set New Password</p>
            </div>
            <div>
              <img src={Line} alt=""/>
            </div>
          </div>
            {/* Form */}
            <div>
                <form onSubmit={handleSubmit}>
           <div className="input-group-fp-I">
       <img src={Password} alt="userlogo"/>
       <input className="input-details-sign-in"
        type="password"
         placeholder="Set New Password" 
         name="setNewPassword"
         id='setNewPassword'
         value={formData.setNewPassword}
         onChange={handleNameChange}
           required />
       </div>  
       <div className="input-group-fp-I">
       <img src={Password} alt="userlogo"/>
       <input className="input-details-sign-in"
        type="password"
         placeholder="Confirm Password" 
         name="confirmPassword"  
         id='confirmPassword'
         value={formData.confirmPassword}
         onChange={handleNameChange}
         required />
       </div>  
          {/* Adding Button */}
          <div className='button-fp-III'>
        <button>Proceed</button>
       </div>
       </form>
         </div>
             {/* adding center line */}
             <div className='line-fp-I'>
            <img src={LineI} alt=''/>
          </div>
          <div className='button-fp-III'>
         <div><button className='button-1'>Sign In</button></div>
        </div>
          </div>
          <div className='login-help-div'>
          <div className='login-hepl-image'>
            <img src={Question} alt='logo'/>
          </div>
          <div className='login-help-link'><a href=''>Need Help ?</a></div>
         </div>
          </div>
    </div>
  )
}
export default ForgetPasswordIII;
