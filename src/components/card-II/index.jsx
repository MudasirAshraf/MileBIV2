import React, { useState } from "react";
import "./card-II.scss";
import DropdownMenu from "../dropdown-menu";
import Calendar from "../../assets/svg/calendar.svg";
import Setting from "../../assets/svg/setting.svg";
import Ring from "../../assets/svg/ring.svg";
import Temp from "../../assets/png/template.png";
import Draft from "../../assets/svg/draft.svg";

const CardII = ({
  title,
  title1,
  title2,
  workSpaceName,
  dashboardId,
  onDelete,
  onWorkspaceUpdate,
  onPublish,
  isPublished,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSettingClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="card-ii">
      {/* first column */}
      <div className="first-column-cardii">
        <div className="sub-first-column">
          <img src={Temp} alt="image" className="image-dash" />
          <div className="card-ii-rows">
            {isPublished && (
              <div className="first-column-card-ii-row-i">
                <img src={Ring} alt="logo" />
                <p className="para-pub">Published</p>
              </div>
            )}
            {!isPublished && (
              <div className="first-column-card-ii-row-i-part-i">
                <img src={Draft} alt="logo" />
                <p className="para-pub">Draft</p>
              </div>
            )}
            <div
              className="first-column-card-ii-row-ii"
              onClick={handleSettingClick}
            >
              <img src={Setting} alt="logo" />
              {showDropdown && (
                <DropdownMenu
                  onWorkspaceUpdate={onWorkspaceUpdate}
                  dashboardId={dashboardId}
                  onDelete={onDelete}
                  onPublish={onPublish}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph-card-outlet">{title}</p>
        </div>
      </div>
      {/* second column */}
      <div className="second-column-card-ii">
        <div className="second-column-card-ii-data-i">
          <img src={Calendar} alt="logo" />
          <p className="para-data">
            <span className="label-pub">Published :</span>
            <span className="value-pub"> {title1}</span>
          </p>
        </div>
        <div className="second-column-card-ii-data-ii">
          <img src={Calendar} alt="logo" />
          <p className="para-data">
            <span className="label-pub">Last Updated :</span>
            <span className="value-pub"> {title2}</span>
          </p>
        </div>
        <div className="second-column-card-ii-data-ii">
          <img src={Calendar} alt="logo" />
          <p className="para-data">
            <span className="label-pub">Workspace :</span>
            <span className="value-pub"> {workSpaceName}</span>
          </p>
        </div>
      </div>
      {/* third column */}
      <div className="third-column-card-ii">
        {status === "draft" && (
          <button className="third-column-card-ii-button">
            <img src={Draft} alt="logo" />
            <p>Draft and Unpublish</p>
          </button>
        )}
        {status === "published" && (
          <div>
            <button className="third-column-card-ii-button-part-i">
              <img src={Ring} alt="logo" />
              <p>Publish</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardII;
