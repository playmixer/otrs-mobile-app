import {
  ADD_ERROR_ITEM,
  ERROR_CLEAR
} from '../actions/types'

export default function errorRreduser( state = {}, action) {
  switch(action.type) {
    case ADD_ERROR_ITEM:
      state = {
        ...state,
        ...action.payload
      }
      return state
    
    case ERROR_CLEAR:
      state = {
        ...state
      }
      delete state[action.payload]
      return state
    
    default:
      state = {...state}
      return state
  }
}