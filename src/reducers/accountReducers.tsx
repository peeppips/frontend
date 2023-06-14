import {
    GET_ALL_ACCOUNTS_REQUEST,
    GET_ALL_ACCOUNTS_SUCCESS,
    GET_ALL_ACCOUNTS_FAILURE,
    GET_ACCOUNT_BY_UUID_REQUEST,
    GET_ACCOUNT_BY_UUID_SUCCESS,
    GET_ACCOUNT_BY_UUID_FAILURE,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
    DELETE_ACCOUNT_REQUEST,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILURE,
    GET_ACCOUNTS_BY_USER_REQUEST,
    GET_ACCOUNTS_BY_USER_SUCCESS,
    GET_ACCOUNTS_BY_USER_FAILURE,
  } from '../constants/accountConstants';
  
  interface Account {
    // Define the properties of the account object
    // according to your application's requirements
    // For example:
    uid: string;
    login: string;
    password:string;
    investorPassword:string;
    lotSize:string;
    riskManagementPercentage:string;
    takeProfit:string;
    stopLoss:string;
    user:string;
    // ...
  }
  
  interface AllAccountsState {
    loading: boolean;
    accounts: Account[];
    error?: string;
  }
  
  interface AccountByUuidState {
    loading: boolean;
    account: Account;
    error?: string;
  }
  
  interface CreateAccountState {
    loading: boolean;
    success?: boolean;
    account: Account;
    error?: string;
  }
  
  interface DeleteAccountState {
    loading: boolean;
    success?: boolean;
    error?: string;
  }

  interface GetAccountsByUserState {
    loading: boolean;
    accounts?: Account[];
    error?: string;
  }

  
  export const getAllAccountsReducer = (
    state: AllAccountsState = { loading: false, accounts: [] },
    action: { type: string; payload: Account[]; error?: string }
  ): AllAccountsState => {
    switch (action.type) {
      case GET_ALL_ACCOUNTS_REQUEST:
        return { ...state, loading: true };
      case GET_ALL_ACCOUNTS_SUCCESS:
        return { ...state, loading: false, accounts: action.payload };
      case GET_ALL_ACCOUNTS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  


  
  export const getAccountByUuidReducer = (
    state: AccountByUuidState = { loading: false, account: { uid: "", login: "", password: "", investorPassword: "", lotSize: "", riskManagementPercentage: "", takeProfit: "", stopLoss: "", user: "" } },
    action: { type: string; payload: Account; error?: string }
  ): AccountByUuidState => {
    switch (action.type) {
      case GET_ACCOUNT_BY_UUID_REQUEST:
        return { ...state, loading: true, account: { uid: "", login: "", password: "", investorPassword: "", lotSize: "", riskManagementPercentage: "", takeProfit: "", stopLoss: "", user: "" } };
      case GET_ACCOUNT_BY_UUID_SUCCESS:
        return { ...state, loading: false, account: action.payload };
      case GET_ACCOUNT_BY_UUID_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const createAccountReducer = (
    state: CreateAccountState = { loading: false, account: { uid: "", login: "", password: "", investorPassword: "", lotSize: "", riskManagementPercentage: "", takeProfit: "", stopLoss: "", user: "" } },
    action: { type: string; payload: Account; error?: string }
  ): CreateAccountState => {
    switch (action.type) {
      case CREATE_ACCOUNT_REQUEST:
        return { ...state, loading: true };
      case CREATE_ACCOUNT_SUCCESS:
        return { ...state, loading: false, success: true, account: action.payload };
      case CREATE_ACCOUNT_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const deleteAccountReducer = (
    state: DeleteAccountState = { loading: false },
    action: { type: string; error?: string }
  ): DeleteAccountState => {
    switch (action.type) {
      case DELETE_ACCOUNT_REQUEST:
        return { ...state, loading: true };
      case DELETE_ACCOUNT_SUCCESS:
        return { ...state, loading: false, success: true };
      case DELETE_ACCOUNT_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  



  
  export const getAccountsByUserReducer = (
    state: GetAccountsByUserState = { loading: false, accounts: [] },
    action: { type: string; payload: Account[]; error?: string }
  ): GetAccountsByUserState => {
    switch (action.type) {
      case GET_ACCOUNTS_BY_USER_REQUEST:
        return { loading: true };
      case GET_ACCOUNTS_BY_USER_SUCCESS:
        return {  loading: false, accounts: action.payload };
      case GET_ACCOUNTS_BY_USER_FAILURE:
        return {  loading: false, error: action.error };
      default:
        return state;
    }
  };