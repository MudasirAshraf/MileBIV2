import React from "react";
import "./modal-II.scss";
import { useNavigate } from "react-router-dom";
import GIII from "../../assets/svg/gIII.svg";
import Back from "../../assets/svg/Back.svg";
import Cross from "../../assets/svg/cross.svg";
import Three from "../../assets/png/3.png";
import Line from "../../assets/svg/line.svg";
import I1 from "../../assets/svg/I1.svg";
import I2 from "../../assets/svg/I2.svg";
import I3 from "../../assets/svg/I3.svg";
import I4 from "../../assets/svg/I4.svg";
import I5 from "../../assets/svg/I5.svg";

const CreateDashboardModalII = () => {
  const navigate = useNavigate();

  const handleDashboardI = () => {
    navigate("/create-dashboard-I");
  };

  const handleDashboardIII = () => {
    navigate("/create-dashboard-III");
  };
  return (
    <div className="main-container-create-dashboard-modals-II">
      <div className="header-create-dashboard-II">
        <div>
          <img
            src={Back}
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={handleDashboardI}
          />
        </div>
        <div>
          <img src={Cross} alt="logo" />
        </div>
      </div>
      {/* Adding Header */}
      <div className="container-dashboard-modals-II">
        <div className="first-row-dashboard-modals-II">
          <p className="paragrapgh-modals">Create a Dashboard</p>
          <img src={GIII} alt="logo" />
        </div>
        <div className="second-row-dashboard-modals-I">
          <img src={Three} alt="logo" />
        </div>
        <div className="header-dashboard-modals">
          <p>Select Data Source</p>
          <img src={Line} alt="logo" />
        </div>
        <div className="container-cards-dashboard-modal-II">
          {/* first card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I1} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* II card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I2} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* III card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I3} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* IV card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I4} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* V card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I5} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* VI card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I5} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* VII card */}
          <div className="card-I-dashboard-modal-II">
            <div>
              <img src={I5} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
        </div>
        {/* Adding Button */}
        <div className="button-dashboard-modal-II">
          <button onClick={handleDashboardIII}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDashboardModalII;
