import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyBab-o_NjuDkmpCKdfT01yneZ6_wluTuAs",
  authDomain: "proyecto3-paradigmas.firebaseapp.com",
  projectId: "proyecto3-paradigmas",
  storageBucket: "proyecto3-paradigmas.appspot.com",
  messagingSenderId: "347381986684",
  appId: "1:347381986684:web:a300ff7d8d521d79ffa0f9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()