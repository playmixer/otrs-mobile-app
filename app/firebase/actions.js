import database from './index'
import { getToken } from '../notifications/index'

export async function checkSubsription({ userID }) {
  return database.ref('/subscribers/' +userID).once('value')
}

export function subscribe({ userID, userName, tickets }) {
  const token = getToken()

  database.ref('/subscribers/' +userID).set({
    expoToken: token,
    userName: userName,
    tickets: tickets
  })
}

export function unSubscribe({ userID }) {
  database.ref('/subscribers/' + userID).remove()
}


export const updateTicketListByUser = function({ userID, tickets }) {
  update = {}
  update[`/subscribers/${userID}/tickets`] = tickets
  database.ref().update(update)
}
