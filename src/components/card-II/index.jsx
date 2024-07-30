import React, { useState } from 'react';
import './card-II.scss';
import DropdownMenu from '../dropdown-menu';
import Calendar from "../../assets/svg/calendar.svg";
import Setting from "../../assets/svg/setting.svg";
import Ring from "../../assets/svg/ring.svg";
import Temp from "../../assets/png/template.png";
import Draft from "../../assets/svg/draft.svg";

const CardII = ({ title, title1, title2, status }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSettingClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='card-ii'>
        {/* first column */}
        <div className='first-column-cardii'>
            <div className='sub-first-column'>
                <img src={Temp} alt="image"/>
            </div>
            <div className='card-ii-rows'>
              {status === "published" && (
                <div className='first-column-card-ii-row-i'>
                  <img src={Ring} alt="logo"/>
                  <p>Published</p>
                </div>
              )}
              {status === "draft" && (
                <div className='first-column-card-ii-row-i-part-i'>
                  <img src={Draft} alt="logo"/>
                  <p>Draft</p>
                </div>
              )}
              <div className='first-column-card-ii-row-ii' onClick={handleSettingClick}>
                <img src={Setting} alt="logo"/>
                {showDropdown && <DropdownMenu />}
              </div>
            </div>
            <div>
                <p>{title}</p>
            </div>
        </div>
        {/* second column */}
        <div className='second-column-card-ii'>
          <div className='second-column-card-ii-data-i'>
            <img src={Calendar} alt="logo"/>
            <p>Published: {title1}</p>
          </div>
          <div className='second-column-card-ii-data-ii'>
            <img src={Calendar} alt="logo"/>
            <p>Last Updated: {title2}</p>
          </div>
        </div>
        {/* third column */}  
        <div className='third-column-card-ii'>
            {status === "draft" && (
              <button className='third-column-card-ii-button'>
                <img src={Draft} alt="logo"/>
                <p>Draft and Unpublish</p>
              </button>
            )}
            {status === "published" && (
              <button className='third-column-card-ii-button-part-i'>
                <img src={Ring} alt="logo"/>
                <p>Publish</p>
              </button>
            )}
        </div>
    </div>
  );
};

export default CardII;
