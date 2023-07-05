import axios from 'axios';
import {
  CREATE_SERVER_REQUEST,
  CREATE_SERVER_SUCCESS,
  CREATE_SERVER_FAILURE,
  GET_ALL_SERVERS_REQUEST,
  GET_ALL_SERVERS_SUCCESS,
  GET_ALL_SERVERS_FAILURE,
  GET_SERVER_BY_ID_REQUEST,
  GET_SERVER_BY_ID_SUCCESS,
  GET_SERVER_BY_ID_FAILURE,
  DELETE_SERVER_REQUEST,
  DELETE_SERVER_SUCCESS,
  DELETE_SERVER_FAILURE,
  GET_SERVERS_BY_BROKER_FAILURE,
  GET_SERVERS_BY_BROKER_SUCCESS,
  GET_SERVERS_BY_BROKER_REQUEST,
} from '../constants/serverConstants';

export const createServer = (serverData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: CREATE_SERVER_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/servers', serverData);

    dispatch({
      type: CREATE_SERVER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_SERVER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllServers = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_SERVERS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/servers');

    dispatch({
      type: GET_ALL_SERVERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SERVERS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getServerByUuid = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_SERVER_BY_ID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/servers/${uuid}`);

    dispatch({
      type: GET_SERVER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVER_BY_ID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteServer = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_SERVER_REQUEST });

    await axios.delete(`https://peeppipsbackend.onrender.com/api/servers/${uuid}`);

    dispatch({
      type: DELETE_SERVER_SUCCESS,
      payload: uuid,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SERVER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getServersByBroker = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_SERVERS_BY_BROKER_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/servers/broker/${uuid}`);

    dispatch({
      type: GET_SERVERS_BY_BROKER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVERS_BY_BROKER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
