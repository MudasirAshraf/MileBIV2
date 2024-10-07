import React, { useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import "./transformation-steps.scss";
import { updateDataset } from "../../actions/datasetActions";
import { connect } from "react-redux";


const TransformationSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(null); 
  const [editValue, setEditValue] = useState(""); 
  const [transformationSteps, setTransformationSteps] = useState(location.state?.steps || []);
  const [dataset, setDataset] = useState(location.state?.dataset || {});

  
  const handleSave = (uuid) => {
    const updatedSteps = transformationSteps.map((step) =>
      step.uuid === uuid ? { ...step, column: editValue } : step
    );
    setTransformationSteps(updatedSteps);
    setIsEditing(null);

    // Update dataset with the new transformation steps
    const updatedDataset = { ...dataset, transformationSteps: updatedSteps };
    setDataset(updatedDataset); 
    updateDataset(updatedDataset); 
    console.log("majid data: ",updatedDataset)
    console.log('Updated transformation steps:', updatedSteps);
  };
  
  const handleDelete = (uuid) => {
    const updatedSteps = transformationSteps.filter((step) => step.uuid !== uuid);
    setTransformationSteps(updatedSteps);

    // Update dataset with the new transformation steps after deletion
    const updatedDataset = { ...dataset, transformationSteps: updatedSteps };
    setDataset(updatedDataset); 
    updateDataset(updatedDataset); 
    // console.log(updatedDataset)
    console.log('Updated transformation steps after delete:', updatedSteps);
  };
  
  // Function to handle editing 
  const handleEdit = (uuid, currentValue) => {
    setIsEditing(uuid); 
    setEditValue(currentValue); 
  };

  // Define columns for the DataGrid
  const columns = [
    {
      field: "column",
      headerName: "Column",
      width: 200,
      renderCell: (params) =>
        isEditing === params.row.uuid ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave(params.row.uuid)} 
            autoFocus
          />
        ) : (
          params.value
        ),
    },
    { field: "type", headerName: "Type", width: 150 },
    { field: "expression", headerName: "Expression", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          {isEditing === params.row.uuid ? (
            <button className="tranform-button-save" onClick={() => handleSave(params.row.uuid)}>Save</button>
          ) : (
            <button className="tranform-button-edit" onClick={() => handleEdit(params.row.uuid, params.row.column)}>Edit</button>
          )}
          <button className="tranform-button" onClick={() => handleDelete(params.row.uuid)}>Delete</button>
        </>
      ),
    },
  ];

  // Map transformationSteps to rows for the DataGrid
  const rows = transformationSteps.map((step) => ({
    id: step.uuid,
    column: step.column,
    type: step.type,
    expression: step.expression,
    uuid: step.uuid,
  }));

  return (
    <div className="data-set-table-container">
      <h2>Transformation Steps</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

const mapDispatchToProps = {
    updateDataset,
  };
  export default connect(null, mapDispatchToProps)(TransformationSteps);


