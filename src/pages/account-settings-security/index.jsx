import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./account-settings-security.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Line from "../../assets/svg/line.svg";
import Password from "../../assets/svg/Key_light.svg";
import { toast } from "react-toastify";
import axiosInstance from "../../components/axios";
import { connect } from "react-redux";

const AccoutSettingsSecurity = ({ user }) => {
  const navigate = useNavigate();

  const handleAccountSettings = () => {
    navigate("/account-settings");
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required."),
    newPassword: Yup.string()
      .required("New password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z]).{8,}$/,
        "Password must include letters and other characters."
      )
      .test(
        "not-same-as-old",
        "Old Passwords & New Password are same!",
        function (value) {
          return value !== this.parent.oldPassword;
        }
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("newPassword"), null], "New passwords do not match!"),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const { oldPassword, newPassword } = values;

    axiosInstance
      .put(
        `/user/resetpasswordbyuserid/${user.id}/${oldPassword}/${newPassword}`
      )
      .then((response) => {
        if (response.data.messageType === 1) {
          toast.success(response.data.message);
          navigate("/account-settings");
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="main-container-account-settings-security">
      <div className="container-account-settings-security">
        <DashboardWrapper>
          <div className="account-settings-security">
            <img src={Check} alt="logo" />
            <p
              className="account-settings-ci-paragraph"
              onClick={handleAccountSettings}
            >
              Account Settings
            </p>
            <img src={EArrow} alt="logo" />
            <p className="account-settings-ci-paragraph">Security</p>
          </div>
          <div className="account-settings-security-header">
            <p>Change Password</p>
            <img src={Line} alt="line" />
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className="form-account-settings-pi">
                  <div className="account-settings-pi-form">
                    <div className="input-wrapper">
                      <div className="input-group-sign-in-account-settings-pi">
                        <img src={Password} alt="passlogo" />
                        <Field
                          className="input-details-sign-in-account-settings-pi"
                          type="password"
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="Enter old password"
                        />
                      </div>
                      <ErrorMessage
                        name="oldPassword"
                        component="div"
                        className="custom-error"
                      />
                    </div>
                    <div className="input-wrapper">
                      <div className="input-group-sign-in-account-settings-pi">
                        <img src={Password} alt="passlogo" />
                        <Field
                          className="input-details-sign-in-account-settings-pi"
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          placeholder="Enter new password"
                        />
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="custom-error"
                      />
                    </div>
                    <div className="input-wrapper">
                      <div className="input-group-sign-in-account-settings-pi">
                        <img src={Password} alt="passlogo" />
                        <Field
                          className="input-details-sign-in-account-settings-pi"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="custom-error"
                      />
                    </div>
                  </div>
                  <div className="account-settings-pi-form-button">
                    <button type="submit">Update</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});
export default connect(mapStateToProps)(AccoutSettingsSecurity);
