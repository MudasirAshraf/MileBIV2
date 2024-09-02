import {
  GET_LOGIN,
  SET_LOGIN,
  CLEAR_LOGIN,
  AUTH_ERROR,
  SET_ACCESS,
  FORGOT_JOURNEY,
  RESET_EMAIL,
} from "../actions/types";

const initialState = {
  user: null,
  error: null,
  access: null,
  forgotstep: 1,
  resetEmail: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FORGOT_JOURNEY:
      return {
        ...state,
        forgotstep: action.payload,
      };
    case RESET_EMAIL:
      return {
        ...state,
        resetEmail: action.resetEmail,
      };
    case SET_LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case CLEAR_LOGIN:
      return {
        ...state,
        user: null,
      };
    case SET_ACCESS:
      return {
        ...state,
        access: action.payload,
      };

    default:
      return state;
  }
};
