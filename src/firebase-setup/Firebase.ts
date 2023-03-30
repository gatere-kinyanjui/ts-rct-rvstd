// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKoQJ3gkJz280Ajud2Xw416lO3sitUlqM",
  authDomain: "todo-rvstd.firebaseapp.com",
  projectId: "todo-rvstd",
  storageBucket: "todo-rvstd.appspot.com",
  messagingSenderId: "351823376805",
  appId: "1:351823376805:web:cc1debb83388be071eb84c",
  measurementId: "G-1C55GMSVME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
