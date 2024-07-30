import React from 'react';
import "./card-I.scss";

const CardI = ({logo,title,subtitle,subtitleI,onLogoClick}) => {
  return (
    <div className='main-container-card-I'>
      {/* Adding First div */}
      <div className='card-I-column-I'>
        <div className='card-I-column-I-logo'>
        <img 
            src={logo} 
            alt="logo" 
            onClick={onLogoClick} 
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      {/* Adding Second Div */}
      <div className='card-I-column-II'>
          <p className='card-I-column-II-para-I'>{title}</p>
          <p className='card-I-column-II-para-II'>{subtitle}</p>
          <p className='card-I-column-II-para-II'>{subtitleI}</p>
      </div>
    </div>
  )
}

export default CardI;
