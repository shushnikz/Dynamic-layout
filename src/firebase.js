import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1zWHDcO0mTLnpXtEvJqV0rRsUCU0YJpk",
    authDomain: "dynamic-page-builder-d9932.firebaseapp.com",
    projectId: "dynamic-page-builder-d9932",
    storageBucket: "dynamic-page-builder-d9932.firebasestorage.app",
    messagingSenderId: "714825716114",
    appId: "1:714825716114:web:249f394d37db98cb81b14b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };