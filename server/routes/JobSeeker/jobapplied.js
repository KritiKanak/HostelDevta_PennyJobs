const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const JobApplication = require('../../models/JobApplication');
const JobDetails = require('../../models/JobDetails');

// Route: Get all job applications for the logged-in job seeker using GET "/api/jobapplications/jobseeker". Login required.
// Assuming you have the necessary imports and middleware set up

// Fetch all jobs applied by the user
router.get('/jobs-applied', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all job applications for the user
    const jobApplications = await JobApplication.find({ user: userId });

    // Populate the job details for each job application
    const populatedJobApplications = await JobApplication.populate(jobApplications, {
      path: 'job',
      select: 'companyname title jobtype description salary location', // Specify the fields you want to populate
    });

    res.json(populatedJobApplications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
