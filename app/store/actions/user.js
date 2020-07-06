import { generationBasic } from '../../utils/account';
import * as accountApi from '../../api_client/account';

import {
  LOGOUT,
  SIGN_IN_ERROR,
  STORE_ACCOUNT_BASIC,
} from './types';

export const logout = () => ({ type: LOGOUT });
export const login = (payload) => ({ type: STORE_ACCOUNT_BASIC, payload });
export const signInError = () => ({ type: SIGN_IN_ERROR });

export const userLogin = (payload) => (dispatch) => {
  const basic = generationBasic(payload.username, payload.password);

  accountApi.getUserData({ basic: basic })
    .then((res) => {
      const data = res.data.Data;
      dispatch(login({
        basic: basic,
        model: {
          login: data[23],
          email: data[37],
          lastName: data[13],
          firstName: data[45],
          id: data[41],
        }
      }));
    })
    .catch((err) => {
      dispatch(logout());
      dispatch(signInError());
    })
}

export const userLogout = () => (dispatch) => {
  dispatch(logout());
}
