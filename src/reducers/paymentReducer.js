import { ADD_NEW_PAYMENT_METHOD, PAYMENT_ERROR,GET_ALL_PAYMENT_METHODS } from "../actions/types";

const initialState = {
  paymentcredentials: null,
  activepaymentcredentials: null,
  loading: null,
  error: null,
};

export const paymentCredentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ALL_PAYMENT_METHODS:
      return {
        ...state,
        activepaymentcredentials: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
