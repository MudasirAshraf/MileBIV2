import React, { useState } from 'react';
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import { re } from 'mathjs';

const SignpageI = ({ registerUser }) => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/');
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{7,13}$/, "Phone number must be between 7 and 13 digits")
      .required("Phone number is required"),
    Password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/^(?=.*[a-zA-Z])(?=.*[^a-zA-Z]).{8,}$/, "Password must be a combination of letters and other characters")
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Define form submission function
  const onSubmit = (values) => {
    localStorage.setItem('tempUser', JSON.stringify(values));
    navigate('/sign-up-page-II');
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema,
    onSubmit
  });


  return (
    <div className='main-container-sign-in-page-I'>
      <div className='header-details-sign-in-page-I'>
        <div>
          <img src={Back} alt="backlogo" className='image-sign-up' onClick={handleLoginPage} />
        </div>
        <div className='login-page-select-option'>
          <select className='select-option'>
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className='container-sign-in-page-I'>
        <div>
          <img src={Logo} alt='logo' />
        </div>
        <div className='form-container-sign-in-page-I'>
          <div className='header-container-sign-in-page'>
            <div className='form-header-sign-in-page'>
              <div className='form-header-text-sign-in-page-div'>
                <h1 className='form-header-text-sign-in-page'>Sign Up</h1>
              </div>
              <div className='progress-bar-sign-in-page-I'>
                <div className='progress-I'>
                  <div className='progress-I-image-I'><img src={I} alt="" /></div>
                  <div><img src={EllipseI} alt="" /></div>
                  <div className="progress-I-image-III"><img src={Polygon} alt="" /></div>
                </div>
                <div className='progress-II'>
                  <img src={Union} alt="" className='progress-II-image-I' />
                </div>
                <div className='progress-III'>
                  <div className='progress-III-image-I'>
                    <img src={EllipseII} alt="" />
                  </div>
                  <div className='progress-III-image-II'>
                    <img src={II} alt="" />
                  </div>
                </div>
                <div className='progress-IV'>
                  <div className='progress-IV-image-I'><img src={UnionI} alt="" /></div>
                </div>
                <div className='progress-V'>
                  <div className='progress-V-image-I'>
                    <img src={EllipseII} alt="" />
                  </div>
                  <div className='progress-V-image-II'>
                    <img src={III} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className='side-logo-sign-in-page'>
              <img src={One} alt="logo" />
            </div>
          </div>
          <div className='sub-header-sign-in-page-I'>
            <div className='sub-header-sign-in-page-I-text'>
              <p>Personal Info</p>
            </div>
            <div>
              <img src={Line} alt="" />
            </div>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className='form-column-details'></div>
              <div className='first-column-details'>
                <div className="input-group-sign-in-row-I">
                  <input
                    className='input-details-sign-in-row-I'
                    type="text"
                    placeholder="Username"
                    name="userName"
                    id='userName'
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.userName && formik.errors.userName && <p>{formik.errors.userName}</p>}
                </div>
                <div className="input-group-sign-in-row-I">
                  <input
                    className='input-details-sign-in-row-I'
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    id='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && <p>{formik.errors.firstName}</p>}
                </div>
                <div className="input-group-sign-in-row-I">
                  <input
                    className='input-details-sign-in-row-I'
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.firstName && <p>{formik.errors.lastName}</p>}
                </div>
              </div>
              <div className='second-column-details'>
                <div className="input-group-sign-in">
                  <img src={Message} alt="userlogo" />
                  <input
                    className='input-details-sign-in'
                    type="email"
                    placeholder="Email"
                    name="email"
                    id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                </div>
                <div className="input-group-sign-in">
                  <img src={Phone} alt="passlogo" />
                  <input
                    className='input-details-sign-in'
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    id='phoneNumber'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && <p>{formik.errors.phoneNumber}</p>}
                </div>
              </div>
              <div className='third-column-details'>
                <div className="input-group-sign-in">
                  <img src={Password} alt="userlogo" />
                  <input
                    className='input-details-sign-in'
                    type="password"
                    placeholder="Create a Password"
                    name="Password"
                    id='Password'
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Password && formik.errors.Password && <p>{formik.errors.Password}</p>}
                </div>
                <div className="input-group-sign-in">
                  <img src={Password} alt="passlogo" />
                  <input
                    className='input-details-sign-in'
                    type="password"
                    placeholder="Confirm Password"
                    name="ConfirmPassword"
                    id='ConfirmPassword'
                    value={formik.values.ConfirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword && <p>{formik.errors.ConfirmPassword}</p>}
                </div>
              </div>
              <div className='form-sign-in-page-button'>
                <button type='submit'>Proceed</button>
              </div>
            </form>
          </div>
          <div>
            <img src={LineI} alt='' />
          </div>
          <div className='form-sign-in-button-div'>
            <div>
              <a href="" className='form-sign-in-link-i'>Already have an account?</a>
            </div>
            <div>
              <button className='button-1' onClick={handleLoginPage}>Sign In</button>
            </div>
          </div>
        </div>
        <div className='login-help-div'>
          <div className='login-help-image'>
            <img src={Question} alt='logo' />
          </div>
          <div className='login-help-link'><a href=''>Need Help?</a></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignpageI);
