import {
  ADD_NEW_DATASET,
  DATASET_ERROR,
  GET_ALL_DATASETS,
  GET_ALL_TABLES,TABLE_LOADING,
  GET_TABLE_DATA,SET_CURRENT_DATASET,
} from "../actions/types";

const initialState = {
  datasets: null,
  loading: null,
  error: null,
  tables: null,
  current:null,
  tabledatas: [],
};

export const datasetReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATASET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case SET_CURRENT_DATASET:
      return{
        ...state,
        current: action.payload,
      }
    case GET_ALL_DATASETS:
      return {
        ...state,
        datasets: action.payload,
        loading: false,
      };
    case GET_ALL_TABLES:
      return {
        ...state,
        tables: action.payload,
        loading: false,
      };
      case GET_TABLE_DATA:
        return{
          ...state,
          loading:false,
          tabledatas: [...state.tabledatas,action.payload],
        }
        case TABLE_LOADING:
          return{
            ...state,
            loading:true,
          }
    default:
      return state;
  }
};
