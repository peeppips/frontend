import {
  CREATE_REFERRAL_REQUEST,
  CREATE_REFERRAL_SUCCESS,
  CREATE_REFERRAL_FAILURE,
  GET_ALL_REFERRALS_REQUEST,
  GET_ALL_REFERRALS_SUCCESS,
  GET_ALL_REFERRALS_FAILURE,
  GET_REFERRAL_BY_ID_REQUEST,
  GET_REFERRAL_BY_ID_SUCCESS,
  GET_REFERRAL_BY_ID_FAILURE,
  DELETE_REFERRAL_REQUEST,
  DELETE_REFERRAL_SUCCESS,
  DELETE_REFERRAL_FAILURE,
  UPDATE_REFERRAL_REQUEST,
  UPDATE_REFERRAL_SUCCESS,
  UPDATE_REFERRAL_FAILURE,
  GET_REFERRAL_BY_USER_REQUEST,
  GET_REFERRAL_BY_USER_SUCCESS,
  GET_REFERRAL_BY_USER_FAILURE,
} from '../constants/referralConstants';

export const createReferralReducer = (state = { referral: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case CREATE_REFERRAL_REQUEST:
      return { loading: true };
    case CREATE_REFERRAL_SUCCESS:
      return { loading: false, success: true, referral: action.payload };
    case CREATE_REFERRAL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllReferralsReducer = (state = { referrals: [] }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case GET_ALL_REFERRALS_REQUEST:
      return { loading: true };
    case GET_ALL_REFERRALS_SUCCESS:
      return { loading: false, referrals: action.payload };
    case GET_ALL_REFERRALS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReferralByIdReducer = (state = { referral: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case GET_REFERRAL_BY_ID_REQUEST:
      return { loading: true, referral: {} };
    case GET_REFERRAL_BY_ID_SUCCESS:
      return { loading: false, referral: action.payload };
    case GET_REFERRAL_BY_ID_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const getReferralByUserReducer = (state = { referrals: [] }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case GET_REFERRAL_BY_USER_REQUEST:
      return { loading: true, referrals: [] };
    case GET_REFERRAL_BY_USER_SUCCESS:
      return { loading: false, referrals: action.payload };
    case GET_REFERRAL_BY_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReferralReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case DELETE_REFERRAL_REQUEST:
      return { loading: true };
    case DELETE_REFERRAL_SUCCESS:
      return { loading: false, success: true };
    case DELETE_REFERRAL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateReferralReducer = (state = { referral: {} }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case UPDATE_REFERRAL_REQUEST:
      return { loading: true };
    case UPDATE_REFERRAL_SUCCESS:
      return { loading: false, success: true, referral: action.payload };
    case UPDATE_REFERRAL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
