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
  UPDATE_SERVER_REQUEST,
  UPDATE_SERVER_SUCCESS,
  UPDATE_SERVER_FAILURE,
} from '../constants/serverConstants';
interface Server {
  // Define the properties of the broker object
  // according to your application's requirements
  // For example:
  uid: string;
  broker: string;
  server: string;
  // ...
}

interface AllServersState {
  loading: boolean;
  servers: Server[];
  error?: string;
}



interface CreateServerState {
  loading: boolean;
  success?: boolean;
  server: Server;
  error?: string;
}

interface UpdateServerState {
  loading: boolean;
  success?: boolean;
  server: Server;
  error?: string;
}

interface DeleteServerState {
  loading: boolean;
  success?: boolean;
  error?: string;
}

export const getAllServersReducer = (
  state: AllServersState = { loading: false, servers: [] },
  action: { type: string; payload: Server[]; error?: string }
): AllServersState => {
  switch (action.type) {
    case GET_ALL_SERVERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_SERVERS_SUCCESS:
      return { ...state, loading: false, servers: action.payload };
    case GET_ALL_SERVERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const getServerByUidReducer = ( state = { loading: false, server:{}  },action: { type: any; payload: any; error?: string }) => {
  switch (action.type) {
    case GET_SERVER_BY_ID_REQUEST:
      return { loading: true,server:{} };
    case GET_SERVER_BY_ID_SUCCESS:
      return { loading: false, server: action.payload };
    case GET_SERVER_BY_ID_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getServerByBrokerReducer = ( state = { loading: false, servers: [] }, action: { type: any; payload: any; error?: string }) => {
  switch (action.type) {
    case GET_SERVERS_BY_BROKER_REQUEST:
      return { ...state, loading: true,servers:[] };
    case GET_SERVERS_BY_BROKER_SUCCESS:
      return { ...state, loading: false, servers: action.payload };
    case GET_SERVERS_BY_BROKER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const createServerReducer = (
  state: CreateServerState = { loading: false, server: {uid:"",broker:"",server:""} },
  action: { type: string; payload: Server; error?: string }
): CreateServerState => {
  switch (action.type) {
    case CREATE_SERVER_REQUEST:
      return { ...state, loading: true };
    case CREATE_SERVER_SUCCESS:
      return { ...state, loading: false, success: true, server: action.payload };
    case CREATE_SERVER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
export const updateServerReducer = (
  state: UpdateServerState = { loading: false,server: {uid:"",broker:"",server:""}},
  action: { type: string; payload: Server; error?: string }
): UpdateServerState => {
  switch (action.type) {
    case UPDATE_SERVER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SERVER_SUCCESS:
      return { ...state, loading: false, success: true, server: action.payload };
    case UPDATE_SERVER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const deleteBrokerReducer = (
  state: DeleteServerState = { loading: false },
  action: { type: string; error?: string }
): DeleteServerState => {
  switch (action.type) {
    case DELETE_SERVER_REQUEST:
      return { ...state, loading: true };
    case DELETE_SERVER_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_SERVER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
