import {
  STORE_USER_TICKET_LIST,
  STORE_TICKET_ITEM,
  STORE_TICKET_LIST
} from '../actions/types'

const config = {
  listByUser: {
    items: []
  },
  list: {
    items: []
  },
  viewItems: {}
}

const initialState = {
  ...config
}

export default function ticketReducer( state = {...initialState}, action) {
  switch(action.type) {
    case STORE_USER_TICKET_LIST:
      state = {
        ...state,
        listByUser: {
          items: action.payload
        }
      }

      return state

    case STORE_TICKET_LIST:
      state = {
        ...state,
        list: {
          items: action.payload
        }
      }

      return state

    case STORE_TICKET_ITEM:
      state = {
        ...state,
        viewItems: {
          ...state.viewItems,
          [action.payload.id]: action.payload
        }
      }

      return state

    default:
      return state
  }
}