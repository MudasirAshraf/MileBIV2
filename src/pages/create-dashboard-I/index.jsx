import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./modal-I.scss";
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import Two from '../../assets/png/2.png';
import PII from '../../assets/svg/P2.svg';
import Polygon from '../../assets/svg/Polygon 3.svg';
import Ring from "../../assets/svg/ringround.svg";
import Line from '../../assets/svg/line.svg';
import Scratch from '../../assets/svg/scratch.svg';
import T1 from "../../assets/svg/Mask group.svg";
import T2 from "../../assets/svg/MaskgroupI.svg";
import T3 from "../../assets/svg/MaskgroupII.svg";

const CreateDashboardModalI = () => {
  const navigate = useNavigate();

  const handleDashboardI = () => {
    navigate('/create-dashboard-modals');
  };

  const handleDashboardII = () => {
    navigate('/create-dashboard-II');
  };
  return (
<div className='main-container-create-dashboard-modals-I'>
<div className='header-create-dashboard-I'>
 <div>
  <img src={Back} alt="logo" onClick={handleDashboardI} style={{cursor:"pointer"}}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
</div>
{/* Adding Header */}
 <div className='container-dashboard-modals-I'>
   <div className='first-row-dashboard-modals-I'>
   <p>Create a Dashboard</p>
          <img src={PII} alt="logo"/>
          <div className='third-row-dashboard-modals-I'>
            <img src={Polygon} alt="logo"/>
          </div>
          <div className='fourth-row-dashboard-modals-I'>
            <img src={Ring} alt="logo"/>
          </div>
   </div>
   <div className='second-row-dashboard-modals-I'>
          <img src={Two} alt="logo"/>
        </div>
        <div className='header-dashboard-modals'>
          <p>Template Selector</p>
          <img src={Line} alt="logo"/>
        </div>
        <div className='container-cards-dashboard-modal-I'>
          {/* first card */}
          <div className='card-I-dashboard-modal-I'>
            <div><img src={Scratch} alt="logo"/></div>
          <div><p className='card-I-dashboard-modal-I-para'>Create From Scratch</p></div>
          </div>
          {/* second card */}
          <div className='card-II-dashboard-modal-I'>
            <div><img src={T1} alt="logo"/></div>
          <div><p>Template 1</p></div>
          </div>
          {/* third card */}
          <div className='card-II-dashboard-modal-I'>
            <div><img src={T2} alt="logo"/></div>
          <div><p>Template 2</p></div>
          </div>
          {/* fourth card */}
          <div className='card-II-dashboard-modal-I'>
            <div><img src={T3} alt="logo"/></div>
          <div><p>Template 3</p></div>
          </div>
        </div>
        <div className='button-dashboard-modal-I'>
          <button onClick={handleDashboardII}>Proceed With Selected Template</button>
        </div>
 </div>

</div>
  )
}

export default CreateDashboardModalI;