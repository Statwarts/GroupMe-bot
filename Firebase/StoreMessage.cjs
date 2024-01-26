
const { db, storage, app } = require('./FirebaseConfig.js');
const { addDoc, collection, serverTimestamp , getDocs, where, query} = require('firebase/firestore');
const StoreMessage = async (message) => {
  const {text,name} = message;
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      message: text,
      sender: name,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

async function getMessagesBySender(sender) {
  try {
    const querySnapshot =await getDocs(query(collection(db, 'messages'), where('sender', '==', sender)));
    // console.log(querySnapshot.docs.map(doc => doc.data()));

    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return [];
  }
}

function getLastMessageTimestamp(messages) {
  if (!messages || messages.length === 0) {
    return 0;
  }
  const timestamps = messages.map(message => message.timestamp);
  console.log(timestamps);
  const seconds = timestamps.map(timestamp => timestamp.seconds);
  console.log(Math.max(...seconds));
  return Math.max(...seconds);
}

async function getMessagesUntilLastTimestamp(lastTimestamp) {
  
  try {
    const querySnapshot = await getDocs(query(collection(db,'messages'),where('timestamp', '<=', lastTimestamp)));
    console.log(querySnapshot.docs.map(doc => doc.data()));
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return [];
  }
}



async function getMessagesUpto(name) {
  try {
    // Step 1: Retrieve all messages by sender "f"
    const messagesBySender = await getMessagesBySender(name);

    if (messagesBySender.length === 0) {
      console.log("No messages from sender 'f' found.");
      return;
    }

    // Step 2: Get the timestamp of the last message by sender "f"
    const lastMessageTimestamp = getLastMessageTimestamp(messagesBySender);

    // Step 3: Retrieve messages until the last message by sender "f"
    const messagesUntilLastFMessage = await getMessagesUntilLastTimestamp(lastMessageTimestamp);

    // Print or process the retrieved messages
    console.log(`Messages until last message by sender ${name} :`, messagesUntilLastFMessage);
  } catch (error) {
    console.error('Error retrieving messages:', error);
  }
}


module.exports = {StoreMessage , getMessagesUpto};
