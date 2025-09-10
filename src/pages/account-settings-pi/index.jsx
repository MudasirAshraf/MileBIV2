import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./account-settings-pi.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Avatar from "../../assets/png/avataar.png";
import Phone from "../../assets/svg/Phone_light.svg";
import axiosInstance from "../../components/axios";
import { connect } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { toast } from "react-toastify";
import { updateCurrentUser } from "../../actions/loginActions";

const AccountSettingsPI = ({ user, updateCurrentUser }) => {
  const [initialFormValues, setInitialFormValues] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    role: null,
    productId: null,
    profileImage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    if (user) {
      axiosInstance
        .get(`/user/getbyid/${user.id}`)
        .then((response) => {
          setInitialFormValues({
            id: response.data.data.id || 0,
            productId: response.data.data.productId || null,
            email: response.data.data.email || "",
            role: response.data.data.role || null,
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            phoneNo: response.data.data.phoneNo || "",
            profileImage: response.data.data.profileImage || null,
          });
        })
        .catch((error) => {
          console.error(error);
          alert("Error retrieving information");
        });
    }
  }, []);

  const handleAccountSettings = () => {
    navigate("/account-settings");
  };

  const updateProfile = (values, setSubmitting) => {
    const updatedUser = {
      ...user,
      profileImage: values.profileImage,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNo: values.phoneNo,
    };
    if (values.profileImage) {
      values.profileImage = values.profileImage.split(",")[1];
    }

    axiosInstance
      .put("/user/updateuser", values)
      .then((response) => {
        if (response.data.messageType === 1) {
          toast.success(response.data.message);
          updateCurrentUser(updatedUser);
          navigate("/account-settings");
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating profile. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    phoneNo: Yup.string()
      .matches(/^\d{7,13}$/, "Phone number must be between 7 and 13 digits.")
      .required("Phone number is required."),
  });

  return (
    <div className="main-container-sccount-settings-pi">
      <div className="container-account-settings-pi">
        <DashboardWrapper>
          <div className="account-settings-pi">
            <img src={Check} alt="logo" />
            <p
              className="account-settings-ci-paragraph"
              onClick={handleAccountSettings}
            >
              Account Settings
            </p>
            <img src={EArrow} alt="logo" />
            <p className="account-settings-ci-paragraph">Personal Info</p>
          </div>
          <div className="account-settings-pi-header">
            <p>Change Avatar</p>
            <hr className="divider" />
          </div>
          <Formik
            initialValues={initialFormValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              updateProfile(values, setSubmitting);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <>
                <div className="image-upload-container">
                  <div className="backgroung-image-container">
                    <div className="image-preview">
                      {values.profileImage ? (
                        <img
                          src={values.profileImage}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <img
                          src={Avatar}
                          alt="Default"
                          className="default-image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="alert-button">
                    <div className="alert-button-inside">
                      <button className="change-button" onClick={handleClick}>
                        Change
                      </button>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => setFieldValue("profileImage", null)}
                      >
                        Remove
                      </button>
                      <input
                        type="file"
                        id="imageUploadInput"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFieldValue("profileImage", reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="account-settings-pi-header">
                  <p>Personal Info</p>
                  <hr className="divider" />
                </div>
                <Form className="form-account-settings-pi">
                  <div className="account-settings-pi-form">
                    <div className="input-wrapper">
                    <div className="input-group-sign-in-row-I-account-settings-pi">
                      <Field
                        className="input-details-sign-in-row-I-account-settings-pi"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                      />
                      </div>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className='custom-error'
                      />
                    </div>
                    <div className="input-wrapper">
                    <div className="input-group-sign-in-row-I-account-settings-pi">
                      <Field
                        className="input-details-sign-in-row-I-account-settings-pi"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                      />
                      </div>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className='custom-error'
                      />
                    </div>
                    <div className="input-wrapper">
                    <div className="input-group-sign-in-account-settings-pi">
                      <img src={Phone} alt="phone" />
                      <Field
                        className="input-details-sign-in-account-settings-pi"
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
                        placeholder="Phone Number"
                      />
                      </div>
                      <ErrorMessage
                        name="phoneNo"
                        component="div"
                        className='custom-error'
                      />
                    </div>
                  </div>
                  <div className="account-settings-pi-form-button">
                    <button type="submit" disabled={isSubmitting}>
                      Update
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </DashboardWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});
export default connect(mapStateToProps, { updateCurrentUser })(
  AccountSettingsPI
);
