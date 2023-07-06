const express = require('express');
const router = express.Router()

router.get('/fetch/:id', fetchemployer, async (req, res) => {
    try {
      const jobId = req.params.id;
      const jobDetails = await JobDetails.findOne({ _id: jobId, user: req.user.id });
  
      if (!jobDetails) {
        return res.status(404).json({ error: 'Job details not found' });
      }
  
      res.json(jobDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  