const express = require('express');
const { sendEmail } = require('../service/email');
const router = express.Router();
const Jobseeker = require('../models/Jobseeker');
const JobApplication = require('../models/JobApplication');
const fetchemployer = require('../middleware/fetchemployer')
const app = express();

// Route for sending email to selected job seeker
router.get('/send-email/:Id',  async (req, res) => {
  try {
    const JobseeekerId = req.params.Id;

    // Find the employer by employerId
    const jobseeker = await JobApplication.findById(JobseeekerId);
    if (!jobseeker) {
      return res.status(404).json({ error: 'Jobseeker not found' });
    }

    const { email } = jobseeker; // Get the email from the employer object

    // Compose email details
    const emailSubject = 'no-reply';
    const emailText = 'Dear job seeker, Congratulations! You have been selected for an interview'; // Compose the email text with relevant details

    // Send email
    await sendEmail(email, emailSubject, emailText);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
module.exports = router;