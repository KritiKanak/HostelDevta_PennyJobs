const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
