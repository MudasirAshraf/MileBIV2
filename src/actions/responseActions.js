import {
  CLEAR_RESPONSE,
} from "./types";
import axiosInstance from "../components/axios";
import store from "../store";
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});
//clearMessage Success or Error
export const clearResponse = () => async (dispatch) => {
 
    dispatch({
      type: CLEAR_RESPONSE ,
      payload: null,
    });
 
};
