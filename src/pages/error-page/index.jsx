import React from 'react';
import "./error-page.scss";
import CenterLogo from "../../assets/svg/data.svg";
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
  return (
    <div className='main-container-error-page'>
    <div className='container-error-page'>
   {/* first column */}
   <div className='error-image'>
    <img src={CenterLogo} alt="logo"/>
   </div>
   {/* second column */}
   <div className='second-column-error-page'>
    <h1>Something went wrong!</h1>
    <p>We couldn't process your request at this time. Please try again later.</p>
    <p>
  If the problem persists, contact support or <Link to="/">return to the homepage</Link>.
</p>
   </div>
    </div>
</div>
  );
};

export default ErrorPage;


