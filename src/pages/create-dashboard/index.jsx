import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./create-dashboard.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Hline from "../../assets/svg/headerline.svg";
import TI from "../../assets/png/T1.png";
import TII from "../../assets/png/T2.png";
import TIII from "../../assets/png/T3.png";
import CardII from "../../components/card-II";
import CardIII from "../../components/card-III";
import CardIV from "../../components/card-IV";
import { getDatasets } from "../../actions/datasetActions";
import { Row, Col } from "react-bootstrap";
import { deleteDashboard, getDashboards, getDashboardsByUserId } from "../../actions/dashboardActions";
import moment from "moment/moment";
import Pagination from "@mui/material/Pagination";
const CreateDashboard = ({
  datasets,
  getDatasets,
  getDashboards,
  dashboards,
  getDashboardsByUserId,
  user,
  deleteDashboard
}) => {
  const [activeTab, setActiveTab] = useState("create-dashboards");
  const [page, setPage] = useState(1);
  const itemsPerPage = activeTab === "datasets" ? 12 : 8;

  useEffect(() => {
    getDatasets();
    getDashboardsByUserId(user.id,user.role,user.organizationId);  
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const cardsData = [
    {
      title: "Sales Dashboard",
      publishedDate: "21-Mar-2022",
      lastUpdatedDate: "21-Mar-2022",
      statusUpdate: "published",
    },
    {
      title: "Marketing Dashboard",
      publishedDate: "22-Mar-2022",
      lastUpdatedDate: "23-Mar-2022",
      statusUpdate: "draft",
    },
  ];

  const cardsDataI = [
    { id: 1, title: "Template 1", image: TI },
    { id: 2, title: "Template 2", image: TII },
    { id: 3, title: "Template 3", image: TIII },
  ];

  const totalPages =
    activeTab === "create-dashboards"
      ? dashboards ? Math.ceil(dashboards.length / itemsPerPage) : 0
      : activeTab === "available-templates"
        ? Math.ceil(cardsDataI.length / itemsPerPage)
        : Math.ceil(datasets && datasets.length / itemsPerPage);

  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const deleteDataset = (id) => {
    deleteDashboard(id);
  }

  return (
    datasets && (
      <div className="main-container-create-dashboard">
        <div className="container-create-dashboard">
          <DashboardWrapper>
            {/* Adding header */}
            <div className="header-create-dasdhboard">
              <div
                className={`header-I-create-dashboard ${activeTab === "create-dashboards" ? "active" : ""
                  }`}
              >
                <a
                  href="#"
                  className="create-dashboard-links"
                  onClick={() => handleTabClick("create-dashboards")}
                >
                  Dashboards
                </a>
                <div className="create-dashboard-circle">
                  {cardsData.length}
                </div>
              </div>
              <div
                className={`header-II-create-dashboard ${activeTab === "available-templates" ? "active" : ""
                  }`}
              >
                <a
                  href="#"
                  className="create-dashboard-links"
                  onClick={() => handleTabClick("available-templates")}
                >
                  Available Templates
                </a>
                <div className="create-dashboard-circle">
                  {cardsDataI.length}
                </div>
              </div>
              <div
                className={`header-III-create-dashboard ${activeTab === "datasets" ? "active" : ""
                  }`}
              >
                <a
                  href="#"
                  className="create-dashboard-links"
                  onClick={() => handleTabClick("datasets")}
                >
                  Datasets
                </a>
                <div className="create-dashboard-circle">{datasets.length}</div>
              </div>
            </div>
            <div>
              <img src={Hline} alt="logo" className="w-100" />
            </div>
            {/* Create Dashboard */}
            {activeTab === "create-dashboards" && (
              <div className="main-container-create-dashboard-card-component">
                {dashboards && dashboards
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((card, index) => (
                    <CardII
                      onDelete={deleteDataset}
                      key={index}
                      title={card.dashboardTitle}
                      title1={moment(card.modifiedDate).format("DD-MM-YYYY")}
                      title2={moment(card.modifiedDate).format("DD-MM-YYYY")}
                      dashboardId={card.dashboardId}
                    // status={card.statusUpdate}
                    />
                  ))}
              </div>
            )}
            {/* Available Templates */}
            {activeTab === "available-templates" && (
              <div className="main-container-available-templates">
                {cardsDataI
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((card, index) => (
                    <CardIII
                      key={index}
                      image={card.image}
                      title={card.title}
                      id={card.dashboardId}
                    />
                  ))}
              </div>
            )}
            {/* Datasets */}
            {activeTab === "datasets" && (
              // <div className="main-container-datasets">
              <Row className="d-flex align-items-center justify-content-center mx-0">
                {datasets
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((dataset, index) => (
                    <Col xs={6} md={3} className="mt-4">
                      <CardIV key={index} dataset={dataset} />
                    </Col>
                  ))}
              </Row>
              // </div>
            )}
            {/* Pagination controls for Create Dashboard, Available Templates, Data Sets */}
            <div className="pagination">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
              {/* <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              /> */}
            </div>
          </DashboardWrapper>
        </div>
      </div>
    )
  );
};

CreateDashboard.propTypes = {
  getDatasets: PropTypes.func.isRequired,
  getDashboards: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  response: state.response.response,
  datasets: state.dataset.datasets,
  dashboards: state.dashboard.dashboards,
  user: state.login.user
});
export default connect(
  mapStateToProps,
  { getDatasets, getDashboards, getDashboardsByUserId, deleteDashboard }
)(CreateDashboard);
