const express = require('express');
const { connectToDatabase } = require('./db');
const employerAuth = require('./routes/Employer/employer');
const emdetails = require('./routes/Employer/employerDetails');
const jobseekerAuth = require('./routes/JobSeeker/jobseeker');
const jsdetails = require('./routes/JobSeeker/jobseekerDetails');
const employerPosts = require('./routes/Employer/jobposting');
const jobPosts = require('./routes/JobSeeker/jobposts');

const app = express();


app.use(express.json());

// Connect to MongoDB Atlas
connectToDatabase();

// Mount the auth router
app.use('/', jobPosts),
app.use('/api/auth/employer', employerAuth);
app.use('/api/auth/jobseeker', jobseekerAuth);
app.use('/api/jobseekerdetails', jsdetails);
app.use('/api/employerdetails', emdetails);
app.use('/api/employer', employerPosts)

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
