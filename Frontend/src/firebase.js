// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "automationai-bd16d.firebaseapp.com",
  projectId: "automationai-bd16d",
  storageBucket: "automationai-bd16d.firebasestorage.app",
  messagingSenderId: "195759383824",
  appId: "1:195759383824:web:e25b6191a05981f01db195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();