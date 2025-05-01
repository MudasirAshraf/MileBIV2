import {
  WORKSPACE_ERROR,
  GET_ALL_WORKSPACES,
  WORKSPACE_LOADING,
} from "../actions/types";

const initialState = {
  workspaces: null,
  loading: null,
  error: null,
  current: null,
};

export const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ALL_WORKSPACES:
      return {
        ...state,
        workspaces: action.payload,
        loading: false,
      };
    case WORKSPACE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
