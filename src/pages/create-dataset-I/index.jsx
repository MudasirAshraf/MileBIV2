import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./dataset-I.scss";
import Back from "../../assets/svg/Back.svg";
import Group from "../../assets/svg/group-I.svg";
import Cross from "../../assets/svg/cross.svg";
import One from "../../assets/png/1.png";
import Line from "../../assets/svg/line.svg";
import I1 from "../../assets/svg/I1.svg";
import I2 from "../../assets/svg/I2.svg";
import I3 from "../../assets/svg/I3.svg";
import I4 from "../../assets/svg/I4.svg";
import I5 from "../../assets/svg/I5.svg";
import I6 from "../../assets/svg/I5.svg";
import I7 from "../../assets/svg/json.svg";
import { setSelectedDatabasePayload } from "../../actions/dataSourceActions";
const DatasetI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDatasetII = (databaseType) => {
    dispatch(setSelectedDatabasePayload(databaseType));
    navigate("/create-dataset-II", { state: { databaseType } });
  };

  const handleCreateDashboard = () => {
    navigate("/create-dashboard");
  };

  return (
    <div className="main-container-dataset-I">
      <div className="header-dataset-I">
        {/* Adding Header */}
        <div>
          <img
            src={Back}
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={handleCreateDashboard}
          />
        </div>
        <div>
          <img src={Cross} alt="logo" />
        </div>
      </div>
      {/* Main container */}
      <div className="container-dataset-I">
        {/* first row */}
        <div className="first-row-dataset-I">
          <p>Create a Dataset</p>
          <div className="progress-bar-forget-password-II">
            <img src={Group} alt="logo" />
          </div>
        </div>
        <div className="third-row-dataset-I">
          <img src={One} alt="logo" />
        </div>
        <div className="header-dashboard-modals">
          <p>Select Data Source</p>
          <img src={Line} alt="logo" />
        </div>
        {/* cards container */}
        <div className="cards-container-dataset-I">
          {/* first card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("sqlserver")}
          >
            <div>
              <img src={I1} alt="logo" />
            </div>
            <div>
              <p>SQL Server</p>
            </div>
          </div>
          {/* second card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("postgre")}
          >
            <div>
              <img src={I2} alt="logo" />
            </div>
            <div>
              <p>Postgre</p>
            </div>
          </div>
          {/* Third card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("Oracle")}
          >
            <div>
              <img src={I3} alt="logo" />
            </div>
            <div>
              <p>Oracle Database</p>
            </div>
          </div>
          {/* Fourth card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("ibm")}
          >
            <div>
              <img src={I4} alt="logo" />
            </div>
            <div>
              <p>IBM DB</p>
            </div>
          </div>
          {/* Sixth card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("mysql")}
          >
            <div>
              <img src={I4} alt="logo" />
            </div>
            <div>
              <p>My Sql</p>
            </div>
          </div>
          {/* Sixth card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("excel")}
          >
            <div>
              <img src={I5} alt="logo" />
            </div>
            <div>
              <p>Excel</p>
            </div>
          </div>
          {/* Seventh card */}
          <div
            className="card-I-dataset-I"
            onClick={() => handleDatasetII("json")}
          >
            <div>
              <img src={I4} alt="logo" />
            </div>
            <div>
              <p>JSON</p>
            </div>
          </div>
        </div>
        {/* Adding Button */}
        <div className="button-dataset-I">
          <button onClick={() => handleDatasetII()}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default DatasetI;
