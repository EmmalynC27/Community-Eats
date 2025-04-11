// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm-NLOnjKBF_AeM49QkQRtL65ueC7f4ig",
  authDomain: "community-eats.firebaseapp.com",
  databaseURL: "https://community-eats-default-rtdb.firebaseio.com",
  projectId: "community-eats",
  storageBucket: "community-eats.firebasestorage.app",
  messagingSenderId: "136821069575",
  appId: "1:136821069575:web:3a603f2fe0aae1120c97a2",
  measurementId: "G-5WPGML84QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getDatabase(app);

export { app, auth, googleProvider, db,  signInWithPopup };