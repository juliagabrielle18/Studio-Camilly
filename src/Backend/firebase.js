// src/Backend/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaoGBTqSKWUdjFQsaVWKXHGaUrJ62C64w",
  authDomain: "studiocamilly-d2cb0.firebaseapp.com",
  projectId: "studiocamilly-d2cb0",
  storageBucket: "studiocamilly-d2cb0.appspot.com",
  messagingSenderId: "737695216165",
  appId: "1:737695216165:web:6e77d158885e6e5dcd45cc",
  measurementId: "G-DH4YBZP2DX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
