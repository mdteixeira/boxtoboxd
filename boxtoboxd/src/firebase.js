import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

import { getAnalytics } from 'firebase/analytics';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASHFIeKy4X3G2upMMOhvwmzMLp4zQKlYE",
  authDomain: "boxtobox-test.firebaseapp.com",
  projectId: "boxtobox-test",
  storageBucket: "boxtobox-test.appspot.com",
  messagingSenderId: "677706304606",
  appId: "1:677706304606:web:4d1578b337659a3bf678cf"
};

export const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const analytics = getAnalytics(app);
