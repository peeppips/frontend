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
} from './reducers/referralReducers';
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
  deleteReferral: deleteReferralReducer
  
})



// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null


// const initialState = {
//   // cart: {
//   //   cartItems: cartItemsFromStorage,
//   //   shippingAddress: shippingAddressFromStorage,
//   // },
//   userLogin: { userInfo: userInfoFromStorage },
// }

const middleware = [thunk]

const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store


export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state