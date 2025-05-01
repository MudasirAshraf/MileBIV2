import React from "react";
import "./card-V.scss";
import Trash from "../../assets/svg/trashwhite.svg";
import BookI from "../../assets/svg/bookI.svg";
import Calendar from "../../assets/svg/calendar.svg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CardV = ({
  id,
  date,
  dashboard,
  datasets,
  title,
  onDelete,
  createdDate,
}) => {
  const navigate = useNavigate();

  const handleAnotherPage = () => {
    navigate("/workspace-dashboard/" + id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card-v">
      {/* first column */}
      <div className="first-column-card-v">
        {/* <div className='fc-card-v-c-1'>
          <div className='fc-card-v-img-1' onClick={handleDelete}>
            <img src={Trash} alt='logo' />
          </div>
        </div> */}
        <div className="fc-card-v-c-2">
          <img src={BookI} alt="" />
        </div>
        <div className="fc-card-v-c-3">
          <p>{title}</p>
        </div>
      </div>
      {/* second column */}
      <div className="second-column-card-v">
        <img src={Calendar} alt="logo" />
        <p>Date Created: {moment(createdDate).format("DD-MM-YYYY")}</p>
      </div>
      {/* third column */}
      <div className="third-column-card-v">
        {/* third column first row */}
        <div
          className="third-column-card-v-first-row"
          onClick={handleAnotherPage}
        >
          <div className="third-column-card-v-circle-div">
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardV;
