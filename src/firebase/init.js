import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database'; // ✅ add this for Realtime Database

// First Firebase config
const firebaseConfig1 = {
  apiKey: "AIzaSyAVdcjAxZqTs-Nf4r88le9hLp1irAwstdI",
  authDomain: "vue-blog-cms.firebaseapp.com",
  databaseURL: "https://vue-blog-cms-default-rtdb.firebaseio.com",
  projectId: "vue-blog-cms",
  storageBucket: "vue-blog-cms.appspot.com", // fixed this
  messagingSenderId: "225154203353",
  appId: "1:225154203353:web:67f0aac00778cc67c048c8",
  measurementId: "G-XEK5TJJ3MD"
};

// Second Firebase config
const firebaseConfig2 = {
  apiKey: "AIzaSyArLSy2JpTB8wa5LO1Bwyu9UFlPgqM6FzQ",
  authDomain: "dental-f314c.firebaseapp.com",
  databaseURL: "https://dental-f314c-default-rtdb.firebaseio.com",
  projectId: "dental-f314c",
  storageBucket: "dental-f314c.firebasestorage.app",
  messagingSenderId: "57734486457",
  appId: "1:57734486457:web:7a1eab0303f514013a7e68",
  measurementId: "G-V7EWXZ5YEC"
};

// Initialize Firebase apps
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig1); // First app
  firebase.initializeApp(firebaseConfig2, 'secondApp'); // Second app with a different name
}

// Initialize auth for the default app
const auth1 = firebase.auth(); // Auth for the first app

// Initialize auth for the second app
const auth2 = firebase.app('secondApp').auth(); // Auth for the second app

// Access Realtime Database from both apps
const db1 = firebase.database(); // First Realtime Database
const db2 = firebase.database(firebase.app('secondApp')); // Second Realtime Database

export { auth1, auth2, db1, db2 };