const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobDetailsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  jobtype: {
    type: String,
    enum: ['fulltime', 'contractual'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  applications: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('JobDetails', JobDetailsSchema);
