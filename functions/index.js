const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    admin
        .firestore()
        .collection('users')
        .get()
        .then(data => {
            let users = [];
            data.forEach(doc => {
                users.push(doc.data());
            });
            return res.json(users);
        })
        .catch(err => console.error(err));
});

exports.api = functions.https.onRequest(app);