import {
  STORE_USER_TICKET_LIST,
  STORE_TICKET_ITEM,
  STORE_TICKET_LIST,
  SET_SIZE_PAGE_USER_TICKETS,
  SET_SIZE_PAGE,
  TICKET_VIEW_CLEANUP
} from '../actions/types'

const list = {
  items: [],
  pageSize: 10
}

const config = {
  listByUser: {...list},
  list: {...list},
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
          ...state.listByUser,
          items: action.payload
        }
      }

      return state

    case STORE_TICKET_LIST:
      state = {
        ...state,
        list: {
          ...state.list,
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

    case SET_SIZE_PAGE_USER_TICKETS:
      state = {
        ...state,
        listByUser: {
          ...state.listByUser,
          pageSize: action.payload
        }
      }

      return state

      case SET_SIZE_PAGE:
        state = {
          ...state,
          list: {
            ...state.list,
            pageSize: action.payload
          }
        }

        return state

      case TICKET_VIEW_CLEANUP:
        state = {
          ...state,
          viewItems: {}
        }

    default:
      return state
  }
}