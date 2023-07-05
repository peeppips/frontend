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
    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILURE,
  } from '../constants/accountConstants';
  
  interface Account {
    // Define the properties of the account object
    // according to your application's requirements
    // For example:
    id:string;
    uid: string;
    login: string;
    password:string;
    investorPassword:string;
    lotSize:string;
    takeProfit:string;
    stopLoss:string;
    user:string;
    broker:string;
    server:string
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

  interface UpdateAccountState {
    loading: boolean;
    success?: boolean;
    error?: string;
    account?:Account;
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
    state: AccountByUuidState = { loading: false, account: {id:"", uid: "", login: "", password: "", investorPassword: "", lotSize: "", takeProfit: "", stopLoss: "", user: "",broker:"",server:"" } },
    action: { type: string; payload: Account; error?: string }
  ): AccountByUuidState => {
    switch (action.type) {
      case GET_ACCOUNT_BY_UUID_REQUEST:
        return { ...state, loading: true, account: {id:"", uid: "", login: "", password: "", investorPassword: "", lotSize: "",takeProfit: "", stopLoss: "", user: "",broker:"",server:"" } };
      case GET_ACCOUNT_BY_UUID_SUCCESS:
        return { ...state, loading: false, account: action.payload };
      case GET_ACCOUNT_BY_UUID_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export const createAccountReducer = (
    state: CreateAccountState = { loading: false, account: {id:"", uid: "", login: "", password: "", investorPassword: "", lotSize: "", takeProfit: "", stopLoss: "", user: "",broker:"",server:"" } },
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

  export const updateAccountReducer = (
    state: UpdateAccountState = { loading: false, success: false, account: {id:"", uid: "", login: "", password: "", investorPassword: "", lotSize: "", takeProfit: "", stopLoss: "", user: "",broker:"",server:"" } },
    action: { type: string; payload: Account; error?: string }
  ): UpdateAccountState => {
    switch (action.type) {
      case UPDATE_ACCOUNT_REQUEST:
        return { ...state, loading: true };
      case UPDATE_ACCOUNT_SUCCESS:
        return { ...state, loading: false, success: true, account: action.payload };
      case UPDATE_ACCOUNT_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  