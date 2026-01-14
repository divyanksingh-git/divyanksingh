// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  getDatabase, 
  ref, 
  onValue,        // <--- Add this
  runTransaction  // <--- Add this
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL // Critical for View Counter
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
const analytics = getAnalytics(app);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { 
  app, 
  analytics, 
  db, 
  firestore, 
  logEvent, 
  ref, 
  onValue, 
  runTransaction,
  collection, 
  addDoc, 
  serverTimestamp
};