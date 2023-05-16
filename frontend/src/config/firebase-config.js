// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQZ03PgsFznaydOplCcid9gtALIThPZO4",
  authDomain: "reelgood-469fb.firebaseapp.com",
  projectId: "reelgood-469fb",
  storageBucket: "reelgood-469fb.appspot.com",
  messagingSenderId: "156345926829",
  appId: "1:156345926829:web:0b58d16b48cdaa82553224",
  measurementId: "G-P9X1VR8ZS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);