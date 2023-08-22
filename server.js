const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./path-to-your-service-account-key.json'); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'your-database-url'
});

const app = express();
app.use(bodyParser.json());

const db = admin.database();
const messagesRef = db.ref('messages');

app.post('/send', (req, res) => {
  const { sender, message } = req.body;
  messagesRef.push({ sender, message });
  res.status(200).send('Message sent');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
