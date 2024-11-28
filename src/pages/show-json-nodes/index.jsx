import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import "./show-json-nodes.scss";
import { addDataset } from "../../actions/datasetActions";
import { useNavigate } from "react-router-dom";

const ShowJsonNodes = ({ json, addDataset,selectedDatabase }) => {
  const [selectedNodePath, setSelectedNodePath] = useState(null);
  const [normalizedData, setNormalizedData] = useState(null);
  const [datasetName, setDatasetName] = useState(""); // State for dataset name
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [selectedPrimaryKey, setSelectedPrimaryKey] = useState(""); // State for selected primary key column
  const [showPrimaryKeyModal, setShowPrimaryKeyModal] = useState(false); // Show modal for selecting primary key
  const navigate = useNavigate();

  useEffect(() => {
    if (json && selectedNodePath) {
      const selectedNodeData = getNodeData(selectedNodePath, json);
      if (selectedNodeData) {
        let flattenedData;
        if (
          typeof selectedNodeData === "object" &&
          !Array.isArray(selectedNodeData)
        ) {
          flattenedData = [flattenJSON(selectedNodeData)];
        } else if (Array.isArray(selectedNodeData)) {
          flattenedData = flattenJSONArray(selectedNodeData);
        } else {
          setNormalizedData(null);
          console.error("Unsupported data type for flattening");
        }

        if (flattenedData) {
          const normalized = normalizeFlattenedData(flattenedData);
          setNormalizedData(normalized); // Store normalized data in state
        }
      }
    }
  }, [json, selectedNodePath]); // Trigger this effect whenever json or selectedNodePath changes

  const getNodeData = (path, data) => {
    if (!path || !data) return null;
    return path.split(".").reduce((obj, key) => {
      if (!obj) return null;
      if (key.endsWith("]")) {
        // Handle array indexing, e.g., key[0]
        const [arrayKey, index] = key.split(/\[|\]/).filter(Boolean);
        return obj[arrayKey] ? obj[arrayKey][+index] : null;
      }
      return obj[key];
    }, data);
  };

  const renderSchema = (node, path = "") => {
    if (typeof node === "object" && node !== null) {
      return (
        <ul>
          {Object.keys(node).map((key) => {
            const value = node[key];
            const isArray = Array.isArray(value);
            const isObject = typeof value === "object" && !isArray;
            const currentPath = `${path}${key}`;

            // Check if this node is selected
            const isSelected = currentPath === selectedNodePath;

            return (
              <li
                key={key}
                style={{
                  backgroundColor: isSelected ? "lightblue" : "transparent",
                }}
              >
                <span
                  onClick={() => setSelectedNodePath(currentPath)}
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  {key}{" "}
                  {isArray ? "[Array]" : isObject ? "{Object}" : "(Value)"}
                </span>
                {isObject && renderSchema(value, `${currentPath}.`)}
                {isArray && value.length > 0 && (
                  <ul>
                    <li>
                      <span style={{ color: "green" }}>First Element:</span>
                      {typeof value[0] === "object" ? (
                        renderSchema(value[0], `${currentPath}[0].`)
                      ) : (
                        <span style={{ color: "gray" }}>
                          {JSON.stringify(value[0])}
                        </span>
                      )}
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  };

  const flattenJSON = (data, parentKey = "", result = {}) => {
    if (typeof data !== "object" || data === null) return result;

    Object.keys(data).forEach((key) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          flattenJSON(item, `${currentKey}[${index}]`, result);
        });
      } else if (typeof data[key] === "object" && data[key] !== null) {
        flattenJSON(data[key], currentKey, result);
      } else {
        result[currentKey] = data[key];
      }
    });
    return result;
  };

  const flattenJSONArray = (array) => {
    if (!Array.isArray(array)) throw new Error("Expected an array");
    return array.map((item) => flattenJSON(item));
  };

  const normalizeFlattenedData = (flattenedArray) => {
    const allKeys = new Set();
    flattenedArray.forEach((item) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });

    return flattenedArray.map((item) => {
      const normalizedItem = {};
      allKeys.forEach((key) => {
        normalizedItem[key] = item.hasOwnProperty(key) ? item[key] : null;
      });
      return normalizedItem;
    });
  };

  const handleDatasetNameChange = (e) => {
    setDatasetName(e.target.value);
    setErrorMessage(""); // Reset error message on user input
  };

  const handlePrimaryKeyChange = (e) => {
    setSelectedPrimaryKey(e.target.value); // Set selected primary key
  };

  const handleSaveDataset = async () => {
    if (!datasetName) {
      setErrorMessage("Dataset name is required.");
      return;
    }
    if (!selectedPrimaryKey) {
      setErrorMessage("Primary key column is required.");
      return;
    }

    const requestPayload = {
      datasetTitle: datasetName,
      primaryKeyColumn: selectedPrimaryKey,
      DataSourceData: normalizedData,
      password: "password",
      userName: "userName",
      databaseType: selectedDatabase,
      connectionString: "connectionString",
    };

    await addDataset(requestPayload);
    navigate("/create-dataset-IV");
  };

  return (
    <div>
      <h3>JSON Schema Viewer</h3>
      {json ? renderSchema(json) : <p>Loading JSON data...</p>}

      {normalizedData && (
        <div className="row my-5 d-flex justify-content-center">
          <div className="col-md-6 text-center">
            <TextField
              label="Enter name of data set"
              variant="outlined"
              className="form-control"
              value={datasetName}
              onChange={handleDatasetNameChange}
              fullWidth
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            { datasetName && datasetName.length > 0 &&
              <Button
                variant="contained"
                color="primary"
                className="mt-3"
                onClick={() => setShowPrimaryKeyModal(true)} // Open the primary key selection modal
              >
                Save and Next
              </Button>
            }

            {/* MUI Modal for primary key selection */}
            <Dialog
              open={showPrimaryKeyModal}
              onClose={() => setShowPrimaryKeyModal(false)}
            >
              <DialogTitle>Select Primary Key</DialogTitle>
              <DialogContent>
                <TextField
                  select
                  label="Select Primary Key"
                  value={selectedPrimaryKey}
                  onChange={handlePrimaryKeyChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(normalizedData[0] || {}).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setShowPrimaryKeyModal(false)}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveDataset} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  json: state.dataset.json,
  selectedDatabase: state.dataSource.selectedDatabase
});

export default connect(mapStateToProps, {
  addDataset,
})(ShowJsonNodes);
