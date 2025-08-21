import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import "./card-IV.scss";
import EYE from "../../assets/svg/eye.svg";
import CenterLogo from "../../assets/svg/centerlogo.svg";
import { useNavigate } from "react-router-dom";
import { setCurrent, deleteDataset } from "../../actions/datasetActions";
import { setDatabaseDataPayload } from "../../actions/dataSourceActions";

const CardIV = ({
  dataset,
  setCurrent,
  deleteDataset,
  setDatabaseDataPayload,
  dataSource,
}) => {
  // const [showDropdown, setShowDropdown] = useState(false);
  // const handleSettingClick = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleDataSet = () => {
    setCurrent(dataset);
    // dispatch(setRequestPayload(requestPayload));
    const databaseData = {
      ...dataSource,
      datasetId: dataset.datasetId,
      tableName: dataset.datasetTitle,
    };

    dispatch(setDatabaseDataPayload(databaseData));
    navigate("/dataset-view?id=" + dataset.datasetId);
  };

  return (
    <div className="card-iv">
      {/* second column */}
      <div className="second-column-card-iv">
        <img
          src={CenterLogo}
          alt="logo"
          className="second-column-card-iv-image"
        />
      </div>
      {/* third column */}
      <div className="third-column-card-iv">
        <p className="datasets-paragraph">{dataset?.datasetTitle}</p>
      </div>
      {/* fourth column */}
      <div className="fourth-column-card-iv" onClick={handleDataSet}>
        <button className="fourth-column-card-iv-button">
          <img src={EYE} alt="logo" />
          <p className="datasets-btn-para">View</p>
        </button>
      </div>
    </div>
  );
};

CardIV.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  deleteDataset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.response.response,
  dataSource: state.dataSource.data,
});

export default connect(mapStateToProps, {
  setCurrent,
  deleteDataset,
  setDatabaseDataPayload,
})(CardIV);
