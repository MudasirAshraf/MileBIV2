import {
  SORT_USERS,
  FILTER_USERS,
  GET_USERS,
  SET_LOADING,
  USERS_ERROR,
  ADD_USER,
  DELETE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT,
  CLEAR_MESSAGE,
  UPDATE_USER,
  SEARCH_USERS,
  USER_ACCESS,
  GET_CURRENT_USER,
  REGSTEP,
  GET_ORG_IN_ACTIVE_USERS,
  GET_ORG_ACTIVE_USERS,
  CLEAR_USERS,
  USER_CLEAR_FILTER,
} from "../actions/types";

const initialState = {
  users: null,
  filteredusers: null,
  checkedoutdetails: null,
  checkedoutowner: null,
  current: null,
  loading: false,
  error: null,
  success: null,
  useraccess: null,
  regStep: null,
  activeusers: null,
  inactiveusers: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        error: action.payload,
        success: action.payload,
      };
    case USER_ACCESS:
      return {
        ...state,
        useraccess: action.payload,
        loading: false,
      };

    case GET_USERS:
      return {
        ...state,
        filteredusers: action.payload,
        users: action.payload,
        loading: false,
      };
    case GET_ORG_IN_ACTIVE_USERS:
      return {
        ...state,
        inactiveusers: action.payload,
        loading: false,
      };
    case GET_ORG_ACTIVE_USERS:
      return {
        ...state,
        activeusers: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users],
        success: action.payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
      };
    case REGSTEP:
      return {
        ...state,
        regStep: action.payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        filteredusers: action.payload,
        filtervalues: [],
        loading: false,
      };
    case FILTER_USERS:
      return {
        ...state,
        filteredusers: action.payload,
        loading: false,
      };
    case USER_CLEAR_FILTER:
      return {
        ...state,
        filteredusers: action.payload,
        filtervalues: [],
        loading: false,
      };

    case GET_CURRENT_USER:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case SORT_USERS:
      return {
        ...state,
        filteredusers: action.payload,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
