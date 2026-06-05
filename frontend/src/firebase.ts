import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNgUi1VvHM5uIGBGsi626eJHozhVSiD2I",
  authDomain: "nextchamp-c46a4.firebaseapp.com",
  projectId: "nextchamp-c46a4",
  storageBucket: "nextchamp-c46a4.firebasestorage.app",
  messagingSenderId: "474670169026",
  appId: "1:474670169026:web:1824e06c84414134da745b",
  measurementId: "G-C17KY9ZHYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
