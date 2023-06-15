const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  try {
    const mongoURI = process.env.MONGODB;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

module.exports = { connectToDatabase };
