// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvA0FsfzHiKDFFm9asQYFW1yqWaD3O3A4",
  authDomain: "aquazenith-1f075.firebaseapp.com",
  projectId: "aquazenith-1f075",
  storageBucket: "aquazenith-1f075.appspot.com",
  messagingSenderId: "869872512942",
  appId: "1:869872512942:web:eb38480a89d3bacf35e23f",
  measurementId: "G-4NNKW1S0NY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)