import React from 'react';
import "./card-III.scss";
import EYE from "../../assets/svg/eye.svg";

const CardIII = ({ image, title, id }) => {
  const handleClickPage = () => {
    // Navigate to different pages based on the card ID
    if (id === 1) {
      window.location.href = '/template-I'; 
    } else if (id === 2) {
      window.location.href = '/template-II';
    } else if (id === 3) {
      window.location.href = '/template-III'; 
    }
  };

  return (
    <div className='card-iii'>
      {/* first column */}
      <div className='first-column-cardiii'>
        <div className='card-iii-image'>
          <img src={image} alt="logo" />
        </div>
        <div>
          <p>{title}</p>
        </div>
      </div>
      {/* second column */}
      <div className='second-column-cardiii'>
        <button
          className='second-column-cardiii-buttton'
         onClick={handleClickPage}
        >
          <img src={EYE} alt="View" />
          <p>View</p>  
        </button>
      </div>
    </div>
  );
};

export default CardIII;
