import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

import { getAnalytics } from 'firebase/analytics';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtwWS8-luHenoqfrUIQpirCqslRHcxbLU',
  authDomain: 'boxtobox-d.firebaseapp.com',
  projectId: 'boxtobox-d',
  storageBucket: 'boxtobox-d.appspot.com',
  messagingSenderId: '449872212586',
  appId: '1:449872212586:web:7b7b8b20ef622a4466d013',
};

export const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const analytics = getAnalytics(app);
