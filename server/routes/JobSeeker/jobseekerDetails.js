const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../../middleware/fetchuser');
const JSDetails = require('../../models/JSdetails');

// Route 1: Get all the JSDetails using GET "/api/jsdetails/fetchalljsdetails". Login required
router.get('/fetchdetails', fetchuser, async (req, res) => {
  try {
    const jsdetails = await JSDetails.find({ user: req.user.id });
    res.json(jsdetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 2: Add a new JSDetail using POST "/api/jsdetails/addjsdetail". Login required
router.post('/adddetails', fetchuser, [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('experience', 'Experience must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { name,address, experience, duration, education, skills } = req.body;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jsdetail = new JSDetails({
      name,
      address,
      experience,
      duration,
      education,
      skills,
      user: req.user.id,
    });

    const savedJSDetails = await jsdetail.save();
    res.json(savedJSDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 3: Update an existing JSDetail using PUT "/api/jsdetails/updatejsdetail/:id". Login required
router.put('/updatedetails/:id', fetchuser, async (req, res) => {
  const { name,address, experience, duration, education, skills } = req.body;

  try {
    const newJSDetails = {};
    if (name) newJSDetails.name = name;
    if (address) newJSDetails.address = address;
    if (experience) newJSDetails.experience = experience;
    if (duration) newJSDetails.duration = duration;
    if (education) newJSDetails.education = education;
    if (skills) newJSDetails.skills = skills;

    let jsdetail = await JSDetails.findById(req.params.id);
    if (!jsdetail) {
      return res.status(404).send('Not Found');
    }

    if (jsdetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    jsdetail = await JSDetails.findByIdAndUpdate(
      req.params.id,
      { $set: newJSDetails },
      { new: true }
    );

    res.json({ jsdetail });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 4: Delete an existing JSDetail using DELETE "/api/jsdetails/deletejsdetail/:id". Login required
router.delete('/deletedetail/:id', fetchuser, async (req, res) => {
  try {
    let jsdetail = await JSDetails.findById(req.params.id);
    if (!jsdetail) {
      return res.status(404).send('Not Found');
    }

    if (jsdetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    jsdetail = await JSDetails.findByIdAndDelete(req.params.id);
    res.json({ Success: 'JSDetails has been deleted'});
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
