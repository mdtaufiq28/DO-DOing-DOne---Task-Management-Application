// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpp6ayi-g4s68cHmHUvHt6gD6rhKzjYe0",
  authDomain: "task-management-app-project7.firebaseapp.com",
  projectId: "task-management-app-project7",
  storageBucket: "task-management-app-project7.appspot.com",
  messagingSenderId: "416694899840",
  appId: "1:416694899840:web:bfb94710a512332cb38265",
  measurementId: "G-8JGHZY5S6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
export default app;