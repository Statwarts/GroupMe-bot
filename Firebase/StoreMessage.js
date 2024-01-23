import {db , storage , app} from './firebaseConfig.js';

const StoreMessage = async (message) => {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            message: message,
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};


export default StoreMessage;