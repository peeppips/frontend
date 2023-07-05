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
  
  interface Credit {
    // Define the properties of the credit object
    // according to your application's requirements
    // For example:
    uid: string;
    user: string;
    transactionId: string;
    project: string;
    points: number;
    createdAt: string;
    updatedAt: Date;
    // ...
  }
  
  interface AllCreditsState {
    loading: boolean;
    credits: Credit[];
    error?: string;
  }
  
  interface CreditByUuidState {
    loading: boolean;
    credit: Credit;
    error?: string;
  }
  
  interface CreateCreditState {
    loading: boolean;
    success?: boolean;
    credit: Credit;
    error?: string;
  }
  
  interface DeleteCreditState {
    loading: boolean;
    success?: boolean;
    error?: string;
  }
  
  interface GetCreditsByUserState {
    loading: boolean;
    credits?: Credit[];
    error?: string;
  }
  
  export const getAllCreditsReducer = (
    state: AllCreditsState = { loading: false, credits: [] },
    action: { type: string; payload: Credit[]; error?: string }
  ): AllCreditsState => {
    switch (action.type) {
      case GET_ALL_CREDITS_REQUEST:
        return { ...state, loading: true };
      case GET_ALL_CREDITS_SUCCESS:
        return { ...state, loading: false, credits: action.payload };
      case GET_ALL_CREDITS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const getCreditByUuidReducer = (
    state: CreditByUuidState = { loading: false, credit: { uid: "", user: "", transactionId: "", project: "", points: 0, createdAt: "", updatedAt: new Date() } },
    action: { type: string; payload: Credit; error?: string }
  ): CreditByUuidState => {
    switch (action.type) {
      case GET_CREDIT_BY_UUID_REQUEST:
        return { ...state, loading: true, credit: { uid: "", user: "", transactionId: "", project: "", points: 0, createdAt: "", updatedAt: new Date() } };
      case GET_CREDIT_BY_UUID_SUCCESS:
        return { ...state, loading: false, credit: action.payload };
      case GET_CREDIT_BY_UUID_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const createCreditReducer = (
    state: CreateCreditState = { loading: false, credit: { uid: "", user: "", transactionId: "", project: "", points: 0, createdAt: "", updatedAt: new Date() } },
    action: { type: string; payload: Credit; error?: string }
  ): CreateCreditState => {
    switch (action.type) {
      case CREATE_CREDIT_REQUEST:
        return { ...state, loading: true };
      case CREATE_CREDIT_SUCCESS:
        return { ...state, loading: false, success: true, credit: action.payload };
      case CREATE_CREDIT_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const deleteCreditReducer = (
    state: DeleteCreditState = { loading: false },
    action: { type: string; error?: string }
  ): DeleteCreditState => {
    switch (action.type) {
      case DELETE_CREDIT_REQUEST:
        return { ...state, loading: true };
      case DELETE_CREDIT_SUCCESS:
        return { ...state, loading: false, success: true };
      case DELETE_CREDIT_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const getCreditsByUserReducer = (
    state: GetCreditsByUserState = { loading: false, credits: [] },
    action: { type: string; payload: Credit[]; error?: string }
  ): GetCreditsByUserState => {
    switch (action.type) {
      case GET_CREDITS_BY_USER_REQUEST:
        return { loading: true };
      case GET_CREDITS_BY_USER_SUCCESS:
        return { loading: false, credits: action.payload };
      case GET_CREDITS_BY_USER_FAILURE:
        return { loading: false, error: action.error };
      default:
        return state;
    }
  };
  