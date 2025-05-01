import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import axiosInstance from "../../components/axios";
import { useSelector } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const ListWorkspace = () => {
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

  const deleteWorkspace = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/workspace/delete/${id}`
      );
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  const columns = [
    { field: "workSpaceName", headerName: "Workspace Name", width: 400 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span className={`badge ${params.value ? "bg-success" : "bg-danger"}`}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Link
            to={`/save-workspaces/${params.row.id}`}
            className="btn btn-primary btn-sm me-1"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteWorkspace(params.row.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="main-container-workspaces">
      <div className="container-workspaces">
        <DashboardWrapper>
          <div className="published-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={Book} alt="book icon" className="me-2" />
              <p className="mb-0">Workspace List</p>
            </div>
            <Link to="/save-workspaces" className="btn btn-primary">
              Add Workspace
            </Link>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="text-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  style={{ color: "#fff" }}
                  rows={workspaces}
                  columns={columns}
                  pageSize={pageSize}
                  autoHeight
                />
              </div>
            )}
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

export default ListWorkspace;
