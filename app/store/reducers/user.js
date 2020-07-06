import { AsyncStorage } from 'react-native';

import {
  LOGOUT,
  SIGN_IN_ERROR,
  STORE_ACCOUNT_BASIC,
} from '../actions/types';

const config = {
  isAuth: false,
  isAuthError: false,
}
const auth = AsyncStorage.getItem('auth');

const initialState = auth ? auth : {
  ...config,
}

export default function userReducer (state = {...initialState}, action) {
  switch(action.type){
    case STORE_ACCOUNT_BASIC:
      state = {
        ...state,
        ...action.payload,
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

    default:
      state = {
        ...state,
      }
      return state
  }
}