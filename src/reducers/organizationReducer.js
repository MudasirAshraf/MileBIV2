import {
  SORT_ORGANIZATIONS,
  FILTER_ORGANIZATIONS,
  GET_ORGANIZATIONS,
  SET_LOADING,
  ORGANIZATIONS_ERROR,
  ADD_ORGANIZATION,
  DELETE_ORGANIZATION,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_MESSAGE,
  UPDATE_ORGANIZATION,
  SEARCH_ORGANIZATIONS,
  USER_ACCESS,
  GET_CURRENT_ORGANIZATION,
  CLEAR_ORGANIZATIONS,
  ORGANIZATION_CLEAR_FILTER
} from "../actions/types";

const initialState = {
  organizations: null,
  filteredorganizations: null,
  checkedoutdetails: null,
  checkedoutowner: null,
  current: null,
  loading: false,
  error: null,
  success: null,
  useraccess: null,
 
};

export const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ORGANIZATIONS_ERROR:
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
   
    case GET_ORGANIZATIONS:
      return {
        ...state,
        filteredorganizations: action.payload,
        organizations: action.payload,
        loading: false,
      };
    case ADD_ORGANIZATION:
      return {
        ...state,
        organizations: [...state.organizations],
        success: action.payload,
        loading: false,
      };
    case DELETE_ORGANIZATION:
      return {
        ...state,
        organizations: state.organizations.filter(
          (organization) => organization.id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case SEARCH_ORGANIZATIONS:
      return {
        ...state,
        filteredorganizations: action.payload,
        filtervalues:[],
        loading: false,
      };
      case FILTER_ORGANIZATIONS:
        return {
          ...state,
          filteredorganizations: action.payload,
          loading: false,
        };
        case ORGANIZATION_CLEAR_FILTER:
          return {
            ...state,
            filteredorganizations: action.payload,
            filtervalues:[],
            loading: false,
          };
        
    case GET_CURRENT_ORGANIZATION:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case SORT_ORGANIZATIONS:
      return {
        ...state,
        filteredorganizations: action.payload,
        loading: false,
      };
    case SET_CURRENT:
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
