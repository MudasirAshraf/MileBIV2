import {
  SET_DATABASE,
  SET_CONNECTING_DETAIL,
  SET_DATABASE_DATA,
} from "../actions/types";

const initialState = {
  selectedDatabase: null,
  connectingDetail: null,
  data: null,
  error: null,
};

export const dataSourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATABASE:
      return {
        ...state,
        selectedDatabase: action.payload,
      };
    case SET_CONNECTING_DETAIL:
      return {
        ...state,
        connectingDetail: action.payload,
      };
    case SET_DATABASE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
