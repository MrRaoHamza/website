import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCb1IK7bHApYmhrAHcraycSUeTnF7eF07U",
    authDomain: "portfolio-95849.firebaseapp.com",
    projectId: "portfolio-95849",
    storageBucket: "portfolio-95849.firebasestorage.app",
    messagingSenderId: "833435598729",
    appId: "1:833435598729:web:84d7b0e948e2566127ab58",
    measurementId: "G-G29YT5ZTB9"
};

export const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Analytics (optional)
export const analytics =
    typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;