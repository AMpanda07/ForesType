import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDMXQfdjqUSjPQ0DEBiwNjIC2aCDokIYUk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "authtype-16d70.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "authtype-16d70",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "authtype-16d70.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "272166349114",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:272166349114:web:8d38a07daea815c5d8c803"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
