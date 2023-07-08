const express = require('express');
var cors = require('cors');
const { connectToDatabase } = require('./db');
const employerAuth = require('./routes/Employer/employer');
const emdetails = require('./routes/Employer/employerDetails');
const jobseekerAuth = require('./routes/JobSeeker/jobseeker');
const jsdetails = require('./routes/JobSeeker/jobseekerDetails');
const employerPosts = require('./routes/Employer/jobposting');
const jobPosts = require('./routes/JobSeeker/jobposts');
const jobapplications = require('./routes/Employer/jobapplication')
const jobapplied = require('./routes/JobSeeker/jobapplied')
const sendMail = require('./routes/mailer')

const app = express();

app.use(cors())
app.use(express.json());

// Connect to MongoDB Atlas
connectToDatabase();

// Mount the auth router
app.use('/', jobPosts),
app.use('/api/auth/employer', employerAuth);
app.use('/api/auth/jobseeker', jobseekerAuth);
app.use('/api/jobseekerdetails', jsdetails);
app.use('/api/employerdetails', emdetails);
app.use('/api/employer', employerPosts);
app.use('/api/employer', jobapplications);
app.use('/api/jobseeker', jobapplied);
app.use('/employer', sendMail);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
