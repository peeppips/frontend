import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,
  GET_PROJECT_BY_ID_REQUEST,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
} from '../constants/projectConstants';

export const createProjectReducer = (state = { project: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return { loading: true };
    case CREATE_PROJECT_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case CREATE_PROJECT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllProjectsReducer = (state = { projects: [] }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case GET_ALL_PROJECTS_REQUEST:
      return { loading: true };
    case GET_ALL_PROJECTS_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_ALL_PROJECTS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProjectByIdReducer = (state = { project: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case GET_PROJECT_BY_ID_REQUEST:
      return { loading: true, project: {} };
    case GET_PROJECT_BY_ID_SUCCESS:
      return { loading: false, project: action.payload };
    case GET_PROJECT_BY_ID_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProjectReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return { loading: true };
    case DELETE_PROJECT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PROJECT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectReducer = (state = { project: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case UPDATE_PROJECT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
