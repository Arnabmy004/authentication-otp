
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC4yOorRggow0OWXRCTGHPWK63L2cu-Wqo",
  authDomain: "otp-project-aa69c.firebaseapp.com",
  projectId: "otp-project-aa69c",
  storageBucket: "otp-project-aa69c.appspot.com",
  messagingSenderId: "43625493513",
  appId: "1:43625493513:web:635a27cef164c1826eb4d8",
  measurementId: "G-NT1RYTKLTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;
 export { auth, RecaptchaVerifier, signInWithPhoneNumber };

