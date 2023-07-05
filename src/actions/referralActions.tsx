import axios from 'axios';
import { CREATE_REFERRAL_FAILURE, CREATE_REFERRAL_REQUEST, CREATE_REFERRAL_SUCCESS, DELETE_REFERRAL_FAILURE, DELETE_REFERRAL_REQUEST, DELETE_REFERRAL_SUCCESS, GET_ALL_REFERRALS_FAILURE, GET_ALL_REFERRALS_REQUEST, GET_ALL_REFERRALS_SUCCESS, GET_REFERRAL_BY_ID_FAILURE, GET_REFERRAL_BY_ID_REQUEST, GET_REFERRAL_BY_ID_SUCCESS, GET_REFERRAL_BY_USER_FAILURE, GET_REFERRAL_BY_USER_REQUEST, GET_REFERRAL_BY_USER_SUCCESS, UPDATE_REFERRAL_FAILURE, UPDATE_REFERRAL_REQUEST, UPDATE_REFERRAL_SUCCESS } from '../constants/referralConstants';

export const createReferal = (referalData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    console.log(referalData)
    dispatch({ type: CREATE_REFERRAL_REQUEST });

    const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/referals', referalData);
    
    dispatch({
      type: CREATE_REFERRAL_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CREATE_REFERRAL_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllReferals = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_ALL_REFERRALS_REQUEST });

    const { data } = await axios.get('https://peeppipsbackend.onrender.com/api/referals');
    console.log("referal data is ",data)
    dispatch({
      type: GET_ALL_REFERRALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_REFERRALS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getReferalById = (referalId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: GET_REFERRAL_BY_ID_REQUEST });

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/referals/${referalId}`);

    dispatch({
      type: GET_REFERRAL_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REFERRAL_BY_ID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getReferalByUser = (user: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    try {
      console.log("get referrals")
      dispatch({ type: GET_REFERRAL_BY_USER_REQUEST });
  
      const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/referals/user/${user}`);
  
      dispatch({
        type: GET_REFERRAL_BY_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_REFERRAL_BY_USER_FAILURE,
        payload: error.response?.data.message || error.message,
      });
    }
  };


export const deleteReferral = (referalId: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: DELETE_REFERRAL_REQUEST });

    await axios.delete(`https://peeppipsbackend.onrender.com/api/referals/${referalId}`);

    dispatch({
      type: DELETE_REFERRAL_SUCCESS,
      payload: referalId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REFERRAL_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateReferral = (referalId: any, updatedData: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: UPDATE_REFERRAL_REQUEST });

    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/referals/${referalId}`, updatedData);

    dispatch({
      type: UPDATE_REFERRAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_REFERRAL_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
