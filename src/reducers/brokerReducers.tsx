import {
  GET_ALL_BROKERS_REQUEST,
  GET_ALL_BROKERS_SUCCESS,
  GET_ALL_BROKERS_FAILURE,
  GET_BROKER_BY_ID_REQUEST,
  GET_BROKER_BY_ID_SUCCESS,
  GET_BROKER_BY_ID_FAILURE,
  CREATE_BROKER_REQUEST,
  CREATE_BROKER_SUCCESS,
  CREATE_BROKER_FAILURE,
  UPDATE_BROKER_REQUEST,
  UPDATE_BROKER_SUCCESS,
  UPDATE_BROKER_FAILURE,
  DELETE_BROKER_REQUEST,
  DELETE_BROKER_SUCCESS,
  DELETE_BROKER_FAILURE,
} from '../constants/brokerConstants';

interface Broker {
  // Define the properties of the broker object
  // according to your application's requirements
  // For example:
  id: string;
  uid:string;
  name: string;
  country:string;
  regulations:string;
  servers:any[];
  
  // ...
}

interface AllBrokersState {
  loading: boolean;
  brokers: Broker[];
  error?: string;
}

interface BrokerByIdState {
  loading: boolean;
  broker: Broker;
  error?: string;
}

interface CreateBrokerState {
  loading: boolean;
  success?: boolean;
  broker: Broker;
  error?: string;
}

interface UpdateBrokerState {
  loading: boolean;
  success?: boolean;
  broker: Broker;
  error?: string;
}

interface DeleteBrokerState {
  loading: boolean;
  success?: boolean;
  error?: string;
}

export const getAllBrokersReducer = (
  state: AllBrokersState = { loading: false, brokers: [] },
  action: { type: string; payload: Broker[]; error?: string }
): AllBrokersState => {
  switch (action.type) {
    case GET_ALL_BROKERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_BROKERS_SUCCESS:
      return { ...state, loading: false, brokers: action.payload };
    case GET_ALL_BROKERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const getBrokerByIdReducer = (
  state: BrokerByIdState = { loading: false, broker: {id:"",uid:"",name:"",country:"",regulations:"",servers:[]} },
  action: { type: string; payload: Broker; error?: string }
): BrokerByIdState => {
  switch (action.type) {
    case GET_BROKER_BY_ID_REQUEST:
      return { ...state, loading: true, broker: {id:"",uid:"",name:"",country:"",regulations:"",servers:[]} };
    case GET_BROKER_BY_ID_SUCCESS:
      return { ...state, loading: false, broker: action.payload };
    case GET_BROKER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const createBrokerReducer = (
  state: CreateBrokerState = { loading: false, broker: {id:"",uid:"",name:"",country:"",regulations:"",servers:[]} },
  action: { type: string; payload: Broker; error?: string }
): CreateBrokerState => {
  switch (action.type) {
    case CREATE_BROKER_REQUEST:
      return { ...state, loading: true };
    case CREATE_BROKER_SUCCESS:
      return { ...state, loading: false, success: true, broker: action.payload };
    case CREATE_BROKER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
export const updateBrokerReducer = (
  state: UpdateBrokerState = { loading: false, broker: {id:"",uid:"",name:"",country:"",regulations:"",servers:[]} },
  action: { type: string; payload: Broker; error?: string }
): UpdateBrokerState => {
  switch (action.type) {
    case UPDATE_BROKER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BROKER_SUCCESS:
      return { ...state, loading: false, success: true, broker: action.payload };
    case UPDATE_BROKER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const deleteBrokerReducer = (
  state: DeleteBrokerState = { loading: false },
  action: { type: string; error?: string }
): DeleteBrokerState => {
  switch (action.type) {
    case DELETE_BROKER_REQUEST:
      return { ...state, loading: true };
    case DELETE_BROKER_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_BROKER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
