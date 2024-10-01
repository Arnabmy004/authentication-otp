
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCrSlBp3rSUIM5-toF7Hs5Z-H006TPeIiw",
  authDomain: "otp-8eaf4.firebaseapp.com",
  projectId: "otp-8eaf4",
  storageBucket: "otp-8eaf4.appspot.com",
  messagingSenderId: "244543740010",
  appId: "1:244543740010:web:41100ea48e96e65a5cd213"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {
    auth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
}