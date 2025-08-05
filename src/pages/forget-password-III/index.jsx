import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./forget-pass-III.scss";
import Logo from "../../assets/svg/logo.svg";
import Group from "../../assets/svg/group-III.svg";
import Thrd from "../../assets/svg/third.svg";
import Back from "../../assets/svg/Back.svg";
import Three from "../../assets/png/3.png";
import Ring from "../../assets/svg/ringtick.svg";
import I from "../../assets/svg/1.svg";
import UnionII from "../../assets/svg/Union(3).svg";
import Two from "../../assets/svg/2(1).svg";
import EllipseI from "../../assets/svg/Ellipse 103.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";
import Question from "../../assets/svg/Question_light.svg";
import LineI from "../../assets/svg/line1.svg";
import { useDispatch } from "react-redux";
import { postResetDetails } from "../../actions/loginActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import axiosInstance from "../../components/axios";
import { toast } from "react-toastify";

// Validation schema for SetNewPassword && ConfirmPassword
const validationSchema = Yup.object({
  setNewPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z]).{8,}$/,
      "Password must be a combination of letters and other characters"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("setNewPassword"), null], "Passwords do not match")
    .required("Required"),
});

const ForgetPasswordIII = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const handleLoginPage = () => {
    navigate("/");
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { setNewPassword } = values;
      setLoading(true);
      axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
      const response = await axiosInstance.post(
        "User/resetdetail",
        { Email: email, NewPassword: setNewPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        navigate("/update-password");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(response.data.message);
    }
  };

  return (
    // Main Container
    <div className="main-container-forget-password-III">
      <div className="header-details-sign-in-page-I">
        <div>
          <img src={Back} alt="backlogo" className="image-sign-up" />
        </div>
        {/* Adding select option */}
        <div className="login-page-select-option hide">
          <select className="select-option">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className="container-sign-in-page-III">
        {/* Adding Logo to the page */}
        <div>
          <img src={Logo} alt="logo" />
        </div>
        {/* Adding form container */}
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
              <img src={Three} alt="logo" />
            </div>
          </div>
          {/* Adding text */}
          <div className="sub-header-sign-in-page-I">
            <div className="sub-header-sign-in-page-I-text">
              <p>Set New Password</p>
            </div>
            <div>
              <img src={Line} alt="" />
            </div>
          </div>
          {/* Form using Formik */}
          <Formik
            initialValues={{ setNewPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-group-fp-I">
                  <img src={Password} alt="userlogo" />
                  <Field
                    className="input-details-sign-in"
                    type="password"
                    placeholder="Set New Password"
                    name="setNewPassword"
                  />
                  <ErrorMessage
                    name="setNewPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="input-group-fp-I">
                  <img src={Password} alt="userlogo" />
                  <Field
                    className="input-details-sign-in"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
                {/* Adding Button */}
                <div className="button-fp-III">
                  <button type="submit">Proceed</button>
                </div>
              </Form>
            )}
          </Formik>
          {/* Adding center line */}
          <div className="line-fp-I">
            <img src={LineI} alt="" />
          </div>
          <div className="button-fp-III">
            <div>
              <button className="btn-create" onClick={handleLoginPage}>
                Sign In
              </button>
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
ForgetPasswordIII.propTypes = {
  postResetDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  console.log("Current Redux state:", state);
  return {
    email: state.login.resetEmail,
    response: state.response.response,
  };
};
export default connect(mapStateToProps, { postResetDetails })(
  ForgetPasswordIII
);
