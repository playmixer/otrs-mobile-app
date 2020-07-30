import * as navigation from '../../utils/navigation';

import { 
  SET_NOTIFY,
  CLEAR_NOTIFY,
  SHOW_NOTIFY,
  SET_TOKEN
} from '../actions/types';

const initialState = {
  notify: false,
  token: ''
}

export default function notificationReducer (state = {...initialState}, action) {
  switch(action.type){
    case SET_NOTIFY:
      state = {
        ...state,
        notify: action.payload,
      }
      return state;
    
    case CLEAR_NOTIFY:
      state = {
        ...state,
        notify: false,
      }
      return state;

    case SHOW_NOTIFY:
      navigation.navigate("ArticleListView", {
        ticketID: state.notify.data.ticketID
      });
      state = {
        ...state,
        notify: false,
      }
      return state

    case SET_TOKEN:
      state = {
        ...state,
        token: action.payload
      }
      return state

    default:
      return state;
  }
}