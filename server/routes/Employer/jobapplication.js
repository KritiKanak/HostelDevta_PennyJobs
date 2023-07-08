const express = require('express');
const router = express.Router();
const fetchemployer = require('../../middleware/fetchemployer');
const JobApplication = require('../../models/JobApplication');
const jobdetails = require('../../models/JobDetails')
const jsdetails = require('../../models/JSdetails')

// // Route: Get job applications for a specific job posted by the employer using GET "/api/jobapplications/employer/:jobId". Login required.
// router.get('/jobapplication/:jobId', fetchemployer, async (req, res) => {
//   try {
//     const employerId = req.user.id;
//     const jobId = req.params.jobId;


//     // Check if the logged-in user is the employer of the job
//     // const job = await jobdetails.findOne({ _id: jobId, employer: employerId });
//     // if (!job) {
//     //   return res.status(403).send('Unauthorized');
//     // }
//     // Find the job application where the employer is the logged-in user and the job ID matches
//     const jobApplication = await JobApplication.find({ employer: employerId, job: jobId })
//       .populate({
//         path: 'user',
//         // model: 'jsdetails',
//         select: 'name address experience duration education skills'
//       })
//       // .populate('job', 'title jobtype description location salary');

//     if (jobApplication.length === 0) {
//       return res.status(200).json({ message: 'No applicants found for this job.' });
//     }

//     res.json(jobApplication);
//     console.log(jobApplication)
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });


router.get('/jobapplication/:jobId', fetchemployer, async (req, res) => {
  try {
    const employerId = req.user.id;
    const jobId = req.params.jobId;

    // Find the job applications where the employer is the logged-in user and the job ID matches
    const jobApplications = await JobApplication.find({ employer: employerId, job: jobId });

    if (jobApplications.length === 0) {
      return res.status(200);
    }
    // if (jobApplications.length === 0) {
    //   return res.status(200).json({ message: 'No applications found for this job.' });
    // }
    console.log(jobApplications)
    res.json(jobApplications);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});



// Route: Get a specific job application by ID using GET "/api/jobapplications/:id"
router.get('/fetchapplication/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Find the job application by ID
    const jobApplication = await JobApplication.findById(applicationId);

    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.json(jobApplication);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
