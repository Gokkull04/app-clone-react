// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBADfLigR1LGC_FyRFmmUM5KR2B-9xJ7Ns",
  authDomain: "realtor-clone-react-ae9e6.firebaseapp.com",
  projectId: "realtor-clone-react-ae9e6",
  storageBucket: "realtor-clone-react-ae9e6.appspot.com",
  messagingSenderId: "726365605121",
  appId: "1:726365605121:web:9a32fb6d32b623471adf00"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();