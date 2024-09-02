import {
  SORT_USERS,
  FILTER_USERS,
  GET_USERS,
  SET_LOADING,
  USERS_ERROR,
  ADD_USER,
  DELETE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT,
  CLEAR_USER_MESSAGE,
  UPDATE_USER,
  SEARCH_USERS,
  USER_ACCESS,
  GET_CURRENT_USER,
  CLEAR_USERS,
  USER_CLEAR_FILTER,
  REGSTEP,
  RESPONSE,
  SET_LOGIN,
  CLEAR_RESPONSE,
  GET_ORG_IN_ACTIVE_USERS,
  GET_ORG_ACTIVE_USERS,
} from "./types";
import axiosInstance from "../components/axios";
import { store } from "../store";
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

//getActiveUsers
export const getActiveUsers = (organizationId) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get(`/User/getactiveusers/${organizationId}`, config)
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: GET_ORG_ACTIVE_USERS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.statusText,
      });
    });
};
//getInActiveUsers
export const getInActiveUsers = (organizationId) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get(`/User/getinactiveusers/${organizationId}`, config)
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: GET_ORG_IN_ACTIVE_USERS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.statusText,
      });
    });
};
//getUsers
export const getUsers = () => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get("/User/Get", config)
    .then((response) => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.statusText,
      });
    });
};
//getUserAccess
export const getUserAccess = () => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get("/User/UserAccess", config)
    .then((response) => {
      dispatch({
        type: USER_ACCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.statusText,
      });
    });
};

//Custom search

export const customSearchUsers = (text) => async (dispatch) => {
  try {
    const resp = store.getState().user;
    const data = resp.users.filter((user) =>
      user.رقمالبند
        ? user.رقمالبند.includes(text) || user.اسم_المشروع.includes(text)
        : user.اسم_المشروع.includes(text)
    );

    dispatch({
      type: SEARCH_USERS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: err,
    });
  }
};
//sort Users
export const sortUsers = (text) => async (dispatch) => {
  try {
    const resp = store.getState().user;
    const data = resp.users.filter((user) => user.اسم_المشروع.includes(text));

    dispatch({
      type: SORT_USERS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//clearMessage Success or Error
export const clearMessage = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_USER_MESSAGE,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: "Error while setting message",
    });
  }
};

//clear Filters
export const clearFilters = () => async (dispatch) => {
  try {
    const resp = store.getState().user;
    const data = resp.users;
    dispatch({
      type: USER_CLEAR_FILTER,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: err,
    });
  }
};

// Register new User
export const registerUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  axiosInstance
    .post("User/register", JSON.stringify(user), {
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
          type: REGSTEP,
          payload: 2,
          regresponse: response.data,
        });
        dispatch({
          type: SET_LOGIN,
          payload: response.data.data,
        });
      }else{
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      }

    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
};

// Verify new User
export const verifyUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  axiosInstance
    .post("User/verify-user", JSON.stringify(user), {
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
          type: REGSTEP,
          payload: 3,
          regresponse: response.data,
        });
        dispatch({
          type: SET_LOGIN,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      console.log("error",error)
      dispatch({
        type: USERS_ERROR,
        payload: error.response,
      });
    });
};
// Add new User
export const adduser = (user) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  axiosInstance
    .post("User/adduser", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response,
      });
    });
};

//Delete User

export const deleteUser = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .delete(`User/deleteuser/${id}`, {
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
          type: DELETE_USER,
          payload: response.data,

        });
      }
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response,
      });
    });
};
//update User
export const updateUser = (user) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  axiosInstance
    .put("User/updateuser", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response,
      });
      dispatch({
        type: RESPONSE,
        regresponse: error.response.data,
      });
    });
};

//getuserdetails
export const getCurrentUser = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get("User/GetUser/", config({ id }))
    .then((response) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: response.data[0],
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.statusText,
      });
    });
};

//set Current User
export const setCurrent = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
//clear Current User
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//set Loading to True
export const setLoading = () => {
  let resp = store.getState().user.loading;
  return {
    type: SET_LOADING,
  };
};
//custom function for search - if required
export const selectUsers = (text) => {
  const resp = store.getState().user;
  const data = resp.users.filter((user) => user.اسم_المشروع.includes(text));
  return data;
};
