const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: { type: String, enum: ['employer', 'jobseeker'] },
});

module.exports = mongoose.model('User', UserSchema);
