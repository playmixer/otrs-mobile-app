import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAV_S7DPz6uXuUa-kUZ6SOpHNQoHQYvL78",
  authDomain: "otrs-mobile-oilpc.firebaseio.com",
  databaseURL: "https://otrs-mobile-oilpc.firebaseio.com",
  projectId: "otrs-mobile-oilpc",
  storageBucket: "otrs-mobile-oilpc.appspot.com",
  messagingSenderId: "346744559564"
}

firebase.initializeApp(firebaseConfig)

export default database = firebase.database()
