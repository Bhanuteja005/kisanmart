import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB3O6m8XHCQVo_MPQ755eibz6UG9dnCyj4",
    authDomain: "kissan-mart-84e95.firebaseapp.com",
    projectId: "kissan-mart-84e95",
    storageBucket: "kissan-mart-84e95.firebasestorage.app",
    messagingSenderId: "982370957687",
    appId: "1:982370957687:web:9af629425e37b06eef0972",
    measurementId: "G-JX0QK1S1H4"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
