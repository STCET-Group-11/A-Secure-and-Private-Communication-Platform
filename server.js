const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require(
    {
        "type": "service_account",
        "project_id": "communication-2e28a",
        "private_key_id": "893daaf2eab2bf9e39afb7aa94fb02da23201e0b",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQ9DqUvrcoTZ0s\n2m/M9JQiQZ/y2BuyoTVvDU3zB/y7nxTKLfeCC9GRZehn5PLxVkAoUOUbAQf3IY55\ntQg148O0cjwLX+xTPGwojriMxYtSVXgIhVDXnW20xSO2+mD+INBZrAG33XhTnx1w\nfP9hd/24iMl1KtCLQZFjCofmfoiRjba0kr4Ob6Zfs+KehNaM0B4CqJpjdm449uTr\n4YPweLGmWE1lIrKOKj2FdbUZhmRz2IvjTGg/oWi75XTjpdYFyUlWWQX+q+30dSpm\namVDUXhZqZ2M+btug2uR/yzN/tzOfzdZLUaO72Qg1h7VGU6uSstx4KWrd8Xaz0Ia\nnyz6BimPAgMBAAECggEAD2TRb1rmNcm+A2tros7+niV1NK1Xdl9VB0OU02DqbXdz\nTyUiyl8M3JLZk9SJ/LNM0mDfTWV+jOYuemiWscMADH+r98SPLbSnsoyNK7sen/1c\nSfhps8Yif8JUTBXXERx2wlx0hfNYJYT1Ohp4sAQTL5tNiDG+ymZAC+q0h2EZYOuh\n12Frak1w2a1cZ0j7FQ+hTn0S7eWIw6NTTLxt5Bs6IP+eATfOYrXT5bv3CRT030EQ\n5R2wMAp4SFQjFJGy06aOPlxGF4CQJ14r/XrdtHrWCjDyAK3QwNFcp8xVkjgVlzKN\nQ5cdu2q/vcxMPjd8d7WzGEU3ZDQY122mH1Z7/xJOKQKBgQD0OtJhG75fbb1Qds+l\nj0a7ckf7NZ3aK2smNc+iwHB1c4c0dzqyTp0ZNxkMWmQUqRHLsThzvzXZtDaivTQN\nHUCDcCl5rwnptdZ1tdBv/FiNRH6nrpDiMDa3WIQE5MHMrGtR9XcPQO9kelXHvAq8\n3NYQXEpr5GWaZ9Gr+v+xqP1lqQKBgQDbBjGBbuVRs9GcNDNdXiQDeuRgodM9tv3B\nPD9/nbYOUoUUv9KDPRweioObetC7C3m+7BoW7WqmJkftZITH9kFtrvrYuBZUhhyo\now2ScXVnj0daNOqEmqG1dkoL7iKEkFIsM7KccVlgd2gdoT/8P/aKHG/LL7hAIqUQ\nLCg1Tn2odwKBgFBSsDJD356fBu5ZxP0cXBT2Bvp1rc69DOZqODm8tL/MGSGGPQW7\nmStb1Z8cc2HgIPwu8vQOZPWOsZFgTKgrgLY5w0pD6Sy2IyxfeYf7JFyBtG4NmZTq\nanRuZiz910crRbiU1G1t283d9ixUieuHbde/orJNUaUwk+LOEB4sB/rRAoGBALDm\n1rNpI3UTHPjiPJ5r/ACHkM/vxJNzKo+ZntvvQO1efzicGmZ/xCdyzwuUbeS1RxcK\n0aO1DM+32Z6G8qwjXQM/MkI6pWaNj7YxRDQEycPkOMhGNyj1UCklqnbqVxzlCEnF\nU70B3COLLh/IbsrJytIQV8cv+sxqbxGZ6LvtcpbPAoGBAJawj71GdO6CTRsagbAX\nwGmJ/vU6yJFH/vRI9d/2xKeAZ2fys2b40S75ysK3h1g4dKukv2Op1LAuoO3iPomR\n15t6Q0t29Teizb16/4PN7z2TBqDJUIeh3QxLB+pZUec/hYRUcTG8O5ACiQ7JDFZM\ndYlFiJgK6+gvdZvDAyOzy6Uw\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-6o8fk@communication-2e28a.iam.gserviceaccount.com",
        "client_id": "115100568045697803924",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6o8fk%40communication-2e28a.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://communication-2e28a-default-rtdb.firebaseio.com/'
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
