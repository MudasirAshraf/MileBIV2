import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import "./create-dashboard.scss";
import DashboardWrapper from '../../components/dashboard-wrapper';
import Hline from "../../assets/svg/headerline.svg";
import TI from "../../assets/png/T1.png";
import TII from "../../assets/png/T2.png";
import TIII from "../../assets/png/T3.png";
import CardII from '../../components/card-II';
import CardIII from '../../components/card-III';
import CardIV from '../../components/card-IV';
import { getDatasets } from '../../actions/datasetActions';

const CreateDashboard = ({datasets,getDatasets}) => {
  const [activeTab, setActiveTab] = useState('create-dashboards');
  const [page, setPage] = useState(1); 
  const itemsPerPage = activeTab === 'datasets' ? 12 : 8; 
  

  useEffect(() => {
    getDatasets();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setPage(1); 
  };

  const cardsData = [
    { title: "Sales Dashboard", publishedDate: "21-Mar-2022", lastUpdatedDate: "21-Mar-2022", statusUpdate: "published" },
    { title: "Marketing Dashboard", publishedDate: "22-Mar-2022", lastUpdatedDate: "23-Mar-2022", statusUpdate: "draft" },
  ];

  const cardsDataI = [
    { id: 1, title: "Template 1", image: TI },
    { id: 2, title: "Template 2", image: TII },
    { id: 3, title: "Template 3", image: TIII },
  ];

  const totalPages = activeTab === 'create-dashboards' ? Math.ceil(cardsData.length / itemsPerPage) :
    activeTab === 'available-templates' ? Math.ceil(cardsDataI.length / itemsPerPage) :
    Math.ceil(datasets && datasets.length / itemsPerPage);

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return ( datasets &&
    <div className='main-container-create-dashboard'>
      <div className='container-create-dashboard'>
        <DashboardWrapper>
          {/* Adding header */}
          <div className='header-create-dasdhboard'>
            <div className={`header-I-create-dashboard ${activeTab === 'create-dashboards' ? 'active' : ''}`}>
              <a href="#" className='create-dashboard-links' onClick={() => handleTabClick('create-dashboards')}>
                Create Dashboards
              </a>
              <div className='create-dashboard-circle'>{cardsData.length}</div>
            </div>
            <div className={`header-II-create-dashboard ${activeTab === 'available-templates' ? 'active' : ''}`}>
              <a href="#" className='create-dashboard-links' onClick={() => handleTabClick('available-templates')}>
                Available Templates
              </a>
              <div className='create-dashboard-circle'>{cardsDataI.length}</div>
            </div>
            <div className={`header-III-create-dashboard ${activeTab === 'datasets' ? 'active' : ''}`}>
              <a href="#" className='create-dashboard-links' onClick={() => handleTabClick('datasets')}>
                Datasets
              </a>
              <div className='create-dashboard-circle'>{datasets.length}</div>
            </div>
          </div>
          <div>
            <img src={Hline} alt="logo" />
          </div>
          {/* Create Dashboard */}
          {activeTab === 'create-dashboards' && (
            <div className="main-container-create-dashboard-card-component">
              {cardsData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((card, index) => (
                <CardII
                  key={index}
                  title={card.title}
                  title1={card.publishedDate}
                  title2={card.lastUpdatedDate}
                  status={card.statusUpdate}
                />
              ))}
            </div>
          )}
          {/* Available Templates */}
          {activeTab === 'available-templates' && (
            <div className='main-container-available-templates'>
              {cardsDataI.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((card, index) => (
                <CardIII
                  key={index}
                  image={card.image}
                  title={card.title}
                  id={card.id}
                />
              ))}
            </div>
          )}
          {/* Datasets */}
          {activeTab === 'datasets' && (
    <div className='main-container-datasets'>
        {datasets.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((dataset, index) => (
        <CardIV key={index} dataset={dataset} />
      ))}
    </div>
)}
          {/* Pagination controls for Create Dashboard, Available Templates, Data Sets */}
          <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>{"<"}</button>
            {visiblePages.map((pageNumber) => (
              <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={pageNumber === page ? 'active' : ''}>
                {pageNumber}
              </button>
            ))}
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>{">"}</button>
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
}
CreateDashboard.propTypes = {
  getDatasets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  response: state.response.response,
  datasets:state.dataset.datasets,
});
export default connect(mapStateToProps, { getDatasets })(CreateDashboard);

