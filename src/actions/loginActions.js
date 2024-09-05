import {
  GET_LOGIN,
  SET_LOGIN,
  FORGOT_JOURNEY,
  CLEAR_LOGIN,
  AUTH_ERROR,
  SET_ACCESS,
  RESPONSE,
  RESET_EMAIL,
} from "./types";
import axiosInstance from "../components/axios";
import {store} from "../store"
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

//getAuth
export const getAuth = (user) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/User/Login", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: RESPONSE,
      regresponse: response.data,
    });

    if (response.data.messageType !== 2) {
      dispatch({
        type: SET_LOGIN,
        payload: response.data.data,
      });
      return response.data; 
    }
  } catch (error) {
    dispatch({
      type: RESPONSE,
      regresponse: error.response.data,
    });

    dispatch({
      type: AUTH_ERROR,
      payload: error.response.statusText,
    });
    throw error; 
  }
};
//forgotPassword
export const forgotPassword = (email) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post(`/User/forgetpassword/${email}`, {
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
          type: FORGOT_JOURNEY,
          payload: 2,
          
        });
        dispatch({
          type:RESET_EMAIL,
          resetEmail: response.data.data.email,
        })
      }
    })
    .catch((error) => {
      dispatch({
        type: RESPONSE,
        regresponse: error.response.data,
      });
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.statusText,
      });
    });
};
//postResetDetails
export const postResetDetails = (user) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post("/User/resetdetail/", JSON.stringify(user), {
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
        window.setTimeout(function () {
          window.location.href = "/update-password";
        }, 500);
      }
        // Return the response data
    return response.data;
    })
    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.statusText,
      });
    });
};
//verifyCode
export const verifyCode = (user) => async (dispatch) => {
  try {
    axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
    const response = await axiosInstance.post("/User/resetcodevalidation/", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: RESPONSE,
      regresponse: response.data,
    });

    if (response.data.messageType !== 2) {
      dispatch({
        type: FORGOT_JOURNEY,
        payload: 3,
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: RESPONSE,
      regresponse: error.response?.data,
    });
    dispatch({
      type: AUTH_ERROR,
      payload: error.response?.statusText,
    });
    throw error;
  }
};


//validateAccess
export const validateAccess = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .get("/Auth/ValidateAccess", config({ id }))
    .then((response) => {
      dispatch({
        type: SET_ACCESS,
        payload: response.data,
      });
      if (response.data.StatusCode === 401) {
        window.location = "/NoAccess";
      }
    })

    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.statusText,
      });
    });
};

export const clearLogin = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_LOGIN,
      payload: null,
    });
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Error while setting message",
    });
  }
};
