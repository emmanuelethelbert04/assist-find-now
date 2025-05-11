
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBshYhKk79-RLKsFf-SDYAPzGhqRUs66vA",
  authDomain: "service-connect-93a32.firebaseapp.com",
  projectId: "service-connect-93a32",
  storageBucket: "service-connect-93a32.firebasestorage.app",
  messagingSenderId: "427349700041",
  appId: "1:427349700041:web:e154287195c1a1c9b88c18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
