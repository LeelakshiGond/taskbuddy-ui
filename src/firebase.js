// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe-OdJCc4BuOmVaq237uz2YEbDGgb_1ek",
  authDomain: "task-management-610e7.firebaseapp.com",
  projectId: "task-management-610e7",
  storageBucket: "task-management-610e7.firebasestorage.app",
  messagingSenderId: "874948138478",
  appId: "1:874948138478:web:3db65a96120f68573eeaff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
