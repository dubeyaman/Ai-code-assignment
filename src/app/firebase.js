// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5pGlq7ucJABiMmtXJ2d0YkOf7lsVcXYs",
  authDomain: "ai-code-review-91782.firebaseapp.com",
  projectId: "ai-code-review-91782",
  storageBucket: "ai-code-review-91782.appspot.com",
  messagingSenderId: "142743169516",
  appId: "1:142743169516:web:fe4850cc37b591fd41f8c9",
  measurementId: "G-0ZTTYGRVV4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };





