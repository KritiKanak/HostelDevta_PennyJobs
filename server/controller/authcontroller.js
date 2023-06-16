const admin = require('firebase-admin');
const Employer = require('../models/employerSchema');
const JobSeeker = require('../models/jobSeekerSchema');

// Register a new employer
async function registerEmployer(email, password) {
  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save employer details in MongoDB
    await Employer.create({ email, password });

    return { success: true, message: 'Employer registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}

// Register a new job seeker
async function registerJobSeeker(email, password) {
  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save job seeker details in MongoDB
    await JobSeeker.create({ email, password });

    return { success: true, message: 'Job seeker registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}

// Login employer
async function loginEmployer(email, password) {
  try {
    // Sign in user with Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);

    // Authenticate employer in MongoDB
    const employer = await Employer.findOne({ email, password }).exec();

    if (employer) {
      return { success: true, message: 'Employer login successful' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

// Login job seeker
async function loginJobSeeker(email, password) {
  try {
    // Sign in user with Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);

    // Authenticate job seeker in MongoDB
    const jobSeeker = await JobSeeker.findOne({ email, password }).exec();

    if (jobSeeker) {
      return { success: true, message: 'Job seeker login successful' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

module.exports = { registerEmployer, registerJobSeeker, loginEmployer, loginJobSeeker };
