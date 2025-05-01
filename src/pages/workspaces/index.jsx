import React, { useEffect, useState } from "react";
import "./workspaces.scss";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import CardV from "../../components/card-V";
import { useNavigate } from "react-router-dom";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import axiosInstance from "../../components/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const WorkSpaces = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.login.user);
  const pageSize = 5;
  
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
        const response = await axiosInstance.get(
          `/workspace/getactiveworkspaces/${user.organizationId}`
        );
        setWorkspaces(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, [user.organizationId]);


  return (
    <div className="main-container-workspaces">
      <div className="container-workspaces">
        <DashboardWrapper workspacesCount={workspaces?.length}>
          <div className="published-header text-end">
            <img src={Book} alt="" />
            <p>WorkSpaces</p>
            <div className="published-circle-div">{workspaces?.length}</div>
          </div>
          <div className="main-container-workspaces-cards">
            {workspaces &&
              workspaces.map((card) => (
                <CardV
                  key={card.id}
                  id={card.id}
                  title={card.workSpaceName}
                  date={card.date}
                  dashboard={card.workspaceId}
                  datasets={card.datasets}
                  createdDate={card.createdDate}
                  // onDelete={deleteWorkspace}
                />
              ))}
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

export default WorkSpaces;
