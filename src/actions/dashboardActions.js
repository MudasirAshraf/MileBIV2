import {
  RESPONSE,
  ADD_NEW_DASHBOARD,
  DASHBOARD_ERROR,
  GET_ALL_DASHBOARDS,
  UPDATE_DASHBOARD,
  DELETE_DASHBOARD,
  GET_ALL_TABLES,
  GET_TABLE_DATA,DASHBOARD_LOADING,SET_CURRENT_DASHBOARD,
} from "./types";
import urlswithoutgateway from "./urlswithoutgateway";
import axiosInstance from "../components/axios";
import store from "../store";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

//Currently windows.reload later on just update and remove in state after success message to avoid reloads
export const getDataDefinition = (dashboard) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("connector");
  const source =
    dashboard.selectedDataSource == "postgre"
      ? "PostgreConnector"
      : dashboard.selectedDataSource == "sql"
      ? "SQLConnector"
      : dashboard.selectedDataSource == "mysql"
      ? "MySqlConnector"
      : dashboard.selectedDataSource == "oracle"
      ? "OracleConnector"
      : dashboard.selectedDataSource == "excel"
      ? "ExcelConnector"
      : null;

  axiosInstance
    .post(`${source}/getalltables`, JSON.stringify(dashboard), {
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
        type: DASHBOARD_ERROR,
        payload: error.response.data,
      });
      dispatch({
        type: RESPONSE,
        regresponse: error.response.data,
      });
    });
};

// addDashboard
export const addDashboard = (dashboard) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  dispatch({
    type: DASHBOARD_LOADING,
    
  });    
  axiosInstance
    .post("Dashboard", JSON.stringify(dashboard), {
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
          type: ADD_NEW_DASHBOARD,
          payload: response.data.data,
        });
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "/dashboards";
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
        type: DASHBOARD_ERROR,
        payload: error.response,
      });
    });
  
};
export const getDashboards = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .get("Dashboard",  {
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
          type: GET_ALL_DASHBOARDS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.response,
      });
    });
};
export const updateDashboard = (dashboard) => async (dispatch) => {
  console.log(dashboard,'dashboard')
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .put("Dashboard", JSON.stringify(dashboard), {
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
          type: UPDATE_DASHBOARD,
          payload: response.data,
        });
        window.location.reload();
        //generate cookie inside local system and redirect to home page as logged in user
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.response,
      });
    });
};
export const deleteDashboard = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .delete(`PaymentCredential/delete/${id}`, {
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
          type: DELETE_DASHBOARD,
          payload: response.data,
        });
        window.location.reload();
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.response,
      });
    });
};
export const getSpecificDashboard = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
    .get(`Dashboard/${id}`, {
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
          type: SET_CURRENT_DASHBOARD,
          payload: response.data.data,
        });
        
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.response,
      });
    });
};
//set Loading to True
export const setLoading = () => {
  return {
    type: DASHBOARD_LOADING,
  };
};
//set Current Dashboard
export const setCurrent = (dashboard) => {
  return {
    type: SET_CURRENT_DASHBOARD,
    payload: dashboard,
  };
};