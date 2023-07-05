import axios from 'axios';
import {
  CREATE_BROKER_REQUEST,
  CREATE_BROKER_SUCCESS,
  CREATE_BROKER_FAILURE,
  GET_ALL_BROKERS_REQUEST,
  GET_ALL_BROKERS_SUCCESS,
  GET_ALL_BROKERS_FAILURE,
  GET_BROKER_BY_ID_REQUEST,
  GET_BROKER_BY_ID_SUCCESS,
  GET_BROKER_BY_ID_FAILURE,
  DELETE_BROKER_REQUEST,
  DELETE_BROKER_SUCCESS,
  DELETE_BROKER_FAILURE,
  UPDATE_BROKER_REQUEST,
  UPDATE_BROKER_SUCCESS,
  UPDATE_BROKER_FAILURE,
} from '../constants/brokerConstants';

export const createBroker = (brokerData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    console.log(brokerData)
    dispatch({ type: CREATE_BROKER_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/brokers', brokerData);
    
    dispatch({
      type: CREATE_BROKER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_BROKER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllBrokers = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_BROKERS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/brokers');

    dispatch({
      type: GET_ALL_BROKERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BROKERS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getBrokerById = (brokerId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_BROKER_BY_ID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/brokers/${brokerId}`);

    dispatch({
      type: GET_BROKER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BROKER_BY_ID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteBroker = (brokerId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_BROKER_REQUEST });

    await axios.delete(`https://peeppipsbackend.onrender.com/api/brokers/${brokerId}`);

    dispatch({
      type: DELETE_BROKER_SUCCESS,
      payload: brokerId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BROKER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateBroker = (brokerId: any, updatedData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: UPDATE_BROKER_REQUEST });

    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/brokers/${brokerId}`, updatedData);

    dispatch({
      type: UPDATE_BROKER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BROKER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
