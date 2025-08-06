import React, { useEffect, useState } from "react";
import "./workspace-dashboard.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import EDIT from "../../assets/svg/editpen.svg";
import SmallArrow from "../../assets/svg/rightwhite.svg";
import Hline from "../../assets/svg/headerline.svg";
import CardII from "../../components/card-II";
import CardIV from "../../components/card-IV";
import Filter from "../../assets/svg/Filter.svg";
import { connect } from "react-redux";
import { Pagination } from "@mui/material";
import {
  deleteDashboard,
  getDashboards,
  getDashboardsByUserId,
} from "../../actions/dashboardActions";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getDatasetsByUserId } from "../../actions/datasetActions";
import axiosInstance from "../../components/axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { toast } from "react-toastify";

const WorkspaceDashboard = ({
  dashboards,
  user,
  getDashboardsByUserId,
  deleteDashboard,
  getDatasetsByUserId,
  datasets,
}) => {
  const [activeTab, setActiveTab] = useState("dashboards");
  const [showFilters, setShowFilters] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [workSpace, setWorkspace] = useState({});
  const id = useParams().id;

  const [dashboardPage, setDashboardPage] = useState(1);
  const [datasetPage, setDatasetPage] = useState(1);
  const itemsPerPage = 8;

  const totalDashboardPages = dashboards
    ? Math.ceil(dashboards.length / itemsPerPage)
    : 0;

  const totalDatasetPages = datasets
    ? Math.ceil(datasets.length / itemsPerPage)
    : 0;

  const handleDashboardPageChange = (event, value) => {
    setDashboardPage(value);
  };

  const handleDatasetPageChange = (event, value) => {
    setDatasetPage(value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handlePublishCheckboxChange = () => {
    setShowPublished(!showPublished);
  };

  const handleDraftsCheckboxChange = () => {
    setShowDrafts(!showDrafts);
  };

  const callDashboards = () => {
    getDashboardsByUserId(
      user.id,
      user.role,
      user.organizationId,
      id,
      showPublished,
      showDrafts
    );

    getDatasetsByUserId(
      user.id,
      user.role,
      user.organizationId,
      id,
      showPublished,
      showDrafts
    );

    fetchWorkspaceById(id);
  };

  const fetchWorkspaceById = async (id) => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    const response = await axiosInstance.get(`/workspace/get/${id}`);
    setWorkspace(response?.data?.data || {});
  };

  const updateWorkSpace = async (dashboardId, workspaceId, workSpaceName) => {
    try {
      axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");

      const response = await axiosInstance.put(
        `/Dashboard/updateworkspace/${dashboardId}/${workspaceId}/${workSpaceName}`
      );

      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        getDashboardsByUserId(user.id, user.role, user.organizationId);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      // setLoading(false);
    }
  };

  const publishDashboard = (id) => {
    axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
    axiosInstance
      .put(`/Dashboard/publish/${id}`)
      .then((response) => {
        if (response.data.messageType === 1) {
          toast.success(response.data.message);
          getDashboardsByUserId(user.id, user.role, user.organizationId);
        } else {
          toast.warn(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  };

  const deleteDataset = (id) => {
    deleteDashboard(id);
  };

  useEffect(() => {
    if (user) {
      callDashboards();
    }
  }, [user, getDashboardsByUserId, showPublished, showDrafts]);

  return (
    <div className="main-container-workspace-dashboard">
      <div className="container-workspace-dashboard">
        <DashboardWrapper>
          <div className="header-container-workspace-dashboard">
            <div className="first-row-header">
              <img src={Book} alt="logo" />
              <p>Workspaces</p>
            </div>
            <div className="second-row-header">
              <img src={SmallArrow} alt="logo" />
            </div>
            <div className="third-row-header">
              <p>{workSpace.workSpaceName}</p>
              <img src={EDIT} alt="logo" />
            </div>
          </div>

          <div className="second-header-links">
            <div
              className={`first-link-workspace-dashboard ${
                activeTab === "dashboards" ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="link-workspace-dashboard"
                onClick={() => handleTabClick("dashboards")}
              >
                Dashboards
              </a>
              <div className="alert-circle-workspace-dashboard">
                {dashboards?.length}
              </div>
            </div>
            <div
              className={`second-link-workspace-dashboard ${
                activeTab === "datasets" ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="link-workspace-dashboard"
                onClick={() => handleTabClick("datasets")}
              >
                Datasets
              </a>
              <div className="alert-circle-workspace-dashboard">
                {datasets?.length}
              </div>
            </div>
          </div>

          <div>
            <img src={Hline} alt="logo" />
          </div>

          {activeTab === "dashboards" && (
            <div>
              <div className="main-container-filter-data">
                <div className="filter-data-div" onClick={handleFilterClick}>
                  <p className="para-filter">Filter by</p>
                  <img src={Filter} alt="logo" />
                </div>
                {showFilters && (
                  <div className="filter-options">
                    <label>
                      <input
                        type="checkbox"
                        name="publish"
                        checked={showPublished}
                        onChange={handlePublishCheckboxChange}
                      />
                      Publish
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="drafts"
                        checked={showDrafts}
                        onChange={handleDraftsCheckboxChange}
                      />
                      Drafts
                    </label>
                  </div>
                )}
              </div>

              <div className="main-container-create-dashboard-card-component">
                {dashboards &&
                  dashboards
                    .slice(
                      (dashboardPage - 1) * itemsPerPage,
                      dashboardPage * itemsPerPage
                    )
                    .map((card, index) => (
                      <CardII
                        onWorkspaceUpdate={updateWorkSpace}
                        onDelete={deleteDataset}
                        onPublish={publishDashboard}
                        key={index}
                        title={card.dashboardTitle}
                        title1={moment(card.modifiedDate).format("DD-MM-YYYY")}
                        title2={moment(card.modifiedDate).format("DD-MM-YYYY")}
                        isPublished={card.isPublished}
                        workSpaceName={card.workSpaceName}
                        dashboardId={card.dashboardId}
                        // status={card.statusUpdate}
                      />
                    ))}
              </div>

              <div className="pagination">
                <Pagination
                  count={totalDashboardPages}
                  page={dashboardPage}
                  onChange={handleDashboardPageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </div>
          )}

          {activeTab === "datasets" && (
            <div>
              <div className="main-container-datasets">
                {datasets
                  .slice(
                    (datasetPage - 1) * itemsPerPage,
                    datasetPage * itemsPerPage
                  )
                  .map((card, index) => (
                    <CardIV
                      key={index}
                      dataset={card}
                      title={card.datasetTitle}
                    />
                  ))}
              </div>
              <div className="pagination">
                <Pagination
                  count={totalDatasetPages}
                  page={datasetPage}
                  onChange={handleDatasetPageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            </div>
          )}
        </DashboardWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboard.dashboards,
  user: state.login.user,
  datasets: state.dataset.datasets,
});

export default connect(mapStateToProps, {
  getDashboards,
  getDashboardsByUserId,
  deleteDashboard,
  getDatasetsByUserId,
})(WorkspaceDashboard);
