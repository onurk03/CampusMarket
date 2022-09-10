// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY8rihyngnmJ1A0xejgU6QGvPPmITMTCk",
  authDomain: "campus-market-d1b22.firebaseapp.com",
  projectId: "campus-market-d1b22",
  storageBucket: "campus-market-d1b22.appspot.com",
  messagingSenderId: "124383459101",
  appId: "1:124383459101:web:38b742db884caa473953f4",
  measurementId: "G-FHPPD23KP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
