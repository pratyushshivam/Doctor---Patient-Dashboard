import axios from 'axios';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGGED_IN,
  AUTH_ERROR,
  LOG_OUT,
} from './types';

import {
  BASE_URL,
  REGISTER,
  STATUS,
  LOGIN,
  LOGOUT,
} from '../../constants';
import * as Actions from '../../api/index'
export const SIGN_UP_LOADING = 'SIGN_UP_LOADING'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const LOG_IN_LOADING='LOG_IN_LOADING'
export const LOG_IN_SUCCESS='LOG_IN_SUCCESS'
export const LOG_IN_ERROR='LOG_IN_ERROR'


export const loggedIn = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${STATUS}`, {
      withCredentials: true,
    });
    if (response.data.logged_in) {
      dispatch({
        type: LOGGED_IN,
        payload: response.data.user,
      });
    }
    localStorage.setItem('isLoggedIn', true);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setAlert(`${error}`, 'danger'));
    localStorage.setItem('isLoggedIn', false);
  }
};

// Register
export const register = ({
  name,
  email,
  password,
  password_confirmation,
}) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${REGISTER}`,
      {
        user: {
          name,
          email,
          password,
          password_confirmation,
        },
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.status === 'created') {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
      dispatch(loggedIn);
      localStorage.setItem('isLoggedIn', true);
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
    dispatch({ type: REGISTER_FAIL });
    localStorage.setItem('isLoggedIn', false);
  }
};

// Login
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${LOGIN}`,
      {
        user: {
          email,
          password,
        },
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.status === 'created') {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      dispatch(loggedIn);
      localStorage.setItem('isLoggedIn', true);
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
    dispatch({ type: LOGIN_FAIL });
    localStorage.setItem('isLoggedIn', false);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${LOGOUT}`, {
      withCredentials: true,
    });
    dispatch({ type: LOG_OUT });
    localStorage.setItem('isLoggedIn', false);
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
    localStorage.setItem('isLoggedIn', false);
  }
};



export const signUpUser = (email, password) => {
    return async function (dispatch) {
        try {
            dispatch({ type: SIGN_UP_LOADING })
            const response = await Actions.signUp(email, password)
            if (response) {
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: response,
                })
            } else {
                dispatch({ type: SIGN_UP_ERROR })
            }
        } catch (error) {
            dispatch({
                type: SIGN_UP_ERROR,
                payload: { message: 'Some error while fetching data' },
            })
            console.log(error)
        }
    }
}

export const loginUser=(email,password)=>{
    return async function(dispatch){
        try{
            dispatch({type:LOG_IN_LOADING})
            const response=await Actions.login(email,password)
            if(response){
                dispatch({
                    type:LOG_IN_SUCCESS,
                    payload:response,
                    email:email
                })
                return response
            }else{
                dispatch({type:LOG_IN_ERROR})
                return new Error()
            }
        }catch(error){
            dispatch({
                type: LOG_IN_ERROR,
                payload: { message: 'Some error while fetching existed user data' },
            })
            return new Error()
            console.log(error)
        }
    }
    
}
