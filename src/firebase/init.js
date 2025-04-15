import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database'; // ✅ add this for Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAVdcjAxZqTs-Nf4r88le9hLp1irAwstdI",
  authDomain: "vue-blog-cms.firebaseapp.com",
  databaseURL: "https://vue-blog-cms-default-rtdb.firebaseio.com",
  projectId: "vue-blog-cms",
  storageBucket: "vue-blog-cms.appspot.com", // fixed this
  messagingSenderId: "225154203353",
  appId: "1:225154203353:web:67f0aac00778cc67c048c8",
  measurementId: "G-XEK5TJJ3MD"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()

export { auth }