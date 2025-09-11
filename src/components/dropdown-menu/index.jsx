import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.scss";
import EDIT from "../../assets/svg/edit.svg";
import Trash from "../../assets/svg/trash.svg";
import Arrow from "../../assets/svg/arrow.svg";
import SmallArrow from "../../assets/svg/smallarrow.svg";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axiosInstance from "../axios";
import urlswithoutgateway from "../../actions/urlswithoutgateway";
import { getWorkspaces } from "../../actions/workspaceAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
const DropdownMenu = ({
  onDelete,
  datasetId,
  dashboardId,
  onWorkspaceUpdate,
  onPublish,
  getWorkspaces,
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const user = useSelector((state) => state.login.user);
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const navigate = useNavigate();
  const handleMoveToClick = (e) => {
    e.stopPropagation();
    setShowSubmenu(!showSubmenu);
  };

  // const handleEdit = () => {
  //   navigate(`/grids/${dashboardId}`);
  // };

    const handleEdit = () => {
    navigate(`/edit/${dashboardId}`); // Edit route
  };

  const handleView = () => {
    navigate(`/grids/${dashboardId}`); // View route
  };

  const handleDelete = () => {
    onDelete(dashboardId);
  };

  const handlePublish = () => {
    onPublish(dashboardId);
  };

  const handleWorkspaceUpdate = (workspaceId, workSpaceName) => {
    onWorkspaceUpdate(dashboardId, workspaceId, workSpaceName);
    setShowSubmenu(false);
  };

  useEffect(() => {
    if (!workspaces) {
      getWorkspaces(user.organizationId);
    }
  }, []);

  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => handleEdit()}>
          <img src={EDIT} alt="Edit" /> Edit
        </li>
        <li onClick={handleView}>
             <VisibilityIcon fontSize="small" />
              View
        </li>
        <li onClick={handleDelete}>
          <img src={Trash} alt="Delete" /> Delete
        </li>
        <li onClick={handlePublish}>
          <img src={EDIT} alt="Delete" /> Publish
        </li>
        <li className="list-dropdown" onClick={handleMoveToClick}>
          <div className="menu-item">
            <img src={Arrow} alt="Move to" /> Move to
            <img src={SmallArrow} alt="Arrow" className="small-arrow" />
          </div>
          {showSubmenu && (
            <div className="submenu">
              <ul>
                {workspaces &&
                  workspaces.map((workspace) => (
                    <li
                      key={workspace.id}
                      onClick={() =>
                        handleWorkspaceUpdate(
                          workspace.id,
                          workspace.workSpaceName
                        )
                      }
                    >
                      <img src={Arrow} alt="Arrow" /> {workspace.workSpaceName}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  deleteDataset: PropTypes.func.isRequired,
  datasetId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {
  getWorkspaces,
})(DropdownMenu);
