import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./sign-page-I.scss";
import Logo from "../../assets/svg/logo.svg";
import Back from "../../assets/svg/Back.svg";
import One from "../../assets/png/1.png";
import I from "../../assets/svg/1.svg";
import II from "../../assets/svg/2.svg";
import III from "../../assets/svg/3.svg";
import EllipseI from "../../assets/svg/Ellipse 103.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Union from "../../assets/svg/Union.svg";
import UnionI from "../../assets/svg/Union (1).svg";
import EllipseII from "../../assets/svg/Ellipse 104.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";
import Message from "../../assets/svg/Message_light.svg";
import Phone from "../../assets/svg/Phone_light.svg";
import LineI from "../../assets/svg/line1.svg";
import Question from "../../assets/svg/Question_light.svg";


const SignpageI = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/');
  };

  const handleProceed = (e) => {
    e.preventDefault();
    // Add form validation here if needed
    navigate('/sign-up-page-II');
  };
  return (
    <div className='main-container-sign-in-page-I'>
             <div className='header-details-sign-in-page-I'>
          <div>
            <img src={Back} alt="backlogo" className='image-sign-up' onClick={handleLoginPage}/>
          </div>
            {/* adding select option */}
       <div className='login-page-select-option'>
          <select className='select-option'>
            <option>English</option>
            <option>Arabic</option>
          </select>
         </div>
         </div>
        <div className='container-sign-in-page-I'>
            {/* adding Logo to the page */}
         <div>
          <img src={Logo} alt='logo'/>
         </div>
         {/* adding form container */}
         <div className='form-container-sign-in-page-I'>
            <div className='header-container-sign-in-page'>
             {/* header */}
          <div className='form-header-sign-in-page'>
            <div className='form-header-text-sign-in-page-div'><h1 className='form-header-text-sign-in-page'>Sign Up</h1></div>
            {/* Progress bar */}
            <div className='progress-bar-sign-in-page-I'>
                <div className='progress-I'>
                    <div className='progress-I-image-I'><img src={I} alt=""/></div>
                    <div><img src={EllipseI} alt=""/></div>
                    <div className="progress-I-image-III"><img src={Polygon} alt=""/></div>
                </div>
                <div className='progress-II'>
                    <img src={Union} alt="" className='progress-II-image-I'/>
                    
                </div>
                <div className='progress-III'>
                
                    <div className='progress-III-image-I'>
                        <img src={EllipseII} alt=""/>
                    </div>
                    <div className='progress-III-image-II'>
                        <img src={II} alt=""/>
                    </div>
               
                </div>
                <div className='progress-IV'>
                    <div className='progress-IV-image-I'><img src={UnionI} alt=""/></div>
                    
                </div>
               <div className='progress-V'>
               <div className='progress-V-image-I'>
                        <img src={EllipseII} alt=""/>
                    </div>
                    <div className='progress-V-image-II'>
                        <img src={III} alt=""/>
                    </div>
               </div>
            </div>
          </div>
          {/* Adding side logo */}
          <div className='side-logo-sign-in-page'>
            <img src={One} alt="logo"/>
          </div>
          </div>
          {/* adding text */}
          <div className='sub-header-sign-in-page-I'>
             <div className='sub-header-sign-in-page-I-text'>
              <p>Personal Info</p>
             </div>
             <div>
              <img src={Line} alt=""/>
             </div>
          </div>
          {/* Form */}
          <div>
            <form>
              <div className='form-column-details'></div>
                 {/* first column */}
                 <div className='first-column-details'>
                 <div className="input-group-sign-in-row-I">
        {/* <img src={User} alt="userlogo"/> */}
          <input type="text" placeholder="First Name" name="username"  className='input-details-sign-in-row-I' required />
        </div>
         <div className="input-group-sign-in-row-I">
         {/* <img src={Password} alt="passlogo"/> */}
         <input type="text" placeholder="Last Name" name="username"  className='input-details-sign-in-row-I' required />
        </div>
                 </div>
                 {/* Second column */}
                 <div className='second-column-details'>
                 <div className="input-group-sign-in">
        <img src={Message} alt="userlogo"/>
        <input type="email" placeholder="Email" name="email" className='input-details-sign-in' required />
        </div>
         <div className="input-group-sign-in">
         <img src={Phone} alt="passlogo"/>
         <input type="tel" placeholder="Phone Number" name="phone" className='input-details-sign-in' required />
        </div>
</div>
                 {/* third column */} 
                  <div className='third-column-details'>
                  <div className="input-group-sign-in">
        <img src={Password} alt="userlogo"/>
        <input type="password" placeholder="Create a Password" name="password" className='input-details-sign-in' required />
        </div>
         <div className="input-group-sign-in">
         <img src={Password} alt="passlogo"/>
          <input type="password" placeholder="Confirm Password" name="password" className='input-details-sign-in' required />
        </div>
                 </div>
            </form>
          </div>
          {/* adding button */}
          <div className='form-sign-in-page-button'>
           <button onClick={handleProceed} type='submit'>Proceed</button>
          </div>
          {/* adding center line */}
          <div>
            <img src={LineI} alt=''/>
          </div>
          {/* adding another div */}
          <div className='form-sign-in-button-div'>
         <div><a href="" className='form-sign-in-link-i'>Already have an account ?</a></div>
         <div><button className='button-1' onClick={handleLoginPage}>Sign In</button></div>
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

export default SignpageI;
