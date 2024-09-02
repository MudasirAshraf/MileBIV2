import {
  RESPONSE,
  ADD_NEW_COMPONENT,
  COMPONENT_ERROR,
  GET_ALL_COMPONENTS,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  COMPONENT_LOADING,
  SET_CURRENT_COMPONENT,
  CLEAR_CURRENT_COMPONENT,
} from "./types";
import axiosInstance from "../components/axios";
import { store } from "../store";
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

// addComponent

export const setRole = (value) => async (dispatch) => {
  dispatch({
    type: 'SET_ROLE',
     payload :value
  });

}
export const addComponent = (component) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  dispatch({
    type: COMPONENT_LOADING,
  });

  axiosInstance
    .post("Component", JSON.stringify(component), {
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
          type: ADD_NEW_COMPONENT,
          payload: response.data.data,
        });

        //append reducer component
      }
    })
    .catch((error) => {
      dispatch({
        type: RESPONSE,
        regresponse: error.response.data,
      });
      dispatch({
        type: COMPONENT_ERROR,
        payload: error.response,
      });
    });
};
export const getComponents = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  axiosInstance
  .get(`Component/${id}`, {
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
          type: GET_ALL_COMPONENTS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COMPONENT_ERROR,
        payload: error.response,
      });
    });
};
export const updateComponent = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("dashboard");
  const component = store.getState().component.current;
  axiosInstance
    .put("Component", JSON.stringify(component), {
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
          type: UPDATE_COMPONENT,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: COMPONENT_ERROR,
        payload: error.response,
      });
    });
};
export const deleteComponent = (id) => async (dispatch) => {
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
          type: DELETE_COMPONENT,
          payload: response.data,
        });
        window.location.reload();
      }
    })
    .catch((error) => {
      dispatch({
        type: COMPONENT_ERROR,
        payload: error.response,
      });
    });
};
//set Loading to True
export const setLoading = () => {
  return {
    type: COMPONENT_LOADING,
  };
};

export const setFreesize = (payload) => {
  console.log(payload,'payloadpayload')
  return {
    type: 'SET_FREE_SIZE',
    payload: payload
  };
};
//set Current Component
export const setCurrent = (component) => {
  return {
    type: SET_CURRENT_COMPONENT,
    payload: component,
  };
};
//clear Current Component
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT_COMPONENT,
    payload: null,
  };
};
