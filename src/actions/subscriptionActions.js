import {
  RESPONSE,REGSTEP,
  SUBSCRIPTION_ERROR,
} from "./types";
import axiosInstance from "../components/axios";
import store from "../store";
import urlswithoutgateway from "./urlswithoutgateway";
const config = ({ id }) => ({
  params: {
    id: id,
  },
});

// Register new Subscription
export const addSubscription = (subscription) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post("Subscription/add", JSON.stringify(subscription), {
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
          payload: 4,
          regresponse: response.data,
        });
       
      }
    })
    .catch((error) => {
      dispatch({
        type: SUBSCRIPTION_ERROR,
        payload: error.response,
      });
    });
};
