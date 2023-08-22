const firebaseConfig = {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    databaseURL: 'your-database-url',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
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
  