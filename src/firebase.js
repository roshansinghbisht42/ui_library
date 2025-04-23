// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw_24XKFVyL2BVNBp_bS4LT7CB2HFbuco",
  authDomain: "kainchiconnection.firebaseapp.com",
  projectId: "kainchiconnection",
  storageBucket: "kainchiconnection.appspot.com",
  messagingSenderId: "808968589564",
  appId: "1:808968589564:web:d7f8eed07031bf64fc8779",
  measurementId: "G-BK3KYT307C"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
