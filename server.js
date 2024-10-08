const express = require('express')
const app = express()
const admin = require('firebase-admin');
require('dotenv').config()
const serviceAccount = JSON.parse(process.env.GOOGLE_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/send',(req,res) => {
    console.log(req.body)
    const{token,status} = req.body
    const message = {
        notification:{
            "title": "Order Update",
            "body": `Your order has been ${status}!`
        },
        token,  // Replace with the device's FCM token
    };
    
    admin.messaging().send(message)
        .then(response => {
            console.log('Successfully sent message:', response);
            res.send("received")
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.send(error)
        });
})
app.listen(5000)
