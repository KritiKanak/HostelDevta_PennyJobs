const admin = require('firebase-admin');
const User = require('../models/userSchema');

// Register a new user
async function registerUser(email, password, userType) {
  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save user details in MongoDB
    await User.create({ email, password, userType });

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}

// Login user
async function loginUser(email, password, userType) {
  try {
    // Sign in user with Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);

    // Authenticate user in MongoDB
    const user = await User.findOne({ email, password, userType }).exec();

    if (user) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

module.exports = { registerUser, loginUser };
