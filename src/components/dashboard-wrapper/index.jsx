import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './dashboard-wrapper.scss';
import Logo from "../../assets/svg/logo.svg";
import Home from "../../assets/svg/Home.svg";
import Published from "../../assets/svg/published.svg";
import Drafts from "../../assets/svg/drafts.svg";
import Workspace from "../../assets/svg/workspace.svg";
import Group from "../../assets/svg/Group.svg";
import Dataset from "../../assets/svg/dataset.svg";
import Square from "../../assets/svg/squarelight.svg";
import Bell from "../../assets/svg/bell.svg";

const DashboardWrapper = ({ children, publishedCount, draftsCount, workspacesCount }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateDashboard = () => {
    navigate("/create-dashboard-modals");
  };

  const handleCreateDataset = () => {
    navigate("/create-dataset-I");
  };

  const handleCreateGrids = () => {
    navigate("/grids");
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === 'settings') {
      handleSettings();
    } else if (value === 'logout') {
      handleCreateDash();
    }
  };

  const handleSettings = () => {
    navigate("/account-settings"); 
  };

  const handleCreateDash = () => {
    navigate("/create-dashboard");
  }

  return (
    <div className='main-container-dashboard-wrapper'>
      {/* Main Container */}
      <div className='container-dashboard-wrapper'>
        {/* Adding side-bar */}
        <div className='container-side-bar'>
          <div className='main-container-side-bar'>
            <div className='side-bar-logo'>
              <img src={Logo} alt='side-bar-logo' />
            </div>
            <div className='container-list-items'>
              <li className={`list-item-side-bar ${location.pathname === '/create-dashboard' ? 'active' : ''}`}>
                <img src={Home} alt='' />
                <Link to="/create-dashboard">Home</Link>
              </li>
              <li className={`list-item-side-bar ${location.pathname === '/published' ? 'active' : ''}`}>
                <img src={Published} alt='' />
                <Link to="/published">Published</Link>
                <div className='pcount'>{publishedCount}</div>
              </li>
              <li className={`list-item-side-bar ${location.pathname === '/drafts' ? 'active' : ''}`}>
                <img src={Drafts} alt='' />
                <Link to="/drafts">Drafts</Link>
                <div className='pcount'>{draftsCount}</div>
              </li>
              <li className={`list-item-side-bar ${location.pathname === '/workspaces' ? 'active' : ''}`}>
                <img src={Workspace} alt='' />
                <Link to="/workspaces">Workspaces</Link>
                <div className='pcount'>{workspacesCount}</div>
              </li>
            </div>
          </div>
        </div>
        <div className='dashboard-wrapper-header'>
          {/* Adding main content header */}
          <div className='main-container-header-dashboard-wrapper'>
            {/* first div */}
            <div className='first-div-header-dashboard-wrapper'>
              <div className='first-div-header-dashboard-wrapper-image'>
                <img src={Workspace} alt="" />
              </div>
              <div className='first-div-first-row'>
                <p className='first-div-first-row-text'>Selected Workspace</p>
                <select className='first-div-first-row-select'>
                  <option>DASO</option>
                  <option>SADO</option>
                </select>
              </div>
            </div>
            {/* Second div */}
            <div className='first-div-second-row'>
              {/* 1st button */}
              <div>
                <button className='first-div-second-row-btn-I' onClick={handleCreateGrids}>
                  <img src={Group} alt="logo" />
                  <p>Dashboard Builder</p>
                </button>
              </div>
              {/* 2nd button */}
              <div>
                <button className='first-div-second-row-btn-II' onClick={handleCreateDataset}>
                  <img src={Square} alt="logo" />
                  <p>Create a Dataset</p>
                </button>
              </div>
              {/* 3rd button */}
              <div>
                <button className='first-div-second-row-btn-III'  onClick={handleCreateDashboard}>
                  <img src={Square} alt="logo" />
                  <p>Create a Dashboard</p>
                </button>
              </div>
              {/* 4th Select option */}
              <div className='first-div-second-row-btn-IV'>
                <img src={Dataset} alt="logo" />
                <select className='first-div-second-row-btn-IV-select' onChange={handleSelectChange}>
                  <option value="">Select an option</option>
                  <option value="settings">Account Settings</option>
                  <option value="logout">Logout</option>
                </select>
              </div>
              {/* 5th div */}
              <div className='first-div-second-row-btn-V'>
                <img src={Bell} alt="logo" />
              </div>
            </div>
          </div>
          <div className='dashboard-wrapper-content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardWrapper;
