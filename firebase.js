// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuyIUjumUpZI-lUQ0nu26Kfc4ZhES1YG4",
  authDomain: "verdi-firebase.firebaseapp.com",
  projectId: "verdi-firebase",
  storageBucket: "verdi-firebase.appspot.com",
  messagingSenderId: "342273801126",
  appId: "1:342273801126:web:d4617ae45a9de745a16d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//inserted after app is initialized, no plate = no dish
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };