// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJmls0ZNOaMSIqn0AATizmLD6HRr-WQAU",

    authDomain: "podium-a39f7.firebaseapp.com",

    projectId: "podium-a39f7",

    storageBucket: "podium-a39f7.firebasestorage.app",

    messagingSenderId: "601497460161",

    appId: "1:601497460161:web:876cba6ab22f8b85cda340",

    measurementId: "G-F455Q58EVY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
