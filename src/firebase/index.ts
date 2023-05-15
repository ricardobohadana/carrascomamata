// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKYq-jLvtY_P0nqPXKSMcEmTXCCwIVNnA',
  authDomain: 'novocarrascomamata.firebaseapp.com',
  databaseURL: 'https://novocarrascomamata.firebaseio.com',
  projectId: 'novocarrascomamata',
  storageBucket: 'novocarrascomamata.appspot.com',
  messagingSenderId: '1054983053418',
  appId: '1:1054983053418:web:0c79e6b7cb9e8ef3a92a13',
  measurementId: 'G-DDVPHNKSTD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const professorsCollectionReference = collection(db, 'professors')
export const feedbackCollectionReference = collection(db, 'feedbacks')
