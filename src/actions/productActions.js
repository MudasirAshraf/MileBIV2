import {
  GET_ALL_PRODUCTS,
  RESPONSE,
  PRODUCT_ERROR,
  GET_ACTIVE_PRODUCTS,
} from "./types";
import axiosInstance from "../components/axios";
import {store} from "../store";
import urlswithoutgateway from "./urlswithoutgateway";

const config = ({ id }) => ({
  params:{
    "id": id
  }
});

//getallProducts
export const getAllProducts = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
   axiosInstance
    .get("/Product/getall")
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_ERROR,
        payload: error.response,
      });
    });
};
//getActiveProducts
export const getActiveProducts = (organizationId) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .get(`/Product/getactiveproducts/${organizationId}`)
    .then((response) => {
      dispatch({
        type: RESPONSE,
        regresponse: response.data,
      });
      if (response.data.messageType !== 2) {
        /*let groupByProductId= [];
        const resResult=response.data.data.sort((a, b) =>
        a.createdDate > b.createdDate ? -1 : 1,
      );
        resResult.reduce(function(res, value) {
          if (!res[value.productId]) {
            res[value.productId] = { productId: value.productId, numberOfLicenses: 0,title:value.title,createdDate:value.createdDate,modifiedDate:value.modifiedDate };
            groupByProductId.push(res[value.productId])
          }
          res[value.productId].numberOfLicenses += value.numberOfLicenses;
          return res;
        }, {});*/
        dispatch({
          type: GET_ACTIVE_PRODUCTS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_ERROR,
        payload: error.response,
      });
    });
};
