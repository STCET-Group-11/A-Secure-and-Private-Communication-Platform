import { getDatabase, ref, push, onChildAdded, remove} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAv0Lxx9QN-8ZtqOZP-3XGCqiw8p2-2U9w",
    authDomain: "communication-2e28a.firebaseapp.com",
    databaseURL: "https://communication-2e28a-default-rtdb.firebaseio.com",
    projectId: "communication-2e28a",
    storageBucket: "communication-2e28a.appspot.com",
    messagingSenderId: "119743742814",
    appId: "1:119743742814:web:c5a825b8e834d153c385cf"
  };


const app = initializeApp(firebaseConfig);

const messagesRef = ref(getDatabase(), 'messages');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        push(messagesRef, { sender: 'User', message });
        messageInput.value = '';
    }
});

onChildAdded(messagesRef, snapshot => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.sender}: ${message.message}`;
    messagesDiv.appendChild(messageElement);

    setTimeout(() => {
      const messageKey = snapshot.key;
      if (messageKey) {
        const messageRef = ref(getDatabase(), `messages/${messageKey}`);
        remove(messageRef);
        messageElement.remove();
      }
    }, 5000);
});



  