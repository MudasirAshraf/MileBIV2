import React, { useState, useRef } from 'react';
import "./sign-up-page-II.scss";
import { useNavigate } from 'react-router-dom';
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
import Question from "../../assets/svg/Question_light.svg";

const SignPageII = () => {
  const navigate = useNavigate();

  const handleSignUpPageI = () => {
    navigate('/sign-up-page-I');
  };
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input
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

  return (
    <div className="main-container-sign-in-page-II">
      <div className='header-details-sign-in-page-I'>
        <div>
          <img src={Back} alt="backlogo" className='image-sign-up' onClick={handleSignUpPageI}/>
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
          <div className='header-container-sign-in-page-II'>
            {/* header */}
            <div className='form-header-sign-in-page'>
              <div className='form-header-text-sign-in-page-div'>
                <h1 className='form-header-text-sign-in-page'>Sign Up</h1>
              </div>
              {/* Progress bar */}
              <div className='progress-bar-sign-in-page-II'>
                {/* first */}
                <div className='progress-sp-I'>
                  <div className='progress-sp-I-image-I'><img src={I} alt=""/></div>
                  <div className='progress-sp-I-image-II'><img src={EllipseI} alt=""/></div>
                  <div className='progress-sp-I-image-III'><img src={Ring} alt=""/></div>
                </div>
                {/* Second */}
                <div className='progress-sp-II'>
                  <div className='progress-sp-II-image-I'>
                    <img src={UnionII} alt=""/></div>
                </div>
                {/* Third */}
                <div className='progress-sp-III'>
                  <div className='progress-sp-III-image-I'>
                    <img src={Two} alt=""/>
                  </div>
                  <div className='progress-sp-III-image-II'>
                    <img src={EllipseI} alt=""/>
                  </div>
                  <div className='progress-sp-III-image-III'>
                    <img src={Polygon} alt=""/>
                  </div>
                  {/* Fourth */}
                  <div className='progress-sp-IV'>
                    <div className='progress-sp-IV-image-I'>
                      <img src={Union} alt=""/></div>
                  </div>
                  {/* Fifth */}
                  <div className='progress-sp-V'>
                    <div className='progress-sp-V-image-I'>
                      <img src={EllipseII} alt=""/>
                    </div>
                    <div className='progress-sp-V-image-II'>
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
              <a onClick={() => alert('Resending code')} className='code-resend-sp-II'>Resend Code</a>
            </div>
            </div>
          </div>
          <div className='proceed-button'>
               <button>Proceed</button>
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

export default SignPageII;
