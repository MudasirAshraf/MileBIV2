import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getSpecificDataset,
  updateDataset,
  appendTransformation,
  // gettableData,
  setSingleTableData,
  setSpecificDataset,
  getSingleTableData,
} from "../../actions/datasetActions";
import { evaluate, row } from "mathjs";
import { DataGrid } from "@mui/x-data-grid";
import "./dataset-view.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch, connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setDatabaseDataPayload } from "../../actions/dataSourceActions";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  
  MenuItem,
  Modal,
} from "@mui/material";

export const evaluateExpression = (data, expression) => {
  try {
    const context = { ...data };
    const result = evaluate(expression, context);
    return typeof result === "object" ? JSON.stringify(result) : result;
  } catch (error) {
    return "";
  }
};

const DatasetView = ({
  updateDataset,
  dataset,
  tableData,
  getSpecificDataset,
  appendTransformation,
  getSingleTableData,
  setSingleTableData,
  setSpecificDataset,
  setDatabaseDataPayload,
  dataSource,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const datasetId = searchParams.get("id");
  const [dataSetFlag, setDataSetFlag] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("Regular");
  const [newColumnExpression, setNewColumnExpression] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  // Main useEffect to fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let updatedDataset;
    const value = await getSpecificDataset(datasetId);
    if (value) {
      await setSpecificDataset(value);
    }
    if (!["excel", "json"].includes(dataset.databaseType)) {
      const value = await getSingleTableData(dataSource.tableName, dataSource);
      if (value) {
        await setSingleTableData(value);
        if (tableData && tableData.Table) {
          if (dataset && dataset.transformationSteps) {
            dataset.transformationSteps.forEach((step) => {
              if (step.column) {
                tableData.Table.forEach((row) => {
                  const primaryKey = dataset.primaryKeyColumn;
                  const currentRowPrimaryKey = row[primaryKey];
                  const value = dataset.dataSourceData.find(
                    (d) => d[primaryKey] === currentRowPrimaryKey
                  );
                  if (step.stepType == "Add") {
                    row[step.column] = value ? value[step.column] : null;
                  } else if (step.stepType == "Rename") {
                    row[step.column] = value ? value[step.column] : null;
                    delete row[step.baseColumn];
                  }
                });
              }
            });
          }

          updatedDataset = {
            ...dataset,
            dataSourceData: tableData.Table,
          };
          await updateDataset(updatedDataset);
        }
      }
    } else {
      if (dataset.transformationSteps) {
        dataset.transformationSteps.forEach((step) => {
          if (step.column) {
            dataset.dataSourceData.forEach((row) => {
              if (step.stepType == "Add") {
                row[step.column] = row ? row[step.column] : null;
              } else if (step.stepType == "Rename") {
                row[step.column] = row ? row[step.column] : null;
                delete row[step.baseColumn];
              }
            });
          }
        });

        updatedDataset = {
          ...dataset,
          dataSourceData: dataset.dataSourceData,
        };
        await updateDataset(updatedDataset);
      }
    }
    // checking for missing transformation steps
    if (updatedDataset?.dataSourceData && updatedDataset?.transformationSteps) {
      const columns = Object.keys(updatedDataset.dataSourceData[0]);
      const missingColumns = updatedDataset.transformationSteps
        .filter((step) => !columns.includes(step.column))
        .map((step) => step.column);

      if (missingColumns.length > 0) {
        toast.error(
          `Some of the transformation steps are missing from the dataset: ${missingColumns.join(
            ", "
          )}`
        );
        return;
      }
    }
  };

  const handleAddClick = () => {
    setIsAddingColumn(true);
    setIsEditingColumn(false);
  };

  const handleRenameClick = () => {
    setIsEditingColumn(true);
    setIsAddingColumn(false);
  };

  const handleCancelClick = () => {
    setIsAddingColumn(false);
    setNewColumnTitle("");
    setNewColumnType("Regular");
    setNewColumnExpression("");
    setSelectedColumn("");
    setIsAddingColumn(false);
    setIsEditingColumn(false);
  };

  const handleSaveColumn = async () => {
    const newColumn = {
      title: newColumnTitle,
      type: newColumnType || "Regular",
      expression: newColumnExpression,
    };

    if (
      !newColumnTitle ||
      !newColumnType ||
      (newColumnType == "Expression" && !newColumnExpression)
    ) {
      toast.error("Please fill all the columns");
      return;
    }

    const exists = columns.find(
      (f) =>
        f.field.toLocaleLowerCase().trim() ==
        newColumn.title.toLocaleLowerCase().trim()
    );

    if (exists) {
      toast.error("Column with name already exists");
      return;
    }

    try {
      // Update transformation steps first
      const updatedTransformationSteps = [];
      updatedTransformationSteps.push({
        column: newColumn.title,
        type: newColumnType,
        stepType: "Add",
        expression: newColumn.type === "Expression" ? newColumnExpression : "",
        uuid: uuidv4(),
      });

      const steps =
        dataset.transformationSteps === null ? [] : dataset.transformationSteps;
      steps.push(updatedTransformationSteps[0]);
      dataset.transformationSteps = [...steps];
      await updateDataset(dataset);
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }
    handleCancelClick();
  };

  const handleRenameColumn = async () => {
    const newColumnAdd = {
      column: newColumnTitle,
      type: "",
      stepType: "Rename",
      existingColumnName: selectedColumn,
      expression: "",
      uuid: uuidv4(),
    };

    const exists = columns.find(
      (f) =>
        f.field.toLocaleLowerCase().trim() ==
        newColumnAdd.column.toLocaleLowerCase().trim()
    );

    if (!newColumnTitle || !selectedColumn) {
      toast.error("Please fill all the columns");
      return;
    }

    if (exists) {
      toast.error("Column with name already exists!!");
      return;
    }

    if (dataset?.transformationSteps) {
      const index = dataset.transformationSteps.findIndex((st) => {
        return st.column === selectedColumn;
      });

      if (index !== -1) {
        dataset.transformationSteps[index] = {
          ...dataset.transformationSteps[index],
          ...newColumnAdd,
        };
      } else {
        newColumnAdd.baseColumn = selectedColumn;
        dataset.transformationSteps.push(newColumnAdd);
      }
    } else {
      dataset.transformationSteps = [];
      newColumnAdd.baseColumn = selectedColumn;
      dataset.transformationSteps.push(newColumnAdd);
    }

    try {
      if (dataset && newColumnAdd) {
        dataset.dataSourceData.forEach((row) => {
          if (newColumnAdd.stepType == "Rename") {
            row[newColumnAdd.column] = row
              ? row[newColumnAdd.existingColumnName]
              : null;
            delete row[newColumnAdd.existingColumnName];
          }
        });
        // Once transformations are complete, update the dataset if necessary
        await updateDataset(dataset);
      }
    } catch (error) {
      console.error("Failed to save dataset:", error);
    }
    handleCancelClick();
  };

  const safeData = dataset?.dataSourceData || [];

  // Generating columns for DataGrid

  const columns = Object.keys(safeData[0] || {}).map((key) => {
    return {
      field: key,
      headerName: key,
      width: 150,
      editable:
        dataset.transformationSteps &&
        dataset.transformationSteps.find((col) => col.column === key)
          ? dataset.transformationSteps.find((col) => col.column === key)
              .type !== "Expression"
            ? true
            : false
          : false,
    };
  });

  // Refesh Button Functionality
  const handleRefresh = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  };


  //Updating  Data rows
  let rows = safeData.map((row, index) => ({ id: index, ...row }));
  const handleProcessRowUpdate = async (newRow, oldRow, rowIndex) => {
    const updatedRows = [...rows];
    const primaryKeyColumn = dataset.primaryKeyColumn;
    if (primaryKeyColumn) {
      rowIndex = rows.findIndex(
        (r) => r[primaryKeyColumn] == newRow[primaryKeyColumn]
      );
    }

    updatedRows[rowIndex] = { ...oldRow, ...newRow };
    rows = updatedRows;
    const updatedDataset = {
      ...dataset,
      dataSourceData: updatedRows,
    };
    await updateDataset(updatedDataset);
    // fetchData();
    return newRow;
  };

  const ShowTransformationSteps = () => {
    navigate("/transformation-steps", {
      state: { dataset: dataset },
    });
  };

  return (
    dataset && (
      <div className="main-container-dataset-view p-3">
        <div className="container-dataset-view">
          <h3 className="text-center my-3 text-white">Dataset View</h3>
          <div className="dataset-table-header p-3">
            {(isAddingColumn || isEditingColumn) && (
              <div className="add-column-inputs">
                {(isAddingColumn || isEditingColumn) && (
                  <input
                    className="inp-adding-button"
                    type="text"
                    placeholder={
                      isEditingColumn ? "Enter new name" : "Enter title"
                    }
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                  />
                )}

                {isAddingColumn && (
                  <select
                    className="form-control w-auto"
                    value={newColumnType}
                    onChange={(e) => setNewColumnType(e.target.value)}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Expression">Expression</option>
                  </select>
                )}

                {isEditingColumn && (
                  <FormControl fullWidth>
                    <InputLabel>Select Primary Key</InputLabel>
                    <Select
                      onChange={(e) => setSelectedColumn(e.target.value)}
                      defaultValue=""
                    >
                      {columns &&
                        columns
                          .filter((fc) => fc.field !== dataset.primaryKeyColumn)
                          .map((c, index) => (
                            <MenuItem key={index} value={c.field}>
                              {c.field}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                )}

                {newColumnType === "Expression" && isAddingColumn && (
                  <input
                    className="inp-adding-button form-control"
                    type="text"
                    placeholder="Enter Expression"
                    value={newColumnExpression}
                    onChange={(e) => setNewColumnExpression(e.target.value)}
                  />
                )}

                <Row className="d-flex justify-content-center mt-2 w-100">
                  {isAddingColumn && (
                    <button
                      className="btn btn-info me-2 w-auto"
                      onClick={handleSaveColumn}
                    >
                      Save
                    </button>
                  )}

                  {isEditingColumn && (
                    <button
                      className="btn btn-info me-2 w-auto"
                      onClick={handleRenameColumn}
                    >
                      Rename
                    </button>
                  )}

                  <button
                    className="btn btn-danger w-auto"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </Row>
              </div>
            )}

            <Row className="d-flex justify-content-end align-items-center mt-4">
              {!isAddingColumn && (
                <button
                  className="btn btn-primary w-auto"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
              {!isAddingColumn && (
                <button
                  className="btn ms-2 btn-success w-auto"
                  onClick={handleRenameClick}
                >
                  Rename
                </button>
              )}
              <button
                className="btn btn-info w-auto mx-2"
                onClick={ShowTransformationSteps}
              >
                Show Transformation Steps
              </button>
              <button
                className="btn btn-success w-auto"
                onClick={handleRefresh}
              >
                Refresh Data
              </button>
            </Row>
          </div>
          <div className="dataset-table-container">
            <div className="data-set-table-container">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                processRowUpdate={(newRow, oldRow) => {
                  // Find the index of the row to update
                  const rowIndex = rows.indexOf(oldRow);
                  return handleProcessRowUpdate(newRow, oldRow, rowIndex);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

DatasetView.propTypes = {
  getSpecificDataset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.response.response,
  dataset: state.dataset.current,
  tableData: state.dataset.tabledata,
  dataSource: state.dataSource.data,
});

export default connect(mapStateToProps, {
  getSpecificDataset,
  appendTransformation,
  updateDataset,
  // gettableData,
  getSingleTableData,
  setSingleTableData,
  setSpecificDataset,
  setDatabaseDataPayload,
})(DatasetView);
