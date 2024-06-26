
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDkjfslq4x_cSyGs23KTrhR_ZAhWhlWEQI",
  authDomain: "groupme-bot-b8ffd.firebaseapp.com",
  projectId: "groupme-bot-b8ffd",
  storageBucket: "groupme-bot-b8ffd.appspot.com",
  messagingSenderId: "155140118986",
  appId: "1:155140118986:web:37ba0367083807e2bd9733",
  measurementId: "G-T2DNS8SXFP"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// // const analytics = getAnalytics(app);

module.exports = { db, storage, app };
