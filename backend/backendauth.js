// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Place your own credentials here below!
const firebaseConfig = {
    apiKey: "[YOUR API KEY]",
    authDomain: "[YOUR AUTH DOMAIN]",
    projectId: "[YOUR PROJECT ID]",
    storageBucket: "[YOUR STORAGE BUCKET]",
    messagingSenderId: "[YOUR MESSAGING SENDER ID]",
    appId: "[YOUR APP ID]",
    measurementId: "[YOUR MEASUREMENT ID]"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
