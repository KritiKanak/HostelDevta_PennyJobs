const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  role: {
    type:String,
    default:'jobseeker'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
