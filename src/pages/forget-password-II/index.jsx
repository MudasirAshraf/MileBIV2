import React, { useState, useRef } from 'react';
import "./forget-pass-II.scss";
import Logo from "../../assets/svg/logo.svg";
import Back from "../../assets/svg/Back.svg";
import Ring from '../../assets/svg/ringtick.svg';
import I from "../../assets/svg/1.svg";
import UnionII from '../../assets/svg/Union(3).svg';
import Two from "../../assets/svg/2(1).svg";
import III from "../../assets/svg/3.svg";
import EllipseI from "../../assets/svg/Ellipse 103.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Union from "../../assets/svg/Union.svg";
import EllipseII from "../../assets/svg/Ellipse 104.svg";
import Line from "../../assets/svg/line.svg";
import B2 from "../../assets/png/2.png";
import LineI from "../../assets/svg/line1.svg";
import Question from "../../assets/svg/Question_light.svg";
import { verifyCode } from '../../actions/loginActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { forgotPassword } from "../../actions/loginActions";
import { connect } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgetPasswordII = (props) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleProceed = async () => {
    try {
      const codeString = code.join('');
      const response = await dispatch(verifyCode({ email: props.email, ResetCode: codeString }));
      if (response && response.success) { 
        navigate('/forget-password-III'); 
      } 
    } catch (error) {
      toast.error("OTP is Invalid");
      console.error("Verification failed", error);
    }
  };
  
  const handleResendCode = async () => {
    try {
      await dispatch(forgotPassword(props.email));
      toast.success("Code resent successfully");
    } catch (error) {
      console.error("Verification failed", error);
      toast.error("Failed to resend code");
    }
  };
  

  return (
    <div className="main-container-forget-password-II">
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
      <div className='container-sign-in-page-II'>
        {/* adding Logo to the page */}
        <div>
          <img src={Logo} alt='logo'/>
        </div>
        {/* adding form container */}
        <div className='form-container-sign-in-page-I'>
          <div className='header-container-forget-password-II'>
            {/* header */}
            <div className='form-header-forget-password-II'>
              <div className='form-header-text-forget-password-II-div'>
                <h1 className='form-header-text-sign-in-page'>Forget Password</h1>
              </div>
              {/* Progress bar */}
              <div className='progress-bar-forget-password-II'>
                {/* first */}
                <div className='progress-sp-I'>
                  <div className='progress-sp-I-image-I-fp-II'><img src={I} alt=""/></div>
                  <div className='progress-sp-I-image-II'><img src={EllipseI} alt=""/></div>
                  <div className='progress-sp-I-image-III-fp-II'><img src={Ring} alt=""/></div>
                </div>
                {/* Second */}
                <div className='progress-sp-II'>
                  <div className='progress-sp-II-image-I-fp-II'>
                    <img src={UnionII} alt=""/></div>
                </div>
                {/* Third */}
                <div className='progress-sp-III-fp-II'>
                  <div className='progress-sp-III-image-I-fp-II'>
                    <img src={Two} alt=""/>
                  </div>
                  <div className='progress-sp-III-image-II'>
                    <img src={EllipseI} alt=""/>
                  </div>
                  <div className='progress-sp-III-image-III-fp-II'>
                    <img src={Polygon} alt=""/>
                  </div>
                  {/* Fourth */}
                  <div className='progress-sp-IV'>
                    <div className='progress-sp-IV-image-I-fp-II'>
                      <img src={Union} alt=""/></div>
                  </div>
                  {/* Fifth */}
                  <div className='progress-sp-V-fp-II'>
                    <div className='progress-sp-V-image-I'>
                      <img src={EllipseII} alt=""/>
                    </div>
                    <div className='progress-sp-V-image-II-fp-II'>
                      <img src={III} alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Adding side logo */}
            <div className='side-logo-sign-in-page'>
              <img src={B2} alt="logo"/>
            </div>
          </div>
          {/* adding text */}
          <div className='sub-header-sign-in-page-I'>
            <div className='sub-header-sign-in-page-I-text'>
              <p>Verification</p>
            </div>
            <div>
              <img src={Line} alt=""/>
            </div>
          </div>
          {/* adding Paragraph */}
          <div className='paragrapgh-I-div'>
            {/* first two column */}
            <div className='paragraph-I'>
              <p>We sent a 4 digit verification code to your email.</p>
            </div>
            <div className="paragraph-II">
              <p>Please enter the code to proceed.</p>
            </div>
            {/* Code entry inputs */}
            <div className='code-div'>
            <div className="code-entry">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div>
              <a onClick={handleResendCode} className='code-resend-sp-II'>Resend Code</a>
            </div>
            </div>
          </div>
          <div className='proceed-button'>
               <button onClick={handleProceed}>Proceed</button>
            </div>
               {/* adding center line */}
               <div className='line-fp-I'>
            <img src={LineI} alt=''/>
          </div>
          <div className='form-sign-in-fp-II'>
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
         {/* Toast container */}
         <ToastContainer 
        autoClose={4000}        
        hideProgressBar={false} 
        newestOnTop={false}     
        closeOnClick            
        rtl={false}             
        pauseOnFocusLoss       
        draggable              
        pauseOnHover            
      />
    </div>
  )
}

ForgetPasswordII.propTypes = {
  verifyCode: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  console.log("Current Redux state:", state); 
  return {
    email: state.login.resetEmail, 
    response: state.response.response,
  };
};

export default connect(mapStateToProps, { verifyCode })(ForgetPasswordII);