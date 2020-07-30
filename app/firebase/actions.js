import firebaseApp from './index'

const database = firebaseApp.database()

export async function checkSubsription({ userID }) {
  return database.ref('/subscribers/' +userID).once('value')
}

export function subscribe({ userID, userName, tickets, token }) {

  database.ref('/subscribers/' +userID).set({
    expoToken: token,
    userName: userName,
    tickets: tickets
  })
}

export function unSubscribe({ userID }) {
  database.ref('/subscribers/' + userID).remove()
}


export function updateTicketListByUser({ userID, tickets }) {
  update = {}
  update[`/subscribers/${userID}/tickets`] = tickets
  database.ref().update(update)
}
