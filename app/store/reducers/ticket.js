import {
  STORE_USER_TICKETS
} from '../actions/types'

const config = {
  userTickets: {
    items: [],
    chosedItem: null,
  },
}

const initialState = {
  ...config
}

export default function ticketReducer( state = {...initialState}, action) {
  switch(action.type) {
    case STORE_USER_TICKETS:
      let storeTickets = config
      storeTickets.items = action.payload
      
      state = {
        ...state,
        ...storeTickets,
      }

      return state

    default:
      return state
  }
}