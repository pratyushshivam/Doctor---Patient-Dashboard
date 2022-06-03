import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAk-JSRnalC6YOdxwXUat65BjcLxkr38Ec",
    authDomain: "kiitmajorprojecct.firebaseapp.com",
    projectId: "kiitmajorprojecct",
    storageBucket: "kiitmajorprojecct.appspot.com",
    messagingSenderId: "374300563157",
    appId: "1:374300563157:web:9c4e6d2133086ccd3c745c",
    measurementId: "G-K53WMHT0CX"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db