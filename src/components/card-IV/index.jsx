import React, { useState } from 'react';
import "./card-IV.scss";
import Setting from "../../assets/svg/setting.svg";
import EYE from "../../assets/svg/eye.svg";
import CenterLogo from "../../assets/svg/centerlogo.svg";
import DropdownMenu from '../dropdown-menu';
import { useNavigate } from 'react-router-dom';

const CardIV = ({title,}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSettingClick = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();

  const handleDataSet = () => {
    navigate('/dataset-view', { state: { datasetTitle: title } });
  };


  return (
    <div className='card-iv'>
    {/* first column */}
    <div className='card-iv-setting'>
    <div className='first-column-card-iv'>
        <img src={Setting} alt="logo" className='first-column-card-iv-image' onClick={handleSettingClick}/>
        {showDropdown && <DropdownMenu />}
    </div>
    </div>
    {/* second column */}
    <div className='second-column-card-iv'>
    <img src={CenterLogo} alt="logo" className='second-column-card-iv-image'/>
    </div>
    {/* third column */}
    <div className='third-column-card-iv'>
          <p>{title}</p>
    </div>
    {/* fourth column */}
    <div className='fourth-column-card-iv' onClick={handleDataSet}>
        <button className='fourth-column-card-iv-button'>
    <img src={EYE} alt="logo"/>
    <p>View</p>
    </button>
    </div>
    </div>
  )
}

export default CardIV;