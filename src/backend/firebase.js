import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAKYq-jLvtY_P0nqPXKSMcEmTXCCwIVNnA",
  authDomain: "novocarrascomamata.firebaseapp.com",
  databaseURL: "https://novocarrascomamata.firebaseio.com",
  projectId: "novocarrascomamata",
  storageBucket: "novocarrascomamata.appspot.com",
  messagingSenderId: "1054983053418",
  appId: "1:1054983053418:web:0c79e6b7cb9e8ef3a92a13",
  measurementId: "G-DDVPHNKSTD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
