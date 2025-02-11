import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "dotenv/config";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

console.log(firebaseConfig.authDomain);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const authProvider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  try {
    signInWithPopup(auth, authProvider)
      .then(() => {})
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        alert(errorCode);

        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  } catch (err) {
    console.log(err);
  }
};

export { auth, authProvider, signInWithGoogle, db };
