import api_request from './api_request';

export async function openedTickets(config) {
  const queueIDs = JSON.stringify(config.queueIDs);

  return api_request({
    method: "GET",
    query: `Object=TicketObject&Method=TicketSearch&Data={"StateType":"open","Result":"ARRAY","QueueIDs":${queueIDs}}`,
    basic: config.basic
  })
}

export async function ticketGet(config) {
  return api_request({
    method: "GET",
    query: `Object=TicketObject&Method=TicketGet&Data={"TicketID":${config.id}}`,
    basic: config.basic
  })
}