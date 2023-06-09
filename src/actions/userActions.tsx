import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_REGISTER_FAIL
} from '../constants/userConstants'
import { Dispatch, AnyAction } from 'redux';

import { useDispatch } from 'react-redux';




export const login = (loginB: { email: string, password: string }) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      loginB,
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

    
  } catch (error) {
   
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}




export const logout = () => {
  localStorage.clear();
  return {
    type: USER_LOGOUT
  };

};

export const register = (userInfoDetails:{firstName:string, secondName:string, email:string,  password:string}) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    console.log(userInfoDetails)

    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }


    const { data } = await axios.post(
      'https://peeppipsbackend.onrender.com/api/users',
      userInfoDetails,
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    // document.location.pathname = '/';
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_REGISTER_FAIL,

      payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    })
  }
}

export const getUserDetails = (email:string) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/users/${email}`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
}

export const updateUserProfile = (user:{}) => async (dispatch: Dispatch<AnyAction>, getState:any) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      const dispatch: Dispatch<any> = useDispatch();
      dispatch<any>(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
  
}

export const listUsers = () => async (dispatch: Dispatch<AnyAction>, getState:any) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`https://peeppipsbackend.onrender.com/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      const dispatch: Dispatch<any> = useDispatch();
      dispatch<any>(logout());    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
  
}

export const deleteUser = (id:string) => async (dispatch: Dispatch<AnyAction>, getState:any) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`https://peeppipsbackend.onrender.com/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      const dispatch: Dispatch<any> = useDispatch();
      dispatch<any>(logout());    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
  
}

export const updateUser = (user: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

   


    const { data } = await axios.put(`https://peeppipsbackend.onrender.com/api/users/${user._id}`, user);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      const dispatch: Dispatch<any> = useDispatch();
      dispatch<any>(logout());
        }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
