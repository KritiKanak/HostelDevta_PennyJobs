const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./servacckey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'hd-project9.appspot.com' // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

module.exports = {
  admin,
  bucket
};
