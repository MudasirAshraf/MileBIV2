import React, { useState, useRef, useEffect } from "react";
import "./forget-pass-II.scss";
import Logo from "../../assets/svg/logo.svg";
import Back from "../../assets/svg/Back.svg";
import Group from "../../assets/svg/group-II.svg";
import SPIN from "../../assets/svg/spin.svg";
import Line from "../../assets/svg/line.svg";
import B2 from "../../assets/png/2.png";
import LineI from "../../assets/svg/line1.svg";
import Question from "../../assets/svg/Question_light.svg";
import { verifyCode } from "../../actions/loginActions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { forgotPassword } from "../../actions/loginActions";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../components/axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";

const ForgetPasswordII = (props) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

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

  const handleProceed = async () => {
    try {
      setLoading(true);
      axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
      if (code.length < 4 || code.some((digit) => !digit)) {
        setLoading(false);
        toast.warning("Please enter a valid code");
        return;
      }
      const joinedCode = code.join("");
      const response = await axiosInstance.post(
        "User/resetcodevalidation",
        { email: email, resetCode: joinedCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        navigate("/forget-password-III/" + email);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
      const response = await axiosInstance.post(
        "User/forgetpassword/" + email,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/forget-password-I");
  };

  return (
    <div className="main-container-forget-password-II">
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
                <h1 className="form-header-text-sign-in-page">
                  Forget Password
                </h1>
              </div>
              <div className="progress-bar-forget-password-II">
                <img src={Group} alt="logo" />
              </div>
            </div>
            <div className="side-logo-sign-in-page">
              <img src={B2} alt="logo" />
            </div>
          </div>
          {/* adding text */}
          <div className="sub-header-sign-in-page-I">
            <div className="sub-header-sign-in-page-I-text">
              <p>Verification</p>
            </div>
            <div>
              <img src={Line} alt="" />
            </div>
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
              <div>
                {/* {loading && <img src={SPIN} alt="" />} */}
                <a onClick={handleResendCode} className="code-resend-sp-II">
                  Resend Code
                </a>
              </div>
            </div>
          </div>
          <div className="proceed-button">
            <button onClick={handleProceed}>
              {loading && <img src={SPIN} alt="" />}
              Proceed
            </button>
          </div>
          {/* adding center line */}
          <div className="line-fp-I">
            <img src={LineI} alt="" />
          </div>
          <div className="form-sign-in-fp-II">
            <div>
              <button className="btn-create">Sign In</button>
            </div>
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
    </div>
  );
};

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
