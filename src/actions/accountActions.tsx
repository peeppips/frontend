import axios from 'axios';
import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  GET_ALL_ACCOUNTS_REQUEST,
  GET_ALL_ACCOUNTS_SUCCESS,
  GET_ALL_ACCOUNTS_FAILURE,
  GET_ACCOUNT_BY_UUID_REQUEST,
  GET_ACCOUNT_BY_UUID_SUCCESS,
  GET_ACCOUNT_BY_UUID_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  GET_ACCOUNTS_BY_USER_REQUEST,
  GET_ACCOUNTS_BY_USER_SUCCESS,
  GET_ACCOUNTS_BY_USER_FAILURE,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
} from '../constants/accountConstants';

export const createAccount = (accountData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: CREATE_ACCOUNT_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/accounts', accountData);

    dispatch({
      type: CREATE_ACCOUNT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_ACCOUNT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllAccounts = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_ACCOUNTS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/accounts');

    dispatch({
      type: GET_ALL_ACCOUNTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACCOUNTS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAccountByUuid = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ACCOUNT_BY_UUID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/accounts/${uuid}`);

    dispatch({
      type: GET_ACCOUNT_BY_UUID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNT_BY_UUID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteAccount = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });

    await axios.delete(`https://peeppipsbackend.onrender.com/api/accounts/${uuid}`);

    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
      payload: uuid,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAccountsByUser = (uuid: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    console.log("uuid acout is ",uuid)
    dispatch({ type: GET_ACCOUNTS_BY_USER_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/accounts/user/${uuid}`);

    dispatch({
      type: GET_ACCOUNTS_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNTS_BY_USER_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateAccount = (uid: string, updatedData: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  try {
    dispatch({ type: UPDATE_ACCOUNT_REQUEST });

    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/accounts/${uid}`, updatedData);

    dispatch({
      type: UPDATE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ACCOUNT_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
