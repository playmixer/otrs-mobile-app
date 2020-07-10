
import { AsyncStorage } from 'react-native';

import { generationBasic } from '../../utils/account';
import * as accountApi from '../../api_client/account';

import {
  LOGOUT,
  SIGN_IN_ERROR,
  STORE_SAVE_ACCOUNT,
  STORE_UPDATE_ACCOUNT
} from './types';

export const logout = () => ({ type: LOGOUT });
export const login = (payload) => ({ type: STORE_SAVE_ACCOUNT, payload });
export const signInError = () => ({ type: SIGN_IN_ERROR });
export const updateStorage = (payload) => ({type: STORE_UPDATE_ACCOUNT, payload})

const formattingData = (data) => {
  let res = {}
  data.map((value, index, arr) => {
    if (index % 2 == 0) {
      res[value] = arr[index + 1]
    }
  })
  return res
}

export const userLogin = (payload) => (dispatch) => {
  const basic = generationBasic(payload.username, payload.password);

  const userData = accountApi.getUserData({ basic: basic })
    .then((res) => {
      return {
        status: res.status,
        value: res.data.Data
      }
    })
    .catch((err) => {
      return {
        status: err.response.status,
        value: null
      }
    })
  
  Promise.all([userData])
    .then(res => {
      const data = res[0]
      if (data.status == 200) {
        const dataFormated = formattingData(data.value) 

        return dispatch(login({
          basic: basic,
          model: {
            login: dataFormated.UserLogin,
            email: dataFormated.UserEmail,
            lastName: dataFormated.UserLastname,
            firstName: dataFormated.UserFirstname,
            id: dataFormated.UserID,
          },
          lastLogin: new Date(),
        }));
      }

      if (data.status == 401) {
        dispatch(logout())
        dispatch(signInError())
        return
      }
    
    })
}

export const userLogout = () => (dispatch) => {
  dispatch(logout());
}

export const getAsyncStorage = () => (dispatch) => {
  AsyncStorage.getItem('auth')
    .then(res => {
      if (res) {
        dispatch(updateStorage({...JSON.parse(res)}))
      }
    })
    .catch(err => {
      console.log(err)
    })
}