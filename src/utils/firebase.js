// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgV1esFrzgooaFP2Bui9H1jwdDOIzmkbU",
  authDomain: "netflixgpt-30c5b.firebaseapp.com",
  projectId: "netflixgpt-30c5b",
  storageBucket: "netflixgpt-30c5b.appspot.com",
  messagingSenderId: "309655117719",
  appId: "1:309655117719:web:e446ec6488640582dc2ed2",
  measurementId: "G-X8B4W96R6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();