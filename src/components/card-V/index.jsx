import React from 'react';
import "./card-V.scss";
import Trash from "../../assets/svg/trashwhite.svg";
import BookI from '../../assets/svg/bookI.svg';
import Calendar from '../../assets/svg/calendar.svg';
import { useNavigate } from 'react-router-dom';

const CardV = ({ id, date, dashboard, datasets, title, onDelete }) => {
  const navigate = useNavigate();

  const handleAnotherPage = () => {
    navigate('/workspace-dashboard');
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className='card-v'>
      {/* first column */}
      <div className='first-column-card-v'>
        <div className='fc-card-v-c-1'>
          <div className='fc-card-v-img-1' onClick={handleDelete}>
            <img src={Trash} alt='logo' />
          </div>
        </div>
        <div className='fc-card-v-c-2'>
          <img src={BookI} alt="" />
        </div>
        <div className='fc-card-v-c-3'>
          <p>{title}</p>
        </div>
      </div>
      {/* second column */}
      <div className='second-column-card-v'>
        <img src={Calendar} alt="logo" />
        <p>Date Created: {date}</p>
      </div>
      {/* third column */}
      <div className='third-column-card-v'>
        {/* third column first row */}
        <div className='third-column-card-v-first-row' onClick={handleAnotherPage}>
          <div className='pra'>{dashboard}</div>
          <div className='third-column-card-v-circle-div'>10</div>
        </div>
        {/* third column second row */}
        <div className='third-column-card-v-second-row'>
          <div className='pra'>{datasets}</div>
          <div className='third-column-card-v-circle-div'>10</div>
        </div>
      </div>
    </div>
  );
};

export default CardV;
