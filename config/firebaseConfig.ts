// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzB8O237iYD6z9rrbuFK0NwP96IxDhBdg",
  authDomain: "ebuddy-test-7f4bb.firebaseapp.com",
  projectId: "ebuddy-test-7f4bb",
  storageBucket: "ebuddy-test-7f4bb.firebasestorage.app",
  messagingSenderId: "1084348078074",
  appId: "1:1084348078074:web:20bf97460b605f65897643",
  measurementId: "G-102B5H4YZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "ebuddy-test-7f4bb",
  databaseURL: "https://ebuddy-test-7f4bb.firebaseio.com",
});
// export const analytics = getAnalytics(app);
// admin.appCheck();

const db = getFirestore(app);

export { app, admin, db };
