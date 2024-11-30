// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzsRBBR6m5vAyvMAMo-dGWlq3HQ-l8K_Q",
  authDomain: "epay-c8fa1.firebaseapp.com",
  projectId: "epay-c8fa1",
  storageBucket: "epay-c8fa1.firebasestorage.app",
  messagingSenderId: "434443187210",
  appId: "1:434443187210:web:b8c2852223965371639bf3",
  measurementId: "G-2Q02S0B55R"
};

// Initialize Firebase
const app =getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth};
