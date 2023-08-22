const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require("D:\\A Secure and Private Communication Platform with Multi-Layered Protection\\communication-2e28a-firebase-adminsdk-6o8fk-893daaf2ea.json"); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://communication-2e28a-default-rtdb.firebaseio.com/'
});

const app = express();
app.use(bodyParser.json());

const db = admin.database();
const messagesRef = db.ref('messages');

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/send', (req, res) => {
  const { sender, message } = req.body;
  messagesRef.push({ sender, message });
  res.status(200).send('Message sent');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
