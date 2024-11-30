import React, { useState } from "react";
import "./dataset-II.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Back from "../../assets/svg/Back.svg";
import Cross from "../../assets/svg/cross.svg";
import DII from "../../assets/svg/D2.svg";
import Polygon from "../../assets/svg/Polygon 3.svg";
import Two from "../../assets/png/2.png";
import Line from "../../assets/svg/line.svg";
import Ring from "../../assets/svg/ringround.svg";
import { connect } from "react-redux";
import axios from "axios";
import { setConnectingDetailPayload } from "../../actions/dataSourceActions";
import { getDataDefinition, getJSONData } from "../../actions/datasetActions";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

const DatasetII = ({
  setData,
  getDataDefinition,
  selectedDatabase,
  getJSONData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [authType, setAuthType] = useState(null);

  const { databaseType } = location.state || {};

  const handleDatasetI = () => {
    navigate("/create-dataset-I");
  };

  const [formData, setFormData] = useState({
    serverName: "",
    userName: "",
    password: "",
  });

  let handleNameChange = async (event) => {
    let fieldValue = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      return { ...currData, [fieldValue]: newValue };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        connectionString: formData.serverName,
        userName: formData.userName,
        password: formData.password,
        selectedDataSource: databaseType,
      };

      // setData(response.data);
      const success = await getDataDefinition(payload);
      if (success.success) {
        dispatch(setConnectingDetailPayload(payload));
        navigate("/create-dataset-III", { state: { payload } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(formData);
  };

  let handleJsonLink = async (event) => {
    event.preventDefault();
    console.log(formData);
    const result = await getJSONData(formData);
    if (result.success) {
      navigate("/show-json-nodes");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    const payload = {
      connectionString: "excelfile",
      userName: "",
      password: "",
      selectedDataSource: selectedDatabase,
      file: file,
    };

    if (file) {
      // Dispatch the action to upload the file
      await getDataDefinition(payload);
      navigate("/create-dataset-III", { state: null });
      dispatch(setConnectingDetailPayload(payload));
    }
  };

  return (
    <div className="main-container-dataset-II">
      <div className="header-dataset-II">
        <div>
          <img
            src={Back}
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={handleDatasetI}
          />
        </div>
        <div>
          <img src={Cross} alt="logo" />
        </div>
      </div>
      <div className="container-dataset-II">
        <div className="first-row-dataset-II">
          <p>Create a Dataset</p>
          <img src={DII} alt="logo" />
          <div className="second-row-dataset-II">
            <img src={Polygon} alt="logo" />
          </div>
          <div className="ring-dataset-II">
            <img src={Ring} alt="logo" />
          </div>
        </div>
        <div className="third-row-dataset-II">
          <img src={Two} alt="logo" />
        </div>
        <div>
          {selectedDatabase == "excel" ? (
            <div className="excel-upload-container">
              <label htmlFor="excelUpload" className="excel-upload-label">
                Upload Excel File:
              </label>
              <input
                type="file"
                id="excelUpload"
                name="excelUpload"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="excel-upload-input"
              />
            </div>
          ) : selectedDatabase == "json" ? (
            <div className="container mt-4 excel-upload-container">
              <h4 className="mb-3">JSON Configuration</h4>
              <Row className="justify-content-center">
                <div className="col-md-8 p-4">
                  {/* Authentication Mode Selector */}
                  <div className="mb-4">
                    <label htmlFor="authType" className="form-label">
                      Select Authentication Mode
                    </label>
                    <select
                      id="authType"
                      value={authType}
                      onChange={(e) => setAuthType(e.target.value)}
                      className="form-select"
                    >
                      <option value="Basic" className="text-center">
                        Basic
                      </option>
                      <option value="Bearer" className="text-center">
                        Bearer
                      </option>
                      {/* <MenuItem value="Basic">Basic</MenuItem>
                          <MenuItem value="Bearer">Bearer</MenuItem> */}
                    </select>
                  </div>

                  <form
                    className="p-4 border rounded bg-light shadow-sm"
                    onSubmit={handleJsonLink}
                  >
                    {/* Server Field */}
                    <div className="mb-4">
                      <label htmlFor="serverName" className="form-label">
                        Server
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Server Address"
                        name="serverName"
                        id="serverName"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serverName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Conditional Rendering Based on Auth Type */}
                    {authType === "Basic" && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="userName" className="form-label">
                            Username
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Username"
                            name="userName"
                            id="userName"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                userName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            id="password"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </>
                    )}

                    {authType === "Bearer" && (
                      <div className="mb-4">
                        <label htmlFor="bearerToken" className="form-label">
                          Bearer Token
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Bearer Token"
                          name="bearerToken"
                          id="bearerToken"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary px-4">
                        Connect
                      </button>
                    </div>
                  </form>
                </div>
              </Row>
            </div>
          ) : (
            <div>
              <div className="header-dashboard-modals">
                <p>Enter Credentials</p>
                <img src={Line} alt="logo" />
              </div>
              <form
                className="form-container-dataset-II"
                onSubmit={handleSubmit}
              >
                <div className="form-container-dataset-II-input-details">
                  <div className="input-group-sign-in-row-I-dataset-II">
                    <input
                      className="input-details-sign-in-row-I-dataset-II"
                      type="text"
                      placeholder="Server"
                      name="serverName"
                      id="serverName"
                      value={formData.serverName}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="input-group-sign-in-row-I-dataset-II">
                    <input
                      className="input-details-sign-in-row-I-dataset-II"
                      type="text"
                      placeholder="Username"
                      name="userName"
                      id="userName"
                      value={formData.userName}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="input-group-sign-in-row-I-dataset-II">
                    <input
                      className="input-details-sign-in-row-I-dataset-II"
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                </div>
                <div className="button-dataset-II">
                  <button type="submit">Connect</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDatabase: state.dataSource.selectedDatabase,
});
export default connect(mapStateToProps, {
  getDataDefinition,
  getJSONData,
})(DatasetII);
