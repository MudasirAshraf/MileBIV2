import React, {useState} from 'react';
import './sign-up-page-III.scss';
import Logo from "../../assets/svg/logo.svg";
import Thrd from "../../assets/svg/third.svg";
import Back from "../../assets/svg/Back.svg";
import Three from "../../assets/png/3.png";
import Ring from '../../assets/svg/ringtick.svg';
import I from "../../assets/svg/1.svg";
import UnionII from '../../assets/svg/Union(3).svg';
import Two from "../../assets/svg/2(1).svg";
import EllipseI from "../../assets/svg/Ellipse 103.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Line from "../../assets/svg/line.svg";
import Question from "../../assets/svg/Question_light.svg";
import Message from "../../assets/svg/Message_light.svg";
import Adress from "../../assets/svg/adress.svg";


const SignPageIII = () => {

  const [formData, SetFormData] = useState({
    companyName:"",
    companyEmail:"",
    country:"",
    city:"",
    address:"",
  })

  let handleNameChange= (event) => {
    let fieldValue=event.target.name;
    let newValue= event.target.value;
    SetFormData((currData)=> {
      return {...currData, [fieldValue] : newValue}
    })
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert("Congratulations! Your account has been successfully created. Welcome to MileBI!. You can now log in.");
    SetFormData({
      companyName:"",
      companyEmail:"",
      country:"",
      city:"",
      address:"",
    })

  }
  return (
    <div className='"main-container-sign-in-page-III"'>
       <div className='header-details-sign-in-page-I'>
        <div>
          <img src={Back} alt="backlogo" className='image-sign-up'/>
        </div>
        {/* adding select option */}
        <div className='login-page-select-option'>
          <select className='select-option'>
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <div className='container-sign-in-page-III'>
        {/* adding Logo to the page */}
        <div>
          <img src={Logo} alt='logo'/>
        </div>
        {/* adding form container */}
        <div className='form-container-sign-in-page-I'>
          <div className='header-container-sign-in-page-III'>
            {/* header */}
            <div className='form-header-sign-in-page'>
              <div className='form-header-text-sign-in-page-div'>
                <h1 className='form-header-text-sign-in-page'>Sign Up</h1>
              </div>
              {/* Progress bar */}
              <div className='progress-bar-sign-in-page-III'>
                {/* first */}
                <div className='progress-sp-III-I'>
                  <div className='progress-sp-III-I-image-I'><img src={I} alt=""/></div>
                  <div className='progress-sp-III-I-image-II'><img src={EllipseI} alt=""/></div>
                  <div className='progress-sp-III-I-image-III'><img src={Ring} alt=""/></div>
                </div>
                {/* Second */}
                <div className='progress-sp-III-II'>
                  <div className='progress-sp-III-II-image-I'>
                    <img src={UnionII} alt=""/></div>
                </div>
                {/* Third */}
                <div className='progress-sp-III-III'>
                    <div className='progress--III-images'>
                  <div className='progress-sp-III-III-image-II'>
                  <img src={EllipseI} alt=""/>
                  <img src={Two} alt="" className='progress-sp-III-III-image-I'/>
                  </div>
                  <div className='progress-sp-III-III-image-III'><img src={Ring} alt=""/></div>
                  </div>
                </div>
                  {/* Fourth */}
                 <div className='progress-sp-III-IV'>
                 <div className='progress-sp-III-IV--image-I'>
                 <img src={UnionII} alt=""/></div>
                 </div>
                  {/* Fifth */}
                <div className='progress-sp-III-V'>
                <div className='progress-sp-III-V-image-I'>
                      <img src={EllipseI} alt=""/>
                    </div>
                    <div className='progress-sp-III-V-image-II'>
                      <img src={Thrd} alt=""/>
                    </div>
                    <div className='progress-sp-III-V-image-III'>
                      <img src={Polygon} alt=""/>
                    </div>
                </div>
              </div>
            </div>
            {/* Adding side logo */}
            <div className='side-logo-sign-in-page'>
              <img src={Three} alt="logo"/>
            </div>
          </div>
          {/* adding text */}
          <div className='sub-header-sign-in-page-I'>
            <div className='sub-header-sign-in-page-I-text'>
              <p>Company Info</p>
            </div>
            <div>
              <img src={Line} alt=""/>
            </div>
          </div>
           {/* Form */}
           <div>
            <form onSubmit={handleSubmit}>
              <div className='form-column-details'></div>
                 {/* first column */}
                 <div className='first-column-details'>
                 <div className="input-group-sign-in-row-I">
        {/* <img src={User} alt="userlogo"/> */}
          <input className='input-details-sign-in-row-I'
           type="text"
           placeholder="Company Name"
          name="companyName" 
          id='companyName'
          value={formData.companyName}
          onChange={handleNameChange}
              required />
        </div>
         <div className="input-group-sign-in-row-I">
         <img src={Message} alt="userlogo"/>
         <input className='input-details-sign-in-row-I'
          type="email" 
          placeholder="Company Email"
           name="companyEmail"
           value={formData.companyEmail}
           id='companyEmail'
           onChange={handleNameChange}
          required />
        </div>
                 </div>
                 {/* Second column */}
                 <div className='second-column-details'>
                 <div className="input-group-sign-in">
                 <select className="select-login-page-III"
                  placeholder="City"  
                  value={formData.city}
                  name='city'
                  id='city'
                 onChange={handleNameChange}
                  required>
  <option value="" disabled selected>Country</option>
  <option>Saudi Arabia</option>
  <option>INDIA</option>
  <option>PAK</option>
  <option>BANG</option>
</select>
        </div>
         <div className="input-group-sign-in">
         <select className="select-login-page-III"
          placeholder="City"
          value={formData.country}
          id='country'
          name='country'
          onChange={handleNameChange}
          required>
  <option value="" disabled selected>Select your city</option>
  <option>Riyadh</option>
  <option>Makkah</option>
  <option>Madina</option>
  <option>Jeddah</option>
</select>

        </div>
</div>
                 {/* third column */} 
                 <div className='second-column-details'>
                             <div className="input-group-sign-in">
                             <img src={Adress} alt="userlogo"/>
                             <input class="input-details-sign-in-row-I"
                              type="text" 
                              placeholder="Address"
                               name="address"
                               id='address'
                               value={formData.address}
                               onChange={handleNameChange}
                               required />

                             </div>
                 </div>
                 <div className='proceed-button' type="submit">
               <button>Proceed</button>
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

export default SignPageIII;
