import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./account-settings-ci.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Check from "../../assets/svg/check.svg";
import EArrow from "../../assets/svg/expandarrow.svg";
import Message from "../../assets/svg/Message_light.svg";
import Adress from "../../assets/svg/adress.svg";
import Line from "../../assets/svg/line.svg";
import { connect } from 'react-redux';
import axiosInstance from '../../components/axios';
import urlswithoutgateway from '../../actions/urlswithoutgateway';
import { toast } from 'react-toastify';

const AccountSettingsCI = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    email: "",
    country: "",
    city: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    if (user) {
      axiosInstance.get(`/organization/get/${user.organizationId}`)
        .then(response => {
          const data = response?.data?.data || {};
          setInitialValues({
            id: data.id || "",
            name: data.name || "",
            email: data.email || "",
            country: data.country || "",
            city: data.city || "",
            address: data.address || ""
          });
        })
        .catch(error => {
          console.error("Error fetching company info", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);


  const handleAccountSettings = () => {
    navigate("/account-settings");
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Email is not valid").required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    address: Yup.string().required("Required")
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.put("/organization/update", values);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        navigate("/account-settings");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error updating company info. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-container-account-settings-ci'>
      <div className='container-account-settings-ci'>
        <DashboardWrapper>
          <div className='account-settings-ci'>
            <img src={Check} alt="logo" />
            <p className='account-settings-ci-paragraph' onClick={handleAccountSettings}>Account Settings</p>
            <img src={EArrow} alt='logo' />
            <p>Company Info</p>
          </div>
          <div className='account-settings-ci-header'>
            <p>{id ? "Edit Company Info" : "Change Company Info"}</p>
            <img src={Line} alt='line' />
          </div>
          <div>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className='account-settings-ci-form-container'>
                  {/* First Row */}
                  <div className='account-settings-ci-ist-row'>
                    <div className='input-group-sign-in-row-I-account-settings-pi'>
                      <Field
                        className='input-details-sign-in-row-I-account-settings-pi'
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Company Name'
                      />
                      <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div className='input-group-sign-in-account-settings-ci'>
                      <img src={Message} alt="passlogo" />
                      <Field
                        className="input-details-sign-in-account-settings-ci"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                      />
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div>
                      <Field
                        as="select"
                        className="styled-select"
                        id="country"
                        name="country"
                      >
                        <option value="" disabled>
                          Country
                        </option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="australia">Australia</option>
                        <option value="india">India</option>
                      </Field>
                      <ErrorMessage name="country" component="div" className="error" />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className='account-settings-ci-2nd-row'>
                    <div>
                      <Field
                        as="select"
                        className="styled-select"
                        id="city"
                        name="city"
                      >
                        <option value="" disabled>
                          City
                        </option>
                        <option value="madinah">Madinah</option>
                        <option value="riyadh">Riyadh</option>
                        <option value="haram">Haram</option>
                        <option value="muntaha">Muntaha</option>
                      </Field>
                      <ErrorMessage name="city" component="div" className="error" />
                    </div>
                    <div className='input-group-ci'>
                      <img src={Adress} alt="passlogo" />
                      <Field
                        className='input-details-adress-ci'
                        type="text"
                        id="address"
                        name="address"
                        placeholder='Address'
                      />
                      <ErrorMessage name="address" component="div" className="error" />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className='account-settings-ci-third-row'>
                    <button type='submit' disabled={isSubmitting}>Update</button>
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
  user: state.login.user
});
export default connect(mapStateToProps)(AccountSettingsCI);

