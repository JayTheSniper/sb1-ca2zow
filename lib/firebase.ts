import { getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCMr6M3iryLxF14auEKLYUsfEAb5HmSDUk",
  authDomain: "scho-944fd.firebaseapp.com",
  databaseURL: "https://scho-944fd-default-rtdb.firebaseio.com",
  projectId: "scho-944fd",
  storageBucket: "scho-944fd.firebasestorage.app",
  messagingSenderId: "855561456422",
  appId: "1:855561456422:web:b81cefb7f8bbea0d9b8fe7"
};

// Initialize Firebase only on the client side
let app;
let db;
let auth;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  auth = getAuth(app);
}

export { app, db, auth };