import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateDashboard } from "../../actions/dashboardActions";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import SaveIcon from "@mui/icons-material/Save";

const DashboardHeader = ({ dashboard, updateDashboard }) => {
  const defaultHeader = {
    logo: null,
    title: "Title 1",
    background: "",
    headerHeight: "100",
    textColor: "#ffffff",
  };

  const [headerConfig, setHeaderConfig] = useState({
    ...(dashboard?.dashboardHeader || defaultHeader),
    isEditMode: false,
  });

  useEffect(() => {
    setHeaderConfig({
      ...(dashboard?.dashboardHeader || defaultHeader),
      isEditMode: false,
    });
  }, [dashboard?.dashboardHeader]);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderConfig((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeaderConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedDashboard = {
      ...dashboard,
      dashboardHeader: { ...headerConfig, isEditMode: false },
    };
    await updateDashboard(updatedDashboard);
    setHeaderConfig((prev) => ({ ...prev, isEditMode: false }));
  };

  const handleCancel = () => {
    // revert to the dashboard configuration from redux (or the default)
    setHeaderConfig({
      ...(dashboard?.dashboardHeader || defaultHeader),
      isEditMode: false,
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: headerConfig.background.startsWith("data:image")
          ? `url(${headerConfig.background}) center/cover`
          : headerConfig.background,
        height: `${headerConfig.headerHeight}px`,
        border: "2px solid",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        zIndex: 999,
      }}
    >
      {headerConfig.logo && !headerConfig.isEditMode && (
        <Box
          component="img"
          src={headerConfig.logo}
          alt="Logo"
          sx={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      )}

      {!headerConfig.isEditMode && headerConfig.title && (
        <Typography
          variant="h4"
          sx={{ color: headerConfig.textColor, textAlign: "center", m: 0 }}
        >
          {headerConfig.title}
        </Typography>
      )}

      <IconButton
        onClick={() =>
          setHeaderConfig((prev) => ({ ...prev, isEditMode: true }))
        }
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          border: "1px solid",
          borderRadius: "4px",
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </IconButton>

      <Dialog
        open={headerConfig.isEditMode}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Dashboard Header</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Button variant="contained" component="label">
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "logo")}
            />
          </Button>

          <TextField
            label="Title"
            name="title"
            value={headerConfig.title}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" component="label">
            Upload Background
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "background")}
            />
          </Button>
          <TextField
            label="Background Color"
            type="color"
            name="background"
            value={headerConfig.background}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Text Color"
            type="color"
            name="textColor"
            value={headerConfig.textColor}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Header Height"
            type="number"
            name="headerHeight"
            value={headerConfig.headerHeight}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.current,
});

export default connect(mapStateToProps, { updateDashboard })(DashboardHeader);
