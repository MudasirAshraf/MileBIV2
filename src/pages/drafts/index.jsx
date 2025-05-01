import React, { useState, useEffect } from "react";
import "./drafts.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Check from "../../assets/svg/check.svg";
import CardII from "../../components/card-II";
import moment from "moment";
import { Pagination } from "@mui/material";
import {
  deleteDashboard,
  getDashboards,
  getDashboardsByUserId,
} from "../../actions/dashboardActions";
import { connect } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import axiosInstance from "../../components/axios";
import { toast } from "react-toastify";

const Drafts = ({
  dashboards,
  user,
  getDashboardsByUserId,
  deleteDashboard,
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = dashboards
    ? Math.ceil(dashboards.length / itemsPerPage)
    : 0;

  useEffect(() => {
    if (user) {
      getDashboardsByUserId(
        user.id,
        user.role,
        user.organizationId,
        null,
        false,
        true
      );
    }
  }, [user, getDashboardsByUserId]);

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

  const deleteDataset = (id) => {
    deleteDashboard(id);
  };

  return (
    <div className="main-container-published">
      <div className="container-published">
        <DashboardWrapper publishedCount={dashboards?.length || 0}>
          <div className="published-header">
            <img src={Check} alt="Check Icon" />
            <p>Drafts</p>
            <div className="published-circle-div">
              {dashboards?.length || 0}
            </div>
          </div>
          <div className="main-container-create-dashboard-card-component">
            {dashboards &&
              dashboards
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
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
          {/* Pagination controls for Create Dashboard, Available Templates, Data Sets */}
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboards: state.dashboard.dashboards,
  user: state.login.user,
});

export default connect(mapStateToProps, {
  getDashboards,
  getDashboardsByUserId,
  deleteDashboard,
})(Drafts);
