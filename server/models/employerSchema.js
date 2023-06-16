const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('Employer', EmployerSchema);
