import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import "./login.scss";
import Logo from "../../assets/svg/logo.svg";
import User from "../../assets/svg/User_light.svg";
import Password from "../../assets/svg/Key_light.svg";
import Question from "../../assets/svg/Question_light.svg";
import { getAuth } from "../../actions/loginActions";
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  // Defining validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(''),
    password: Yup.string().min(5, 'Minimum five characters').required(''),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await dispatch(getAuth(values)); 
      if (response && response.success){
    sessionStorage.setItem("token", response.data.token)
      navigate('/create-dashboard'); 
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error('Login submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCreateAccount = () => {
    navigate('/sign-up-page-I');
  };

  const handleForgetPassword = () => {
    navigate('/forget-password-I');
  };

  return (
    <div className='main-container-login-page'>
      <div className='login-page-select-option'>
        <select className='select-option'>
          <option>English</option>
          <option>Arabic</option>
        </select>
      </div>
      <div className='container-login-page'>
        <div>
          <img src={Logo} alt='logo' />
        </div>
        <div className='form-container'>
          <div className='form-header'>
            <h1 className='form-header-text'>Sign In</h1>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="input-group">
                    <img src={User} alt="userlogo" />
                    <Field
                      className='input-details'
                      type="text"
                      placeholder="Username"
                      name="username"
                      id='username'
                    />
                    <ErrorMessage name="username" component="div" className='form-text' />
                  </div>
                  <div className="input-group">
                    <img src={Password} alt="passlogo" />
                    <Field
                      className='input-details'
                      type="password"
                      placeholder="Password"
                      name="password"
                      id='password'
                    />
                    <ErrorMessage name="password" component="div" className='form-text' />
                  </div>
                  {/* Adding Button */}
                  <div className='button-text-div'>
                    <div className='form-button-div'>
                      <div className='form-link'>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleForgetPassword(); }}>
                          Forget Password?
                        </a>
                      </div>
                      <div><button type="submit" disabled={isSubmitting}>Login</button></div>
                    </div>
                    <div className='form-button-div'>
                      <div>
                        <a href="#" className='form-link-i' onClick={(e) => { e.preventDefault(); handleCreateAccount(); }}>
                          Don't have an account?
                        </a>
                      </div>
                      <div><button type="button" className='button-1' onClick={handleCreateAccount}>Create Account</button></div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className='login-help-div'>
          <div className='login-help-image'>
            <img src={Question} alt='logo' />
          </div>
          <div className='login-help-link'><a href='#'>Need Help?</a></div>
        </div>
      </div>
      <ToastContainer
      position='top-right' 
        autoClose={4000}        
        hideProgressBar={false} 
        newestOnTop={false}     
        closeOnClick            
        rtl={false}             
        pauseOnFocusLoss       
        draggable              
        pauseOnHover            
      />
    </div>
  );
};
LoginPage.propTypes = {
  getAuth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  response: state.response.response,
});

export default connect(mapStateToProps, { getAuth })(LoginPage);
