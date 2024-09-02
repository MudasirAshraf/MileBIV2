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
} from "./types";
import axiosInstance from "../components/axios";
import urlswithoutgateway from "./urlswithoutgateway";
import store from "../store";

const config = ({ id }) => ({
  params: {
    id: id,
  },
});


//getOrganizations
export const getOrganizations = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get("/Organization/Get", config)
    .then((response) => {
      dispatch({
        type: GET_ORGANIZATIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORGANIZATIONS_ERROR,
        payload: error.response.statusText,
      });
    });
};
//getUserAccess
export const getUserAccess = () => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  setLoading();
  axiosInstance
    .get("/Organization/UserAccess", config)
    .then((response) => {
      dispatch({
        type: USER_ACCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORGANIZATIONS_ERROR,
        payload: error.response.statusText,
      });
    });
};

//Custom search

export const customSearchOrganizations = (text) => async (dispatch) => {
  try {
    const resp = store.getState().organization;
    const data = resp.organizations.filter((organization) =>
     organization.رقمالبند?organization.رقمالبند.includes(text) ||organization.اسم_المشروع.includes(text): organization.اسم_المشروع.includes(text)
    );

    dispatch({
      type: SEARCH_ORGANIZATIONS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATIONS_ERROR,
      payload: err,
    });
  }
};
//sort Organizations
export const sortOrganizations = (text) => async (dispatch) => {
  try {
    const resp = store.getState().organization;
    const data = resp.organizations.filter((organization) =>
      organization.اسم_المشروع.includes(text)
    );

    dispatch({
      type: SORT_ORGANIZATIONS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//clearMessage Success or Error
export const clearMessage = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_MESSAGE,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATIONS_ERROR,
      payload: "Error while setting message",
    });
  }
};
//clear Filters
export const clearFilters = () => async (dispatch) => {
  try {
    const resp = store.getState().organization;
    const data = resp.organizations;
    dispatch({
      type: ORGANIZATION_CLEAR_FILTER,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATIONS_ERROR,
      payload: err,
    });
  }
};


// Add new Organization
export const addOrganization = (organization) => async (dispatch) => {
  axiosInstance.defaults.baseURL= urlswithoutgateway("admin");
  axiosInstance
    .post("Organization/add", JSON.stringify(organization), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_ORGANIZATION,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORGANIZATIONS_ERROR,
        payload: error.response,
      });
    });
};

//Delete Organization

export const deleteOrganization = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch("/organizations/${id}", {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_ORGANIZATION,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};
//update Organization
export const updateOrganization = (organization) => async (dispatch) => {
  let resp = store.getState().organization.priority;
  let internalName = resp.find((element) => {
    return element.FullValue === organization.organizationPriority;
  });

  organization.organizationPriority = internalName.Id;

  resp = store.getState().organization.stage;
  internalName = resp.find((element) => {
    return element.FullValue === organization.organizationStage;
  });
  organization.organizationStage = internalName.Id;

  resp = store.getState().organization.execution_method;
  internalName = resp.find((element) => {
    return element.FullValue === organization.executionMethod;
  });
  organization.executionMethod = internalName.Id;

  resp = store.getState().organization.category;
  internalName = resp.find((element) => {
    return element.FullValue === organization.organizationCategory;
  });
  organization.organizationCategory = internalName.Id;

  resp = store.getState().organization.category_type;
  internalName = resp.find((element) => {
    return element.FullValue === organization.organizationtypeCategory;
  });
  organization.organizationtypeCategory = internalName.Id;

  resp = store.getState().organization.department;
  internalName = resp.find((element) => {
    return element.FullValue === organization.organizationType;
  });
  organization.organizationType = internalName.Id;

  resp = store.getState().organization.organizationstatus;
  internalName = resp.find((element) => {
    return element.FullValue === organization.organizationStatus;
  });
  organization.organizationStatus = internalName.Id;

  axiosInstance
    .put("Organization/PutOrganization", JSON.stringify(organization), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch({
        type: UPDATE_ORGANIZATION,
        payload: organization,
      });
      
      window.location.reload();
    })
    .catch((error) => {
      dispatch({
        type: ORGANIZATIONS_ERROR,
        payload: error.response,
      });
    });
};

//getorganizationdetails
export const getCurrentOrganization = (id) => async (dispatch) => {
  setLoading();
  axiosInstance
    .get("Organization/GetOrganization/", config({ id }))
    .then((response) => {
      dispatch({
        type: GET_CURRENT_ORGANIZATION,
        payload: response.data[0],
      });
    })
    .catch((error) => {
      dispatch({
        type: ORGANIZATIONS_ERROR,
        payload: error.response.statusText,
      });
    });
};


//set Current Organization
export const setCurrent = (organization) => {
  return {
    type: SET_CURRENT,
    payload: organization,
  };
};
//clear Current Organization
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//set Loading to True
export const setLoading = () => {
  let resp = store.getState().organization.loading;
  return {
    type: SET_LOADING,
  };
};
//custom function for search - if required
export const selectOrganizations = (text) => {
  const resp = store.getState().organization;
  const data = resp.organizations.filter((organization) =>
    organization.اسم_المشروع.includes(text)
  );
  return data;
};
