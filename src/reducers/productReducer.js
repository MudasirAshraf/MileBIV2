import {
  GET_ALL_PRODUCTS,
  PRODUCT_ERROR,
  GET_ACTIVE_PRODUCTS,
} from "../actions/types";

const initialState = {
  products: null,
  loading: null,
  error: null,
  activeProducts: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_ACTIVE_PRODUCTS:
      return {
        ...state,
        activeProducts: action.payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
