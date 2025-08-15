import React from "react";
import "./card-III.scss";
import EYE from "../../assets/svg/eye.svg";
import { useNavigate } from "react-router-dom";

const CardIII = ({ image, title, route }) => {
  const navigate = useNavigate();

  const handleClickPage = () => {
    if (route) {
      navigate(route);
    } else {
      console.warn("No route provided for this card");
    }
  };

  return (
    <div className="card-iii">
      {/* first column */}
      <div className="first-column-cardiii">
        <div className="card-iii-image">
          <img src={image} alt="logo" />
        </div>
        <div>
          <p className="paragraph-card-outlet">{title}</p>
        </div>
      </div>
      {/* second column */}
      <div className="second-column-cardiii">
        <button
          className="second-column-cardiii-buttton"
          onClick={handleClickPage}
        >
          <img src={EYE} alt="View" />
          <p className="paragraph-button">View</p>
        </button>
      </div>
    </div>
  );
};

export default CardIII;
