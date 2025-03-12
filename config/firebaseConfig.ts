// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import admin, { auth } from "firebase-admin";
import dotenv from "dotenv";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import serviceAccount from "./../service-account-file.json";

dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};
console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL,
});

const db = getFirestore(app);

// if (process.env.APP_MODE != "production") {
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);
//   connectAuthEmulator(getAuth(), "http://127.0.0.1:9099");
// }

export { app, admin, db };
