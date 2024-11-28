import {
  SET_DATABASE,
  SET_DATABASE_DATA,
  SET_CONNECTING_DETAIL,
} from "./types";

// set selected database
export const setSelectedDatabasePayload = (payload) => {
  console.log("Dispatching payload:", payload); // Log payload
  return {
    type: SET_DATABASE,
    payload,
  };
};

export const setConnectingDetailPayload = (payload) => {
  console.log("Dispatching payload:", payload); // Log payload
  return {
    type: SET_CONNECTING_DETAIL,
    payload,
  };
};

export const setDatabaseDataPayload = (payload) => {
  console.log("Dispatching payload:", payload); // Log payload
  return {
    type: SET_DATABASE_DATA,
    payload,
  };
};
