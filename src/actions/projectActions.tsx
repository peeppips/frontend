import axios from 'axios';
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

export const createProject = (projectData: { name: string; strategy: string; apiKey: string; market: string; lotSize: string; riskManagement: string; stopLoss: string; takeProfit: string; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/projects/', projectData);

    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllProjects = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_PROJECTS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/projects');

    dispatch({
      type: GET_ALL_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: GET_ALL_PROJECTS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getProjectById = (projectId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_PROJECT_BY_ID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/projects/${projectId}`);

    dispatch({
      type: GET_PROJECT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: GET_PROJECT_BY_ID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteProject = (projectId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    await axios.delete(`/api/projects/${projectId}`);

    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: projectId,
    });
  } catch (error:any) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateProject = (projectId: any, updatedData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/projects/${projectId}`, updatedData);

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
