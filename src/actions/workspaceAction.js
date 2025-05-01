import axiosInstance from "../components/axios";
import { GET_ALL_WORKSPACES, RESPONSE, WORKSPACE_ERROR } from "./types";
import urlswithoutgateway from "./urlswithoutgateway";

export const getWorkspaces = (id) => async (dispatch) => {
  axiosInstance.defaults.baseURL = urlswithoutgateway("admin");
  axiosInstance
    .get(`workspace/getactiveworkspaces/${id}`, {
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
          type: GET_ALL_WORKSPACES,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: error.response,
      });
    });
};
