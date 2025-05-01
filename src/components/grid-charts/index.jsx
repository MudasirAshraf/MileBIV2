import React, { useState } from "react";
import "./grid.scss";
import Chart from "../../chart-components/chart/chart";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCog } from "@fortawesome/free-solid-svg-icons";
import Card from "../../chart-components/card";
import SimpleTable from "../../chart-components/table";
import Typography from "../../chart-components/typography";
import { useDashboardAccess } from "../../hooks/useDashboardAccess";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

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
  user,
  downloading
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [datasetLabel, setDatasetLabel] = useState(dataset.datasetLabel || "");
  const [iconUrl, setIconUrl] = useState(dataset.iconUrl || "");
  const [gridHeight, setGridHeight] = useState(dataset.gridHeight || "400");
  const [overflow, setOverflow] = useState(dataset.overflow || "auto");
  const canAccess = useDashboardAccess(user, dashboard);

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

  return (
    <>
      <div
        key={`grid-item-${index}`}
        className={`grid-item p-0 ${
          index === selectedIndex || downloading ? "selected-chart" : ""
        }`}
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
          <div
            className="grid-title"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            {iconUrl && (
              <img
                src={iconUrl}
                alt="icon"
                style={{ width: "25px", height: "25px", marginRight: "5px" }}
              />
            )}
            {datasetLabel || "Chart"}
          </div>
          {canAccess && (
            <Button
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <FontAwesomeIcon icon={faCog} />
            </Button>
          )}
        </div>
        <div className="grid-body">
          {chart ? (
            <div className="uploaded-file-container">
              {chart.chartType === "card" && chartOptions && (
                <Card option={chartOptions} gridHeight={gridHeight} />
              )}
              {chart.chartType === "table" && chartOptions && (
                <SimpleTable
                  option={chartOptions}
                  gridHeight={gridHeight}
                  overflow={overflow}
                  index={index}
                />
              )}
              {chart.chartType !== "card" &&
                chart.chartType !== "table" &&
                chart.chartType !== "typography" &&
                chartOptions && (
                  <Chart
                    option={chartOptions}
                    gridHeight={gridHeight}
                    overflow={overflow}
                  />
                )}
              {chart.chartType === "typography" && chartOptions && (
                <Typography
                  data={chartOptions}
                  gridHeight={gridHeight}
                  overflow={overflow}
                  index={index}
                  downloading= {downloading}
                />
              )}
            </div>
          ) : (
            <div className="empty-grid d-flex justify-content-center align-items-center">
              <span>No Chart Selected</span>
            </div>
          )}
        </div>
      </div>

      {/* MUI Dialog for Grid Settings */}
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Grid Settings</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Dataset Label"
              value={datasetLabel}
              onChange={(e) => setDatasetLabel(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Icon
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleIconUpload}
              />
            </Button>
            {iconUrl && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={iconUrl}
                  alt="icon preview"
                  style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                />
              </Box>
            )}
            <TextField
              fullWidth
              type="number"
              label="Grid Height (px)"
              value={gridHeight}
              onChange={(e) => setGridHeight(e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="overflow-label">Overflow</InputLabel>
              <Select
                labelId="overflow-label"
                value={overflow}
                label="Overflow"
                onChange={(e) => setOverflow(e.target.value)}
              >
                <MenuItem value="auto">Auto</MenuItem>
                <MenuItem value="hidden">Hidden</MenuItem>
                <MenuItem value="scroll">Scroll</MenuItem>
                <MenuItem value="visible">Visible</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faSave} />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, { updateDashboard })(Grid);
