import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey:"AIzaSyD05dt2CeRtC0R6EqodF01U_RAM0iMKqdw",
    authDomain: "cripto-api-2c0ba.firebaseapp.com",
    databaseURL:"https://cripto-api.firebaseio.com",
    projectId: "cripto-api-2c0ba",
    storageBucket: "cripto-api-2c0ba.appspot.com",
    messagingSenderId: "401041889358",
    appId: "1:401041889358:web:edfe28c2e89807406d4b1f",
  };

  console.log(process.env.REACT_APP_FIREBASE_API_KEY)
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app;