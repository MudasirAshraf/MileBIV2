import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import axiosInstance from "../../components/axios";
import { connect, useSelector } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const AccountSettingsPermission = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // backend pages start at 1
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.login.user);
  const pageSize = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
        const response = await axiosInstance.get(
          `/user/getactiveusers/${user.organizationId}?page=${page}&size=${pageSize}`
        );
        setUsers(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, user.organizationId]);

  const deleteUser = async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/deleteuser/${id}`);
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  const updateUserPermission = async (id, permission) => {
    try {
      const response = await axiosInstance.put(
        `/user/updatepermission/${id}/${permission}`
      );
      if (response.data.messageType === 1) {
        toast.success(response.data.message);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, permission } : user
          )
        );
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      width: 120,
      renderCell: (params) => (
        <span className={`badge ${params.value ? "bg-success" : "bg-danger"}`}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "permission",
      headerName: "Permission",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <select
          value={params.row.permission || "none"}
          onChange={(e) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === params.row.id
                  ? { ...user, permission: e.target.value }
                  : user
              )
            );
            updateUserPermission(params.row.id, e.target.value);
          }}
          style={{
            padding: "4px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value={1}>View</option>
          <option value={2}>Editor</option>
        </select>
      ),
    },
  ];

  // DataGrid uses 0-indexed pagination so subtract 1 for the page prop
  return (
    <div className="main-container-workspaces" style={{ color: "white" }}>
      <div className="container-workspaces">
        <DashboardWrapper>
          <div className="published-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={Book} alt="" className="me-2" />
              <p className="mb-0">User Permission</p>
            </div>
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
              <div style={{ width: "100%", color: "#fff" }}>
                <DataGrid
                  style={{ color: "#fff" }}
                  rows={users}
                  rowCount={users.length}
                  columns={columns}
                  pageSize={pageSize}
                />
              </div>
            )}
          </div>
        </DashboardWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {})(AccountSettingsPermission);
