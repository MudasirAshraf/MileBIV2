import { GET_ALL_SUBSCRIPTIONS, SUBSCRIPTION_ERROR } from "../actions/types";

const initialState = {
  subscriptions: null,
  loading: null,
  error: null,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
        loading: false,
      };
    case SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
