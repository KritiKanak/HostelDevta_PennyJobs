const express = require('express');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const JobApplication = require('../../models/JobApplication');
const JobDetails = require('../../models/JobDetails');

// Route: Get all job applications for the logged-in job seeker using GET "/api/jobapplications/jobseeker". Login required.
router.get('/jobapplied', fetchuser, async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({ user: req.user.id })
      .populate('job', 'title jobtype description location salary')
      .populate('employer', 'name');

    res.json(jobApplications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
