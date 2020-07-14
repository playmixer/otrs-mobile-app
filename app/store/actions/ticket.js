import * as ticketApi from '../../api_client/ticket'

import {
  STORE_USER_TICKETS,
} from './types'

export const storeUserTickets = (payload) => ({ type: STORE_USER_TICKETS, payload})

export const getTicketByUser = (payload) => (dispatch) => {
  // const ticketIdList = ticketApi.getTicketsByUser({ userID: payload.userID, basic: payload.basic })
  //   .then((res) => {
  //     return res.data.Data
  //   })
  //   .catch((err) => {
  //     return []
  //   })
}
