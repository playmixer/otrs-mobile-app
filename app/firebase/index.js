import firebase from 'firebase'
import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig)

export default firebaseApp = firebase
// export const database = firebase.database()
// export const admin = firebase.admin
