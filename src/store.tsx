import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userReferralsReducer,
} from './reducers/userReducers'

import {
  getAllBrokersReducer,
  getBrokerByIdReducer,
  createBrokerReducer,
  updateBrokerReducer,
  deleteBrokerReducer,
} from './reducers/brokerReducers';

import {
  getAllProjectsReducer,
  getProjectByIdReducer,
  createProjectReducer,
  updateProjectReducer,
  deleteProjectReducer,
  getProjectByUserReducer,
} from './reducers/projectReducers';

import {
  createReferralReducer,
  getAllReferralsReducer,
  getReferralByIdReducer,
  updateReferralReducer,
  deleteReferralReducer,
  getReferralByUserReducer
} from './reducers/referralReducers';

// Import the account reducers
import {
  getAllAccountsReducer,
  getAccountByUuidReducer,
  createAccountReducer,
  deleteAccountReducer,
  getAccountsByUserReducer,
  updateAccountReducer
} from './reducers/accountReducers';
import { createServerReducer, getAllServersReducer, getServerByBrokerReducer, getServerByUidReducer } from './reducers/serverReducers';


import {
  getAllCreditsReducer,
  getCreditByUuidReducer,
  createCreditReducer,
  deleteCreditReducer,
  getCreditsByUserReducer,
} from './reducers/creditReducers';

const reducer = combineReducers({

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userReferrals: userReferralsReducer,

  projectList: getAllProjectsReducer,
  projectDetails: getProjectByIdReducer,
  projectCreate: createProjectReducer,
  projectUpdate: updateProjectReducer,
  projectDelete: deleteProjectReducer,
  projectListByUser: getProjectByUserReducer,

  allBrokers: getAllBrokersReducer,
  brokerById: getBrokerByIdReducer,
  createBroker: createBrokerReducer,
  updateBroker: updateBrokerReducer,
  deleteBroker: deleteBrokerReducer,

  createReferral: createReferralReducer,
  allReferrals: getAllReferralsReducer,
  referralById: getReferralByIdReducer,
  updateReferral: updateReferralReducer,
  deleteReferral: deleteReferralReducer,
  referralListByUser : getReferralByUserReducer,

  allAccounts: getAllAccountsReducer,
  accountByUuid: getAccountByUuidReducer,
  createAccount: createAccountReducer,
  deleteAccount: deleteAccountReducer,
  accountByUser: getAccountsByUserReducer,
  updateAccount: updateAccountReducer,

  allServers: getAllServersReducer,
  serverByUuid: getServerByUidReducer,
  createServer: createServerReducer,
  updateServer : deleteBrokerReducer,
  deleteServer: deleteBrokerReducer,
  serverByBroker: getServerByBrokerReducer,
  

  allCredits: getAllCreditsReducer,
  creditByUuid: getCreditByUuidReducer,
  createCredit: createCreditReducer,
  deleteCredit: deleteCreditReducer,
  creditsByUser: getCreditsByUserReducer

})



const userInfoFromStorageString = localStorage.getItem('userInfo');

let userInfoFromStorage = null;
if (userInfoFromStorageString) {
  try {
    userInfoFromStorage = JSON.parse(userInfoFromStorageString);
  } catch (error) {
    console.error('Error parsing user info from localStorage:', error);
  }
}



const initialState: {
  userLogin?: any;
  userRegister?: undefined;
  userDetails?: undefined;
  userUpdateProfile?: {} | undefined;
  userList?: undefined;
  userDelete?: {} | undefined;
  userUpdate?: undefined;
  userReferrals?: undefined;
  // ... add other properties if needed
} = {};

if (userInfoFromStorage) {
  initialState.userLogin = { userInfo: userInfoFromStorage };
} else {
  initialState.userLogin = { userInfo: null };
}



const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store


export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state