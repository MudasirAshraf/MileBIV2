import React, { useState, useRef } from "react";
import "./sign-up-page-II.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import Back from "../../assets/svg/Back.svg";
import Group from "../../assets/svg/group-III.svg";
import Three from "../../assets/png/3.png";
import Line from "../../assets/svg/line.svg";
import Question from "../../assets/svg/Question_light.svg";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignPageIII = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/sign-up-page-II");
  };
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
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
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleProceed = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 4) {
      toast.success("Code Verified Successfully!");
      navigate("/");
    } else {
      toast.error(" Please enter a valid 4-digit code");
    }
  };

  return (
    <div className="main-container-sign-in-page-II">
      <div className="header-details-sign-in-page-I">
        <div>
          <img
            src={Back}
            alt="backlogo"
            className="image-sign-up"
            onClick={handleBack}
          />
        </div>
        {/* adding select option */}
        <div className="login-page-select-option hide">
          <select className="select-option">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className="container-sign-in-page-II">
        {/* adding Logo to the page */}
        <div>
          <img src={Logo} alt="logo" />
        </div>
        {/* adding form container */}
        <div className="form-container-sign-in-page-I">
          <div className="header-container-forget-password-II">
            <div className="form-header-forget-password-II">
              <div className="form-header-text-forget-password-II-div">
                <h1 className="form-header-text-sign-in-page">Sign Up</h1>
              </div>
              <div className="progress-bar-forget-password-II">
                <img src={Group} alt="logo" />
              </div>
            </div>
            <div className="side-logo-sign-in-page">
              <img src={Three} alt="logo" />
            </div>
          </div>
          {/* adding text */}
          <div className="sub-header-sign-in-page-I">
            <div className="sub-header-sign-in-page-I-text">
              <p>Verification</p>
            </div>
            <hr className="sub-header-line" />
          </div>
          {/* adding Paragraph */}
          <div className="paragrapgh-I-div">
            {/* first two column */}
            <div className="paragraph-I">
              <p>We sent a 4 digit verification code to your email.</p>
            </div>
            <div className="paragraph-II">
              <p>Please enter the code to proceed.</p>
            </div>
            {/* Code entry inputs */}
            <div className="code-div">
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
              <div className="resend-code-div">
                <a
                  onClick={() => toast.info("Resending code...")}
                  className="code-resend-sp-II"
                >
                  Resend Code
                </a>
              </div>
            </div>
          </div>
          <div className="proceed-button">
            <button onClick={handleProceed}>Proceed</button>
          </div>
        </div>
        <div className="login-help-div">
          <div className="login-hepl-image">
            <img src={Question} alt="logo" />
          </div>
          <div className="login-help-link">
            <a href="">Need Help ?</a>
          </div>
        </div>
      </div>
      {/* Toast-Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignPageIII;
