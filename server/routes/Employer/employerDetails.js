const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchemployer = require('../../middleware/fetchemployer');
const EmployerDetails = require('../../models/Employerdetails');

// Route 1: Get all the employer details using GET "/api/employerdetails/fetchdetails". Login required
router.get('/fetchdetails', fetchemployer, async (req, res) => {
  try {
    const employerDetails = await EmployerDetails.find({ user: req.user.id });
    res.json(employerDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 2: Add new employer details using POST "/api/employerdetails/adddetails". Login required
router.post('/adddetails', fetchemployer, [
  body('companyname', 'Enter a valid company name').isLength({ min: 3 }),
  body('address', 'Enter a valid address').notEmpty(),
  body('size', 'Enter a valid company size').notEmpty(),
  body('type', 'Enter a valid company type').notEmpty(),
], async (req, res) => {
  try {
    const { companyname, address, size, type } = req.body;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const employerDetail = new EmployerDetails({
      companyname,
      address,
      size,
      type,
      user: req.user.id,
    });

    const savedEmployerDetails = await employerDetail.save();
    res.status(200).json(savedEmployerDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 3: Update existing employer details using PUT "/api/employerdetails/updatedetails/:id". Login required
router.put('/updatedetails/:id', fetchemployer, async (req, res) => {
  const { companyname, address, size, type } = req.body;

  try {
    const newEmployerDetails = {};
    if (companyname) newEmployerDetails.companyname = companyname;
    if (address) newEmployerDetails.address = address;
    if (size) newEmployerDetails.size = size;
    if (type) newEmployerDetails.type = type;

    let employerDetail = await EmployerDetails.findById(req.params.id);
    if (!employerDetail) {
      return res.status(404).send('Not Found');
    }

    if (employerDetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    employerDetail = await EmployerDetails.findByIdAndUpdate(
      req.params.id,
      { $set: newEmployerDetails },
      { new: true }
    );

    res.json({ employerDetail });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 4: Delete an existing employer detail using DELETE "/api/employerdetails/deletedetail/:id". Login required
router.delete('/deletedetail/:id', fetchemployer, async (req, res) => {
  try {
    let employerDetail = await EmployerDetails.findById(req.params.id);
    if (!employerDetail) {
      return res.status(404).send('Not Found');
    }

    if (employerDetail.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    employerDetail = await EmployerDetails.findByIdAndDelete(req.params.id);
    res.json({ Success: 'Employer details have been deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
