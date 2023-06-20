const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  role: {
    type:String,
    default:'employer'
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

module.exports = mongoose.model('Employer', employerSchema);
