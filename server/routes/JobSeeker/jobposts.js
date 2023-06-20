const express = require('express');
const router = express.Router();
const JobDetails = require('../../models/JobDetails');

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
  
  
