import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.scss";
import Logo from "../../assets/svg/logo.svg";
import User from "../../assets/svg/User_light.svg";
import Password from "../../assets/svg/Key_light.svg";
import Question from "../../assets/svg/Question_light.svg";



const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName:"",
    password:"",
  })

  let handleNameChange = (event)=> {
   let fieldValue = event.target.name;
   let newValue = event.target.value;
   setFormData((currData)=> {
    return{...currData, [fieldValue] : newValue}
   })
}

let handleSubmit = (event) => {
  event.preventDefault();
  console.log(formData);
  navigate("/create-dashboard");
}

  const handleCreateAccount = () => {
    navigate('/sign-up-page-I');
  };

  const handleForgetPassword = () => {
    navigate('/forget-password-I');
  };

  return (
    <div className='main-container-login-page'>
          {/* adding select option */}
          <div className='login-page-select-option'>
          <select className='select-option'>
            <option>English</option>
            <option>Arabic</option>
          </select>
         </div>
      <div className='container-login-page'>
       
         {/* adding Logo to the page */}
         <div>
          <img src={Logo} alt='logo'/>
         </div>
         {/* adding Form container */}
         <div className='form-container'>
          {/* header */}
          <div className='form-header'>
            <h1 className='form-header-text'>Sign In</h1>
          </div>
          {/* Form */}
          <div>
          <form onSubmit={handleSubmit}>
        <div className="input-group">
        <img src={User} alt="userlogo"/>
          <input    className='input-details'
           type="text"
           placeholder="Username"
            name="userName"
            id='userName'
            value={formData.userName}
            onChange={handleNameChange}
            required />
        </div>
        <div className="input-group">
         <img src={Password} alt="passlogo"/>
          <input className='input-details'
           type="password" 
           placeholder="Password"
            name="password"
            value={formData.password}
            id='password'
            onChange={handleNameChange}
            required />
        </div>
        {/* adding text */}
        <div className='form-text'>
          <p>Something Went Wrong!</p>
        </div>
        <div className='button-text-div'>
        {/* adding button and text */}
        <div className='form-button-div'>
          <div className='form-link'><a href="" onClick={handleForgetPassword}>Forget Password?</a></div>
          <div><button type="submit">Login</button></div>
        </div>
        {/* adding button and text */}
        <div className='form-button-div'>
         <div><a href="" className='form-link-i'>Don't not have an account ?</a></div>
         <div><button className='button-1' onClick={handleCreateAccount}>Create Account</button></div>
        </div>
        </div>
      </form>
          </div>
         </div>
         <div className='login-help-div'>
          <div className='login-hepl-image'>
            <img src={Question} alt='logo'/>
          </div>
          <div className='login-help-link'><a href=''>Need Help ?</a></div>
          
         </div>
      </div>
     
    </div>
  )
}

export default LoginPage;
