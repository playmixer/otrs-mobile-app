import { AsyncStorage } from 'react-native';

import {
  LOGOUT,
  SIGN_IN_ERROR,
  STORE_SAVE_ACCOUNT,
  STORE_UPDATE_ACCOUNT,
} from '../actions/types';

const config = {
  isAuth: false,
  isAuthError: false,
}

const initialState = {
  ...config,
}

export default function userReducer (state = {...initialState}, action) {
  switch(action.type){
    case STORE_SAVE_ACCOUNT:
      state = {
        ...state,
        ...action.payload,
        isAuthError: false,
        isAuth: true,        
      }

      AsyncStorage.setItem('auth', JSON.stringify(state));
      return state

    case LOGOUT:
      state = {
        ...config
      }
      AsyncStorage.removeItem('auth');
      return state

    case SIGN_IN_ERROR:
      state = {
        ...state,
        isAuthError: true,
      }
      return state

    case STORE_UPDATE_ACCOUNT:
      state = {
        ...action.payload
      }
      return state

    default:
      state = {
        ...state,
      }
      return state
  }
}