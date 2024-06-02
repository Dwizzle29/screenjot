import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwf26DM3lE3DMuogMfIYdZPJT1Clrtu7A",
  authDomain: "screenjot-ddb63.firebaseapp.com",
  databaseURL:
    "https://screenjot-ddb63-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "screenjot-ddb63",
  storageBucket: "screenjot-ddb63.appspot.com",
  messagingSenderId: "158495063890",
  appId: "1:158495063890:web:be19aba201dfb05d0c048b",
  measurementId: "G-BSFP0DNSNC",
};

// init firebase
initializeApp(firebaseConfig);

// init & export firestore service
export const db = getFirestore();
// generate & export auth object
export const auth = getAuth();
