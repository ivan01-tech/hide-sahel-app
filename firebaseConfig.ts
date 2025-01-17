import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI8B4a-qwaLcz1Qrbwuzzs5D892PFiveo",
  authDomain: "sahel-app-447210.firebaseapp.com",
  projectId: "sahel-app-447210",
  storageBucket: "sahel-app-447210.firebasestorage.app",
  messagingSenderId: "226794596799",
  appId: "1:226794596799:web:e8d89a96b9237c4b11990a",
  measurementId: "G-BWJ0HENBKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { auth, database, app };
