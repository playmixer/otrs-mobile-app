import * as ticketApi from '../../api_client/ticket'

import { formattingData } from '../../formatters/api'

import {
  STORE_USER_TICKET_LIST,
  STORE_TICKET_ITEM,
  STORE_TICKET_LIST,
} from './types'

export const storeTicketListByUser = (payload) => ({ type: STORE_USER_TICKET_LIST, payload})
export const storeTicketList = (payload) => ({ type: STORE_TICKET_LIST, payload})
export const storeTicketItem = (payload) => ({ type: STORE_TICKET_ITEM, payload})

export const getTicketsByUser = (payload) => (dispatch) => {  
  ticketApi.getTicketsByUser({ userID: payload.userID, basic: payload.basic })
    .then(res => {
      dispatch(storeTicketListByUser(res.data.Data))
    })
    .catch(err => {
    })
}

export const getTickets = (payload) => (dispatch) => {  
  ticketApi.openedTickets({ userID: payload.userID, basic: payload.basic })
    .then(res => {
      dispatch(storeTicketList(res.data.Data))
    })
    .catch(err => {
    })
}

export const getTicket = (payload) =>  (dispatch) => {
  const ticketList = ticketApi.ticketGet({ id: payload.id, basic: payload.basic })  
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

  Promise.all([ticketList])
    .then((res) => {
      const ticket = formattingData(res[0].value)
      dispatch(storeTicketItem({
        id: ticket.TicketID,
        number: ticket.TicketNumber,
        title: ticket.Title,
        owner: ticket.Owner,
        type: ticket.Type,
        service: ticket.Service,
        created: ticket.Created,
      }))
    })
    .catch(err => {
      console.log(err)
    })

}
