import {
  ADD_NEW_DASHBOARD,
  DASHBOARD_ERROR,
  GET_ALL_DASHBOARDS,
  DASHBOARD_LOADING,
  SET_CURRENT_DASHBOARD,
} from "../actions/types";

const initialState = {
  dashboards: null,
  loading: null,
  error: null,
  current: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CURRENT_DASHBOARD:
      return {
        ...state,
        current: action.payload,
      };
    case GET_ALL_DASHBOARDS:
      return {
        ...state,
        dashboards: action.payload,
        loading: false,
      };

    case DASHBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
