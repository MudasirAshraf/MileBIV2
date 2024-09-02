import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.scss";
import Logo from "../../assets/svg/logo.svg";
import User from "../../assets/svg/User_light.svg";
import Password from "../../assets/svg/Key_light.svg";
import Question from "../../assets/svg/Question_light.svg";
import { getAuth } from "../actions/loginActions";
const LoginPage = ({getAuth}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState('');

  let handleNameChange = (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      return { ...currData, [fieldValue]: newValue };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    // Validate that both fields are filled out
    if (!formData.userName || !formData.password) {
      setError("Please enter both username and password.");
      return;
    }

    setError('');
    console.log(formData);
    //getAuth(your login details)
    navigate("/create-dashboard");
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
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <img src={User} alt="userlogo" />
                <input
                  className='input-details'
                  type="text"
                  placeholder="Username"
                  name="userName"
                  id='userName'
                  value={formData.userName}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="input-group">
                <img src={Password} alt="passlogo" />
                <input
                  className='input-details'
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  id='password'
                  onChange={handleNameChange}
                  required
                />
              </div>
              {/* setting up error */}
              {error && <div className='form-text'><p>{error}</p></div>}
              {/* Adding Button */}
              <div className='button-text-div'>
                <div className='form-button-div'>
                  <div className='form-link'>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleForgetPassword(); }}>
                      Forget Password?
                    </a>
                  </div>
                  <div><button type="submit">Login</button></div>
                </div>
                <div className='form-button-div'>
                  <div>
                    <a href="#" className='form-link-i' onClick={(e) => { e.preventDefault(); handleCreateAccount(); }}>
                      Don't have an account?
                    </a>
                  </div>
                  <div><button className='button-1' onClick={handleCreateAccount}>Create Account</button></div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='login-help-div'>
          <div className='login-help-image'>
            <img src={Question} alt='logo' />
          </div>
          <div className='login-help-link'><a href='#'>Need Help?</a></div>
        </div>
      </div>
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
