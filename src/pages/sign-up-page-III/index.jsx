import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./sign-up-page-III.scss";
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
import Question from "../../assets/svg/Question_light.svg";
import Message from "../../assets/svg/Message_light.svg";
import Adress from "../../assets/svg/adress.svg";
import { connect, useDispatch } from "react-redux";
import { registerUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../components/axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";

const validationSchema = Yup.object({
  name: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

const SignPageIII = ({ registerUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "",
      city: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let user = localStorage.getItem("tempUser");
      if (user) {
        user = JSON.parse(user);
        user["organization"] = values;
        try {
          setLoading(true);
          axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
          const response = await axiosInstance
            .post("User/register", JSON.stringify(user), {
              headers: {
                "Content-Type": "application/json",
              }
            })

          setLoading(false);
          if (response.data.messageType === 1) {
            localStorage.removeItem("tempUser");
            toast.success(response.data.message);
            navigate("/");
          } else {
            toast.warning(response.data.message);
          }
        } catch (error) {
          setLoading(false);
          toast.error(response.data.message);
          navigate("/");
        }
      } else {
        toast.error("User details not found");
        navigate("/sign-up-page-I");
      }
    },
  });

  const handleBack = () => {
    navigate("/sign-up-page-II");
  }

  return (
    <div className="main-container-sign-in-page-III">
      <div className="header-details-sign-in-page-I">
        <div>
          <img src={Back} alt="backlogo" className="image-sign-up" onClick={handleBack} />
        </div>
        <div className="login-page-select-option hide">
          <select className="select-option">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>

      <div className="container-sign-in-page-III">
        <div>
          <img src={Logo} alt="logo" />
        </div>

         <div className='form-container-sign-in-page-I'>
                 <div className='header-container-forget-password-II'>
                   <div className='form-header-forget-password-II'>
                     <div className='form-header-text-forget-password-II-div'>
                       <h1 className='form-header-text-sign-in-page'>Sign Up</h1>
                     </div>
                     <div className='progress-bar-forget-password-II'>
                       <img src={Group} alt="logo" />
                     </div>
                   </div>
                   <div className='side-logo-sign-in-page'>
                     <img src={Three} alt="logo" />
                   </div>
                 </div>

          <div className="sub-header-sign-in-page-I">
            <div className="sub-header-sign-in-page-I-text">
              <p>Company Info</p>
            </div>
            <div>
              <img src={Line} alt="" />
            </div>
          </div>

          {/* FORM START */}
          <form onSubmit={formik.handleSubmit}>
            {/* First Column */}
            <div className="first-column-details">
              <div className="input-wrapper">
              <div className="input-group-sign-in-row-I">
                <input
                  className="input-details-sign-in-row-I"
                  type="text"
                  placeholder="Company Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <p className="custom-error">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="input-wrapper">
              <div className="input-group-sign-in-row-I">
                <img src={Message} alt="email-icon" />
                <input
                  className="input-details-sign-in-row-I"
                  type="email"
                  placeholder="Company Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <p className="custom-error">{formik.errors.email}</p>
                ) : null}
              </div>
            </div>

            {/* Second Column */}
            <div className="second-column-details">
              <div className="input-wrapper">
              <div className="input-group-sign-in">
                <select
                  className="select-login-page-III"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
                </div>
                {formik.touched.country && formik.errors.country ? (
                  <p className="custom-error">{formik.errors.country}</p>
                ) : null}
              </div>
              <div className="input-wrapper">
              <div className="input-group-sign-in">
                <select
                  className="select-login-page-III"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Makkah">Makkah</option>
                  <option value="Madina">Madina</option>
                  <option value="Jeddah">Jeddah</option>
                </select>
                </div>
                {formik.touched.city && formik.errors.city ? (
                  <p className="custom-error">{formik.errors.city}</p>
                ) : null}
              </div>
            </div>

            {/* Third Column */}
            <div className="second-column-details">
              <div className="input-wrapper">
              <div className="input-group-sign-in">
                <img src={Adress} alt="address-icon" />
                <input
                  className="input-details-sign-in-row-I"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                </div>
                {formik.touched.address && formik.errors.address ? (
                  <p className="custom-error">{formik.errors.address}</p>
                ) : null}
              </div>
            </div>

            {/* Submit Button */}
            <div className="proceed-button">
              <button type="submit">{loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>

        <div className="login-help-div">
          <div className="login-hepl-image">
            <img src={Question} alt="help-icon" />
          </div>
          <div className="login-help-link">
            <a href="#">Need Help?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
});
export default connect(
  mapStateToProps,
  { registerUser }
)(SignPageIII);


