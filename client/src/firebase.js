// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'real-estate-app-47a49.firebaseapp.com',
  projectId: 'real-estate-app-47a49',
  storageBucket: 'real-estate-app-47a49.appspot.com',
  messagingSenderId: '388955606653',
  appId: '1:388955606653:web:60959ec686b2fd6826eb14',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
