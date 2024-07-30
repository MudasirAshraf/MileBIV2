import React from 'react';
import "./card-III.scss";
import EYE from "../../assets/svg/eye.svg";

const CardIII = ({image,Title,}) => {
  return (
  <div className='card-iii'>
  {/* first column */}
  <div className='first-column-cardiii'>
     <div className='card-iii-image'>
     <img src={image} alt="logo" />
     </div>
     <div>
        <p>{Title}</p>
     </div>
  </div>
  {/* second column */}
  <div className='second-column-cardiii'>
    <button className='second-column-cardiii-buttton'>
        <img src={EYE} alt=""/>
        <p>View</p>
    </button>
  </div>
  </div>
  )
}

export default CardIII;