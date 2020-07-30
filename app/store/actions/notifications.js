import { 
  SET_NOTIFY,
  CLEAR_NOTIFY,
  SHOW_NOTIFY,
  SET_TOKEN,
} from './types';

export const setNotify = (payload) => ({ type: SET_NOTIFY, payload });
export const clearNotify = () => ({ type: CLEAR_NOTIFY });
export const showNotify = (payload) => ({ type: SHOW_NOTIFY, payload });
export const setToken = (payload) => ({ type: SET_TOKEN, payload });