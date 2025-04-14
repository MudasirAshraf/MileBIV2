import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardWrapper from "../../components/dashboard-wrapper";
import Book from "../../assets/svg/book.svg";
import axiosInstance from "../../components/axios";
import { connect, useSelector } from "react-redux";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const SetUserPermissions = ({ dashboard }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { dashboardId } = useParams();
  const user = useSelector((state) => state.login.user);
  const pageSize = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch active users from the admin API.
        axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
        const response = await axiosInstance.get(
          `/user/getactiveusers/${user.organizationId}?page=${page}&size=${pageSize}`
        );

        const usersData = response?.data?.data || [];
        setTotalPages(response?.data?.totalPages || 1);

        // Fetch dashboard permissions.
        axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
        const permissionRes = await axiosInstance.get(
          `/DashboardPermission/getallbydashboardid/${dashboardId}`
        );

        // Attach permission to each user based on matching user id.
        let updatedUsers = usersData;
        if (permissionRes?.data?.data) {
          const permissions = permissionRes.data.data;
          updatedUsers = usersData.map((user) => {
            const perm = permissions.find((p) => p.userId === user.id);
            return perm ? { ...user, dashpermission: perm } : user;
          });
        }

        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, user.organizationId]);

  const updateUserPermission = async (id, permission) => {
    try {
      let userPresent = users.find((u) => u.id === id);
      if (userPresent?.dashpermission) {
        const existingPermission = userPresent.dashpermission;
        if (existingPermission) {
          existingPermission.permission = permission;

          const response = await axiosInstance.put(
            `/DashboardPermission`,
            existingPermission
          );

          if (response.data.messageType === 1) {
            toast.success(response.data.message);
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === id
                  ? { ...user, dashpermission: { ...existingPermission } }
                  : user
              )
            );
          } else {
            toast.warn(response.data.message);
          }
        } else {
          const newDashPermission = {
            dashboardId: dashboardId,
            userId: id,
            permission: permission,
          };

          const response = await axiosInstance.post(
            `/DashboardPermission`,
            newDashPermission
          );

          if (response.data.messageType === 1) {
            toast.success(response.data.message);
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === id
                  ? { ...user, dashpermission: { ...response?.data?.data } }
                  : user
              )
            );
          } else {
            toast.warn(response.data.message);
          }
        }
      } else {
        const newDashPermission = {
          dashboardId: dashboardId,
          userId: id,
          permission: permission,
        };

        const response = await axiosInstance.post(
          `/DashboardPermission`,
          newDashPermission
        );

        if (response.data.messageType === 1) {
          toast.success(response.data.message);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id
                ? { ...user, dashpermission: { ...response?.data?.data } }
                : user
            )
          );
        } else {
          toast.warn(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error updating user permission:", error);
      toast.error("Error updating user permission");
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
      headerName: "Current Permission",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <select
          disabled={true}
          value={params.row?.permission || "none"}
          onChange={(e) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === params.row.id
                  ? { ...user, permission: e.target.value }
                  : user
              )
            );
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
    {
      field: "setpermission",
      headerName: "Set Dashboard Permission",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <select
          value={params.row?.dashpermission?.permission || "none"}
          onChange={(e) => {
            updateUserPermission(params.row.id, e.target.value);
          }}
          style={{
            padding: "4px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value={0}>Select</option>
          {[1, 2, 0].includes(params.row.permission) && (
            <option value={1}>View</option>
          )}
          {[2].includes(params.row.permission) && (
            <option value={2}>Editor</option>
          )}
        </select>
      ),
    },
  ];
  return (
    <div className="main-container-workspaces" style={{ color: "white" }}>
      <div className="container-workspaces">
        <DashboardWrapper>
          <div className="published-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={Book} alt="" className="me-2" />
              <p className="mb-0">Set Dashboard Permissions</p>
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
                  rows={users}
                  columns={columns}
                  getRowId={(row) => row.id}
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
  dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, {})(SetUserPermissions);
