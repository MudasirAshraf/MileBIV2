import {
  RESPONSE,ADD_NEW_PAYMENT_METHOD,
 PAYMENT_ERROR,
 GET_ALL_PAYMENT_METHODS,UPDATE_PAYMENT_METHOD,DELETE_PAYMENT_METHOD,
} from "./types";
import axiosInstance from "../components/axios";
import urlswithoutgateway from "./urlswithoutgateway";
import store from "../store";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});

// Register new Subscription
export const addPaymentCredentials = (payment) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post("PaymentCredential/add", JSON.stringify(payment), {
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
          type: ADD_NEW_PAYMENT_METHOD,
          payload: response.data,
        });
        window.setTimeout(function(){

          // Move to a new location or you can do something else
          window.location.href = "/";
  
      }, 5000);
       //generate cookie inside local system and redirect to home page as logged in user
      }
    })
    .catch((error) => {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response,
      });
    });
};
export const getPaymentCredentials = (payment) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .get("PaymentCredential/getall", JSON.stringify(payment), {
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
          type: GET_ALL_PAYMENT_METHODS,
          payload: response.data.data,
        });
       
       
      }
    })
    .catch((error) => {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response,
      });
    });
};
export const addInnerPaymentCredentials = (payment) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post("PaymentCredential/add", JSON.stringify(payment), {
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
          type: ADD_NEW_PAYMENT_METHOD,
          payload: response.data,
        });
      window.location.reload();
       //generate cookie inside local system and redirect to home page as logged in user
      }
    })
    .catch((error) => {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response,
      });
    });
};
export const updatePaymentCredentials = (payment) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .put("PaymentCredential/update", JSON.stringify(payment), {
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
          type: UPDATE_PAYMENT_METHOD,
          payload: response.data,
        });
      window.location.reload();
       //generate cookie inside local system and redirect to home page as logged in user
      }
    })
    .catch((error) => {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response,
      });
    });
};
export const deletePaymentCredentials = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
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
          type: DELETE_PAYMENT_METHOD,
          payload: response.data,
        });
      window.location.reload();
       
      }
    })
    .catch((error) => {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response,
      });
    });
};