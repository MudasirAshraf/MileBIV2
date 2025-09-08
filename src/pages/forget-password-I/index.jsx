import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Group from "../../assets/svg/group-I.svg";
import { forgotPassword } from "../../actions/loginActions";
import { useNavigate } from "react-router-dom";
import "./forget-pass-I.scss";
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
import SPIN from "../../assets/svg/spin.svg";
import Message from "../../assets/svg/Message_light.svg";
import LineI from "../../assets/svg/line1.svg";
import Question from "../../assets/svg/Question_light.svg";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import axiosInstance from "../../components/axios";
import { toast } from "react-toastify";

const ForgetPasswordI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required(""),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
        const response = await axiosInstance.post(
          "User/forgetpassword/" + values.email,
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
          navigate("/forget-password-II/" + values.email);
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(response.data.message);
      }
    },
  });
  return (
    <div className="main-container-forget-pass-I">
      <div className="header-details-sign-in-page-I">
        <div>
          <img
            src={Back}
            alt="backlogo"
            className="image-sign-up"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="login-page-select-option hide">
          <select className="select-option">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className="container-sign-in-page-II">
        <div>
          <img src={Logo} alt="logo" />
        </div>
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
              <img src={One} alt="logo" />
            </div>
          </div>
          <div className="sub-header-sign-in-page-I">
            <div className="sub-header-sign-in-page-I-text">
              <p>Personal Info</p>
            </div>
            <hr className="sub-header-line" />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group-fp-I">
              <img src={Message} alt="userlogo" />
              <input
                className="input-details-sign-in"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="custom-error-I">{formik.errors.email}</div>
            ) : null}
            <div className="button-fp-I">
              <button className="btn-fp-I" type="submit">
                {loading && <img src={SPIN} alt="" />}
                Proceed
              </button>
            </div>
          </form>
          <div className="container-subheader-line">
            <hr className="sub-header-line-I" />
          </div>
          <div className="form-sign-in-fp-I">
            <div>
              <button className="btn-create" onClick={() => navigate("/")}>
                Sign In
              </button>
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
    </div>
  );
};

export default ForgetPasswordI;
