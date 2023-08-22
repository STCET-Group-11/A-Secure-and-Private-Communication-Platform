const firebaseConfig = {
    apiKey: "AIzaSyAv0Lxx9QN-8ZtqOZP-3XGCqiw8p2-2U9w",
    authDomain: "communication-2e28a.firebaseapp.com",
    projectId: "communication-2e28a",
    storageBucket: "communication-2e28a.appspot.com",
    messagingSenderId: "119743742814",
    appId: "1:119743742814:web:c5a825b8e834d153c385cf"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const messagesRef = firebase.database().ref('messages');
  const messageInput = document.getElementById('message');
  const sendButton = document.getElementById('send');
  const messagesDiv = document.getElementById('messages');
  
  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
      messagesRef.push({ sender: 'User', message });
      messageInput.value = '';
    }
  });
  
  messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.sender}: ${message.message}`;
    messagesDiv.appendChild(messageElement);
  });
  