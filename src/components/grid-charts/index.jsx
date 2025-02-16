import React, { useState } from "react";
import "./grid.scss";
import Chart from "../../chart-components/chart/chart";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCog } from "@fortawesome/free-solid-svg-icons";
import Card from "../../chart-components/card";
import SimpleTable from "../../chart-components/table";
import { Popover, OverlayTrigger, Button, Form } from "react-bootstrap";

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
  const [iconUrl, setIconUrl] = useState(dataset.iconUrl || "");
  const [gridHeight, setGridHeight] = useState(dataset.gridHeight || "400");
  const [overflow, setOverflow] = useState(dataset.overflow || "auto");

  const handleSave = async () => {
    setIsEditing(false);
    const updatedDashboard = {
      ...dashboard,
      datasetsTree: dashboard.datasetsTree.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            datasetLabel: datasetLabel,
            iconUrl: iconUrl,
            gridHeight: gridHeight,
            overflow: overflow,
          };
        }
        return item;
      }),
    };
    await updateDashboard(updatedDashboard);
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setIconUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const popover = (
    <Popover id={`popover-grid-settings-${index}`} style={{ maxWidth: "350px" }}>
      <Popover.Header as="h3">Grid Settings</Popover.Header>
      <Popover.Body>
        <Form>
          {/* Label Input */}
          <Form.Group className="mb-2">
            <Form.Label>Dataset Label</Form.Label>
            <Form.Control
              type="text"
              value={datasetLabel}
              onChange={(e) => setDatasetLabel(e.target.value)}
            />
          </Form.Group>

          {/* Icon Upload */}
          <Form.Group className="mb-2">
            <Form.Label>Upload Icon</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleIconUpload} />
            {iconUrl && (
              <div className="mt-2">
                <img
                  src={iconUrl}
                  alt="icon preview"
                  style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                />
              </div>
            )}
          </Form.Group>

          {/* Grid Height */}
          <Form.Group className="mb-2">
            <Form.Label>Grid Height (px)</Form.Label>
            <Form.Control
              type="number"
              value={gridHeight}
              onChange={(e) => setGridHeight(e.target.value)}
            />
          </Form.Group>

          {/* Overflow Settings */}
          <Form.Group className="mb-2">
            <Form.Label>Overflow</Form.Label>
            <Form.Select value={overflow} onChange={(e) => setOverflow(e.target.value)}>
              <option value="auto">Auto</option>
              <option value="hidden">Hidden</option>
              <option value="scroll">Scroll</option>
              <option value="visible">Visible</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleSave} className="w-100">
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <div
      key={`grid-item-${index}`}
      className={`grid-item p-0 ${index === selectedIndex ? "selected-chart" : ""}`}
      style={{
        flex: `0 0 calc(${colWidth} - 6px)`,
        maxWidth: `calc(${colWidth} - 6px)`,
        margin: "3px",
      }}
      onClick={() => onSelect(index)}
    >
      <div
        className="grid-header d-flex align-items-center justify-content-between"
        style={{
          background: "#1c9ca7",
          textAlign: "center",
          fontSize: "20px",
          padding: "5px",
        }}
      >
        <div className="grid-title" style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          {iconUrl && (
            <img
              src={iconUrl}
              alt="icon"
              style={{ width: "25px", height: "25px", marginRight: "5px" }}
            />
          )}
          {datasetLabel || "Chart"}
        </div>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
          <Button variant="light" size="sm">
            <FontAwesomeIcon icon={faCog} />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="grid-body">
        {chart ? (
          <div className="uploaded-file-container">
            {chart.chartType === "card" && chartOptions && (
              <Card option={chartOptions} gridHeight={gridHeight} />
            )}
            {chart.chartType === "table" && chartOptions && (
              <SimpleTable option={chartOptions} gridHeight={gridHeight} overflow={overflow} index={index} />
            )}
            {chart.chartType !== "card" &&
              chart.chartType !== "table" &&
              chartOptions && <Chart option={chartOptions} gridHeight={gridHeight} overflow={overflow} />}
          </div>
        ) : (
          <div className="empty-grid d-flex justify-content-center align-items-center">
            <span>No Chart Selected</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateDashboard })(Grid);
