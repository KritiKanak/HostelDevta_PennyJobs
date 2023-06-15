const express = require('express');
const admin = require('firebase-admin');
const { connectToDatabase } = require('./db');
const authRouter = require('./routes/auth');

const app = express();

// Firebase Admin SDK initialization
const serviceAccount = require('../privateKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

// Connect to MongoDB Atlas
connectToDatabase();

// Mount the auth router
app.use('/api/auth', authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
