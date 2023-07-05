import axios from 'axios';
import {
  CREATE_CREDIT_REQUEST,
  CREATE_CREDIT_SUCCESS,
  CREATE_CREDIT_FAILURE,
  GET_ALL_CREDITS_REQUEST,
  GET_ALL_CREDITS_SUCCESS,
  GET_ALL_CREDITS_FAILURE,
  GET_CREDIT_BY_UUID_REQUEST,
  GET_CREDIT_BY_UUID_SUCCESS,
  GET_CREDIT_BY_UUID_FAILURE,
  DELETE_CREDIT_REQUEST,
  DELETE_CREDIT_SUCCESS,
  DELETE_CREDIT_FAILURE,
  GET_CREDITS_BY_USER_REQUEST,
  GET_CREDITS_BY_USER_SUCCESS,
  GET_CREDITS_BY_USER_FAILURE,
} from '../constants/creditConstants';

export const createCredit = (creditData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: CREATE_CREDIT_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/credits', creditData);

    dispatch({
      type: CREATE_CREDIT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_CREDIT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllCredits = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_CREDITS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/credits');

    dispatch({
      type: GET_ALL_CREDITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CREDITS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getCreditByUuid = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_CREDIT_BY_UUID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/credits/${uuid}`);

    dispatch({
      type: GET_CREDIT_BY_UUID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CREDIT_BY_UUID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteCredit = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_CREDIT_REQUEST });

    await axios.delete(`https://peeppipsbackend.onrender.com/api/credits/${uuid}`);

    dispatch({
      type: DELETE_CREDIT_SUCCESS,
      payload: uuid,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CREDIT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getCreditsByUser = (userId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_CREDITS_BY_USER_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/credits/user/${userId}`);

    dispatch({
      type: GET_CREDITS_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CREDITS_BY_USER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
