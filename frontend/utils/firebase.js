import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "lms--login-7b4f4.firebaseapp.com",
  projectId: "lms--login-7b4f4",
  storageBucket: "lms--login-7b4f4.firebasestorage.app",
  messagingSenderId: "431198714762",
  appId: "1:431198714762:web:a37a33391ed75aef1ea673",
};
 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const providor = new GoogleAuthProvider();

export { auth, providor };
