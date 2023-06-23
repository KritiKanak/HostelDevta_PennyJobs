const express = require('express');
const router = express.Router();
const JobDetails = require('../../models/JobDetails');
const JobApplication = require('../../models/JobApplication')
const JSdetails = require('../../models/JSdetails')
const fetchuser = require('../../middleware/fetchuser')

// Route: Fetch all jobs posted by employers using GET "/api/jobs"
router.get('/fetchjobs', async (req, res) => {
  try {
    const jobDetails = await JobDetails.find();
    res.json(jobDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// Route: Fetch jobs by jobType using GET "/api/jobdetails/fetch/:jobType"
// Route: Fetch jobs by jobType using GET "/api/jobdetails/fetch/:jobType"
router.get('/fetch/:jobType', async (req, res) => {
    try {
      const jobType = req.params.jobType;
      const jobDetails = await JobDetails.find({ jobtype: jobType });
      res.json(jobDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Route: Apply for a job using POST "/api/jobdetails/apply/:jobId"
router.post('/apply/:id', fetchuser, async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job details by jobId
    const jobDetails = await JobDetails.findById(jobId);
    if (!jobDetails) {
      return res.status(404).send('Job details not found');
    }

    // Fetch the job seeker's details from JSDetails collection
    const jobSeekerDetails = await JSdetails.findOne({ user: req.user.id });
    if (!jobSeekerDetails) {
      return res.status(404).send('Job seeker details not found');
    }

    // Create a new job application object
    const newJobApplication = new JobApplication({
      user: req.user.id,
      job: jobDetails._id,
      employer:jobDetails.user,
      name: jobSeekerDetails.name,
      address: jobSeekerDetails.address,
      experience: jobSeekerDetails.experience,
      duration: jobSeekerDetails.duration,
      education: jobSeekerDetails.education,
      skills: jobSeekerDetails.skills,
      
    });

    // Save the job application
    const savedJobApplication = await newJobApplication.save();

    res.json(savedJobApplication);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

  
  
