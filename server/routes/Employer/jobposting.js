const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const JobDetails = require('../../models/JobDetails');
const fetchemployer = require('../../middleware/fetchemployer');

// Route: Add a new job detail using POST "/api/jobdetails/add"
router.post(
  '/addjob',
  fetchemployer,
  [
    body('title', 'Title is required').notEmpty(),
    body('jobtype', 'Job Type is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('location', 'Location is required').notEmpty(),
    body('salary', 'Salary must be a valid number').isNumeric(),
  ],
  async (req, res) => {
    try {
      const { title,jobtype, description, location, salary } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const jobDetail = new JobDetails({
        title,
        jobtype,
        description,
        location,
        salary,
        user: req.user.id,
      });

      const savedJobDetail = await jobDetail.save();
      res.json(savedJobDetail);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Route: Update a job detail using PUT "/api/jobdetails/update/:id"
router.put('/update/:id', fetchemployer, async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const newJobDetail = {};
    if (title) newJobDetail.title = title;
    if (jobtype) newJobDetail.jobtype = jobtype;
    if (description) newJobDetail.description = description;
    if (location) newJobDetail.location = location;
    if (salary) newJobDetail.salary = salary;

    let jobDetail = await JobDetails.findById(req.params.id);
    if (!jobDetail) {
      return res.status(404).send('Job detail not found');
    }

    if (jobDetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not authorized to update this job detail');
    }

    jobDetail = await JobDetails.findByIdAndUpdate(
      req.params.id,
      { $set: newJobDetail },
      { new: true }
    );

    res.json(jobDetail);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Fetch all job details using GET "/api/jobdetails/fetch"
router.get('/fetch',fetchemployer, async (req, res) => {
  try {
    const jobDetails = await JobDetails.find({ user: req.user.id });
    res.json(jobDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: Delete a job detail using DELETE "/api/jobdetails/delete/:id"
router.delete('/delete/:id', fetchemployer, async (req, res) => {
  try {
    let jobDetail = await JobDetails.findById(req.params.id);
    if (!jobDetail) {
      return res.status(404).send('Job detail not found');
    }

    // if (jobDetail.user.toString() !== req.user.id) {
    //   return res.status(401).send('Not authorized to delete this job detail');
    // }

    await JobDetails.findByIdAndDelete(req.params.id);
    res.json({ success: 'Job detail has been deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
