import React, { useState } from "react";
import "./grid.scss";
import Chart from "../../chart-components/chart/chart";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Card from "../../chart-components/card";
import SimpleTable from "../../chart-components/table";

const Grid = ({
  rows,
  cols,
  chart,
  colWidth,
  index,
  dataset,
  dashboard,
  chartOptions,
  onSelect,
  selectedIndex,
  updateDashboard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [datasetLabel, setDatasetLabel] = useState(dataset.datasetLabel || "");
  const [iconUrl, setIconUrl] = useState(dataset.iconUrl || ""); // Load initial icon URL

  const handleToggleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setDatasetLabel(event.target.value);
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setIconUrl(base64String); // Update iconUrl state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    const updatedDashboard = {
      ...dashboard,
      datasetsTree: dashboard.datasetsTree.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            datasetLabel: datasetLabel,
            iconUrl: iconUrl, // Save icon URL to dataset
          };
        }
        return item;
      }),
    };
    await updateDashboard(updatedDashboard); // Save changes to Redux
  };

  const renderGrid = () => (
    <div
      key={`grid-item-${index}`}
      className={`grid-item p-0 m-0 mb-2 ${index === selectedIndex ? "selected-chart" : ""
        }`}
      style={{
        flex: `0 0 ${colWidth}`,
        maxWidth: colWidth,
        height: "auto",
        minHeight: "400px",
      }}
      onClick={() => onSelect(index)}
    >
      <div
        className="grid-header"
        style={{
          background: "#1c9ca7",
          textAlign: "center",
          fontSize: "20px",
          padding: "5px",
        }}
      >
        {!isEditing ? (
          <div
            className="grid-title"
            onClick={handleToggleEdit}
            style={{ cursor: "pointer" }}
          >
            <span>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt="icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginBottom: "5px",
                    marginRight: "5px",
                    verticalAlign: "middle"
                  }}
                />
              )}
              {datasetLabel || "Chart"}
            </span>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={datasetLabel}
              onChange={handleInputChange}
              style={{
                fontSize: "23px",
                textAlign: "center",
                padding: "5px",
                width: "90%",
                marginBottom: "10px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleIconUpload}
              style={{ marginTop: "5px", marginBottom: "10px", marginLeft: "30px" }}
            />
            <button
              onClick={handleSave}
              style={{
                padding: "5px 10px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon size="1x" icon={faSave} />
            </button>
          </>
        )}
      </div>
      <div className="grid-body">
        {chart ? (
          <div className="uploaded-file-container">
            {chart.chartType === 'card' && chartOptions && <Card option={chartOptions} />}
            {chart.chartType === 'table' && chartOptions && <SimpleTable option={chartOptions} />}
            {chart.chartType !== 'card' && chart.chartType !== 'table' && chartOptions && <Chart option={chartOptions} />}
          </div>
        ) : (
          <div className="empty-grid d-flex justify-content-center align-items-center">
            <span>No Chart Selected</span>
          </div>
        )}
      </div>


    </div>
  );

  return <>{renderGrid()}</>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  updateDashboard,
})(Grid);
