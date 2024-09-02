import {
  RESPONSE,CLEAR_RESPONSE
  
} from "../actions/types";

const initialState = {
  
  response:null,
  
 
};

export const responseReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case CLEAR_RESPONSE:
      return {
        ...state,
        response: action.payload,
        
      };
  
      case RESPONSE:
        return {
          ...state,
        response:action.regresponse,
        loading: false,
        };
  

    default:
      return state;
  }
};
