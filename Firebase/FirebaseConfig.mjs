// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getStorage} from "firebase/storage";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkjfslq4x_cSyGs23KTrhR_ZAhWhlWEQI",
  authDomain: "groupme-bot-b8ffd.firebaseapp.com",
  projectId: "groupme-bot-b8ffd",
  storageBucket: "groupme-bot-b8ffd.appspot.com",
  messagingSenderId: "155140118986",
  appId: "1:155140118986:web:37ba0367083807e2bd9733",
  measurementId: "G-T2DNS8SXFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);


// export {db , storage , app};

// export default app;

export default {db , storage , app};