import firebase from "firebase";

let config = {
  apiKey: "AIzaSyDt8PkaeIRweTCNOv7ratnfW13kgHuQNdY",
  authDomain: "escape-the-core.firebaseapp.com",
  databaseURL: "https://escape-the-core.firebaseio.com",
  projectId: "escape-the-core",
  storageBucket: "",
  messagingSenderId: "855395305407"
};
const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.database()

export default db
