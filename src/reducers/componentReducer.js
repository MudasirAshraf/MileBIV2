import {
  ADD_NEW_COMPONENT,
  COMPONENT_ERROR,
  GET_ALL_COMPONENTS,
  COMPONENT_LOADING,
  SET_CURRENT_COMPONENT,
  CLEAR_CURRENT_COMPONENT, UPDATE_COMPONENT,
} from "../actions/types";

const initialState = {
  components: [],
  loading: null,
  error: null,
  current: null,
  freeSize: false,
  role:'owner'
};

export const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case COMPONENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CURRENT_COMPONENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_COMPONENT:
      return {
        ...state,
        current: action.payload,
      }
    case 'SET_FREE_SIZE':
      console.log('payloadpayload1',action.payload)
      return {
        freeSize: action.payload,
      }
    case GET_ALL_COMPONENTS:
      return {
        ...state,
        components: action.payload,
        loading: false,
      };
    case ADD_NEW_COMPONENT:
      return {
        ...state,
        components: [...state.components, action.payload],
        loading: false,
      }
    case UPDATE_COMPONENT:
      return {
        ...state,
        components: state.components.filter((compo) => compo.componentId === action.payload.componentId ? action.payload : compo)
      }
    case COMPONENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
