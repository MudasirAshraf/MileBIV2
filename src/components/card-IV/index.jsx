import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import "./card-IV.scss";
import Setting from "../../assets/svg/setting.svg";
import EYE from "../../assets/svg/eye.svg";
import CenterLogo from "../../assets/svg/centerlogo.svg";
import DropdownMenu from '../dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { setCurrent, deleteDataset } from '../../actions/datasetActions';


const CardIV = ({dataset,setCurrent, deleteDataset}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSettingClick = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();

  const handleDataSet = () => {
    setCurrent(dataset);
    navigate('/dataset-view?id='+ dataset.datasetId);
  };
  


  return (
    <div className='card-iv'>
    {/* first column */}
    <div className='card-iv-setting'>
    <div className='first-column-card-iv'>
        <img src={Setting} alt="logo" className='first-column-card-iv-image' onClick={handleSettingClick}/>
        {showDropdown && (
            <DropdownMenu deleteDataset={deleteDataset} datasetId={dataset.datasetId} />
          )}
    </div>
    </div>
    {/* second column */}
    <div className='second-column-card-iv'>
    <img src={CenterLogo} alt="logo" className='second-column-card-iv-image'/>
    </div>
    {/* third column */}
    <div className='third-column-card-iv'>
          <p>{dataset?.datasetTitle}</p>
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

CardIV.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  deleteDataset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.response.response,
});

export default connect(mapStateToProps, { setCurrent, deleteDataset })(CardIV);