import {
  RESPONSE,
  ADD_NEW_DATASET,
  DATASET_ERROR,
  GET_ALL_DATASETS,
  UPDATE_DATASET,
  DELETE_DATASET,
  GET_ALL_TABLES,
  GET_TABLE_DATA,
  TABLE_LOADING,
  SET_CURRENT_DATASET,
  GET_SPECIFIC_DATASETS,
  ADD_TRANSFORMATION,
  SET_REQUEST_PAYLOAD,
  GET_SINGLE_TABLE_DATA,
  RAW_JSON_DATA,
} from "./types";
import axiosInstance from "../components/axios";
import { store } from "../store";
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

//Currently windows.reload later on just update and remove in state after success message to avoid reloads
export const getDataDefinition = (dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("connector");
  const source =
    dataset.selectedDataSource.toLowerCase() === "postgre"
      ? "PostgreConnector"
      : dataset.selectedDataSource.toLowerCase() === "sqlserver"
      ? "SQLConnector"
      : dataset.selectedDataSource.toLowerCase() === "mysql"
      ? "MySqlConnector"
      : dataset.selectedDataSource.toLowerCase() === "oracle"
      ? "OracleConnector"
      : dataset.selectedDataSource.toLowerCase() === "excel"
      ? "ExcelConnector"
      : null;

  try {
    let response;
    if (dataset.selectedDataSource == "excel") {
      const formData = new FormData();
      formData.append("file", dataset.file);
      // Make the API call
      response = await axiosInstance.post(`${source}/getalltables`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      response = await axiosInstance.post(
        `${source}/getalltables`,
        JSON.stringify(dataset),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Dispatch success response
    dispatch({
      type: RESPONSE,
      regresponse: response.data,
    });
    if (response.data.messageType !== 2) {
      dispatch({
        type: GET_ALL_TABLES,
        payload: JSON.parse(response.data.data),
      });
      return { success: true };
    }
  } catch (error) {
    // Dispatch error response
    dispatch({
      type: DATASET_ERROR,
      payload: error.response?.data || "Request failed",
    });
    dispatch({
      type: RESPONSE,
      regresponse: error.response?.data || "Request failed",
    });
    dispatch({
      type: GET_ALL_TABLES,
      payload: null,
    });
    return { success: false };
  }
};

export const gettableData = (tables, dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("connector");
  dispatch({
    type: TABLE_LOADING,
  });

  const source =
    dataset.selectedDataSource.toLowerCase() === "postgre"
      ? "PostgreConnector"
      : dataset.selectedDataSource.toLowerCase() === "sqlserver"
      ? "SQLConnector"
      : dataset.selectedDataSource.toLowerCase() === "mysql"
      ? "MySqlConnector"
      : dataset.selectedDataSource.toLowerCase() === "oracle"
      ? "OracleConnector"
      : dataset.selectedDataSource.toLowerCase() === "excel"
      ? "ExcelConnector"
      : null;

  tables.map((t, id) => {
    const newDataset = {
      connectionString: dataset.connectionString,
      userName: dataset.userName,
      password: dataset.password,
      selectedDataSource: dataset.selectedDataSource,
      tableName: t,
    };

    axiosInstance
      .post(`${source}/gettabledata`, JSON.stringify(newDataset), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: RESPONSE,
          regresponse: response.data,
        });

        if (response.data.messageType !== 2) {
          dispatch({
            type: GET_TABLE_DATA,
            payload: [newDataset, JSON.parse(response.data.data)],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: DATASET_ERROR,
          payload: error.response.data,
        });
        dispatch({
          type: RESPONSE,
          regresponse: error.response.data,
        });
        dispatch({
          type: GET_TABLE_DATA,
          payload: null,
        });
      });
  });
};

export const getSingleTableData = (table, dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("connector");

  dispatch({
    type: TABLE_LOADING,
  });

  const source =
    {
      postgre: "PostgreConnector",
      sqlserver: "SQLConnector",
      mysql: "MySqlConnector",
      oracle: "OracleConnector",
      excel: "ExcelConnector",
    }[dataset.selectedDataSource.toLowerCase()] || null;

  if (!source) {
    // Dispatch an error if the selected data source is not recognized
    dispatch({
      type: DATASET_ERROR,
      payload: { error: "Invalid data source selected" },
    });
    return;
  }

  try {
    const newDataset = {
      connectionString: dataset.connectionString,
      userName: dataset.userName,
      password: dataset.password,
      selectedDataSource: dataset.selectedDataSource,
      tableName: table,
    };

    let response;

    if (dataset.selectedDataSource.toLowerCase() === "excel") {
      const formData = new FormData();
      formData.append("file", dataset.file);

      response = await axiosInstance.post(
        `${source}/getsheetdata?sheetName=${newDataset.tableName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      response = await axiosInstance.post(
        `${source}/gettabledata`,
        JSON.stringify(newDataset),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    dispatch({
      type: RESPONSE,
      regresponse: response.data,
    });

    if (response.data.messageType !== 2) {
      return response.data.data;
    }
  } catch (error) {
    const errorPayload = error.response
      ? error.response.data
      : { error: "An unknown error occurred" };
    dispatch({
      type: DATASET_ERROR,
      payload: errorPayload,
    });
    dispatch({
      type: RESPONSE,
      regresponse: errorPayload,
    });
    dispatch({
      type: GET_SINGLE_TABLE_DATA,
      payload: null,
    });
  }
};

export const getJSONData = (dataset) => async (dispatch) => {
  dispatch({
    type: TABLE_LOADING,
  });

  try {
    const { serverName, userName, password, authType } = dataset;

    let response;
    const headers = {};

    if (authType === "basic") {
      const credentials = btoa(`${userName}:${password}`);
      headers["Authorization"] = `Basic ${credentials}`;
    } else if (authType === "bearer") {
      headers["Authorization"] = `Bearer ${userName}`;
    }

    // Send API request
    response = await axiosInstance.get(`${serverName}`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    // Dispatch RAW_JSON_DATA
    dispatch({
      type: RAW_JSON_DATA,
      payload: response.data,
    });

    // Return success data
    return { success: true, data: response.data };
  } catch (error) {
    // Handle API errors
    const errorPayload = error.response
      ? error.response.data
      : { error: "An unknown error occurred" };

    // Dispatch error actions
    dispatch({
      type: DATASET_ERROR,
      payload: errorPayload,
    });

    dispatch({
      type: RESPONSE,
      regresponse: errorPayload,
    });
    dispatch({
      type: RAW_JSON_DATA,
      payload: null,
    });

    // Return error
    return { success: false, error: errorPayload };
  }
};

// addDataset
export const addDataset = (dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
  dispatch({
    type: TABLE_LOADING,
  });

  axiosInstance
    .post("Dataset", JSON.stringify(dataset), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });

      if (response.data.messageType !== 2) {
        dispatch({
          type: ADD_NEW_DATASET,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: RESPONSE,
        regresponse: error.response.data,
      });
      dispatch({
        type: DATASET_ERROR,
        payload: error.response,
      });
      dispatch({
        type: ADD_NEW_DATASET,
        payload: null,
      });
    });
  // });
};

export const getDatasets = () => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
  axiosInstance
    .get("Dataset", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: GET_ALL_DATASETS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DATASET_ERROR,
        payload: error.response,
      });
    });
};

export const getSpecificDataset = (id) => async (dispatch) => {
  try {
    // Set base URL for axios instance
    axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");

    // Wait for the API response using await
    const response = await axiosInstance.get("Dataset/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Dataset response:", response.data); // Log response

    // Dispatch the action with the response data
    dispatch({
      type: RESPONSE,
      regresponse: response.data,
    });

    // Return data if messageType is not 2
    if (response.data.messageType !== 2) {
      return response.data.data;
    }
  } catch (error) {
    // Handle any errors that occur during the request
    dispatch({
      type: DATASET_ERROR,
      payload: error.response,
    });

    // Re-throw the error so it can be handled by the calling component
    throw error;
  }
};

export const updateDataset = (dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
  axiosInstance
    .put("Dataset", JSON.stringify(dataset), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: dataset,
      });

      if (response.data.messageType !== 2) {
        dispatch({
          type: UPDATE_DATASET,
          payload: dataset,
        });
        // window.location.reload();
        //generate cookie inside local system and redirect to home page as logged in user
      }
    })
    .catch((error) => {
      dispatch({
        type: DATASET_ERROR,
        payload: error.response,
      });
    });
};

export const deleteDataset = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("dashboard");
  axiosInstance
    .delete(`dataset/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: DELETE_DATASET,
          payload: response.data,
        });
        // window.location.reload();
      }
    })
    .catch((error) => {
      dispatch({
        type: DATASET_ERROR,
        payload: error.response,
      });
    });
};

//set Loading to True
export const setLoading = () => {
  return {
    type: TABLE_LOADING,
  };
};
//set Current Dataset
export const setCurrent = (dataset) => {
  return {
    type: SET_CURRENT_DATASET,
    payload: dataset,
  };
};
//set Current Dataset
export const appendTransformation = (step) => {
  return {
    type: ADD_TRANSFORMATION,
    payload: step,
  };
};

export const setSpecificDataset = (dataset) => async (dispatch) => {
  dispatch({
    type: GET_SPECIFIC_DATASETS,
    payload: dataset,
  });
};

export const setSingleTableData = (tableData) => async (dispatch) => {
  await dispatch({
    type: GET_SINGLE_TABLE_DATA,
    payload: JSON.parse(tableData),
  });
};

// set Payload
export const setRequestPayload = (payload) => {
  console.log("Dispatching payload:", payload); // Log payload
  return {
    type: SET_REQUEST_PAYLOAD,
    payload,
  };
};
