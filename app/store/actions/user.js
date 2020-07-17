import { AsyncStorage } from 'react-native'

import * as accountApi from '../../api_client/account'

import { generationBasic } from '../../utils/account'

import { formattingData } from '../../formatters/api'

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

export const userLogin = (payload) => (dispatch) => {
  const basic = generationBasic(payload.username, payload.password);

  const userData = accountApi.getUserData({ basic: basic })
    .then((res) => {
      return {
        status: res.status,
        value: res.data.Data
      }
    })
    .catch(() => {
      dispatch(logout())
      dispatch(signInError())
    })

  Promise.all([userData])
    .then(res => {
      const data = res[0]
      if (data?.status == 200) {
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
    .catch()
}