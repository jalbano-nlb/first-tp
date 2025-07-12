// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVmc4OoPqReRLga82WcxQOLkuX82amC50",
  authDomain: "prodapp-react.firebaseapp.com",
  projectId: "prodapp-react",
  storageBucket: "prodapp-react.firebasestorage.app",
  messagingSenderId: "453105014466",
  appId: "1:453105014466:web:f58dc8d5d5d4a5dadd8d5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);

export { db }