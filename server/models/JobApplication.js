const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobApplicationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jsdetails',
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobDetails',
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employerdetails',
  },
  name:{
    type: String,
    required: true
  },
  address:{
      type:String,
      required:true
  },
  email:{
    type:String,
    required:true
  },
  experience:{
      type: String,
      required: true,
  },
  duration:{
      type:String,
      required: true,
  },
  education:{
      type:String,
      required:true,
  },
  skills:{
      type:String,
      required:true
  },
  date:{
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
