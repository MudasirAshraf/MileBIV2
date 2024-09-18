import {
  RESPONSE,
  ADD_NEW_DATASET,
  DATASET_ERROR,
  GET_ALL_DATASETS,
  UPDATE_DATASET,
  DELETE_DATASET,
  GET_ALL_TABLES,
  GET_TABLE_DATA,TABLE_LOADING,SET_CURRENT_DATASET,
  GET_SPECIFIC_DATASETS,ADD_TRANSFORMATION,
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
  axiosInstance.defaults.baseURL= urlswithoutgateway("connector");
  const source =
    dataset.selectedDataSource == "postgre"
      ? "PostgreConnector"
      : dataset.selectedDataSource == "sql"
      ? "SQLConnector"
      : dataset.selectedDataSource == "mysql"
      ? "MySqlConnector"
      : dataset.selectedDataSource == "oracle"
      ? "OracleConnector"
      : dataset.selectedDataSource == "excel"
      ? "ExcelConnector"
      : null;

  axiosInstance
    .post(`${source}/getalltables`, JSON.stringify(dataset), {
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
          type: GET_ALL_TABLES,
          payload:  JSON.parse(response.data.data),
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
    });
};

export const gettableData = (tables, dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("connector");
  dispatch({
    type: TABLE_LOADING,
    
  });
  const source =
    dataset.selectedDataSource == "postgre"
      ? "PostgreConnector"
      : dataset.selectedDataSource == "sql"
      ? "SQLConnector"
      : dataset.selectedDataSource == "mysql"
      ? "MySqlConnector"
      : dataset.selectedDataSource == "oracle"
      ? "OracleConnector"
      : dataset.selectedDataSource == "excel"
      ? "ExcelConnector"
      : null;
  tables.map((t, id) => {
      const newDataset = {
      connectionString: dataset.connectionString,
      userName: dataset.userName,
      password: dataset.password,
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
            payload: [newDataset , JSON.parse(response.data.data)],
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
      });
  });
};
// addDataset
export const addDataset = (tables) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  dispatch({
    type: TABLE_LOADING,
    
  });
  tables.map((t, id) => {
    const newDataset = {
      connectionString: t[0].connectionString,
      datasetTitle: t[0].tableName,
      userName:t[0].userName,
      password:t[0].password,
      DataSourceData:t[1].Table
    };
    
    
  axiosInstance
    .post("Dataset", JSON.stringify(newDataset), {
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
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "/datasets";
        }, 5000);
        //generate cookie inside local system and redirect to home page as logged in user
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
    });
  })
};
export const getDatasets = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .get("Dataset",  {
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
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .get("Dataset/"+id,  {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log('Dataset response:', response.data); // console data
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: GET_SPECIFIC_DATASETS,
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
export const updateDataset = (dataset) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .put("Dataset", JSON.stringify(dataset), {
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
          type: UPDATE_DATASET,
          payload: response.data,
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
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
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
        window.location.reload();
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