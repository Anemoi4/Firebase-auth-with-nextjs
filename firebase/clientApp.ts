import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcohC6jgXtejQsC2H8xRRGZq-c5X4DcPk",
  authDomain: "music-app-b6e30.firebaseapp.com",
  projectId: "music-app-b6e30",
  storageBucket: "music-app-b6e30.appspot.com",
  messagingSenderId: "788264538920",
  appId: "1:788264538920:web:238e7005ae92074f69361d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
