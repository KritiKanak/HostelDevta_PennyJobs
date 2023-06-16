const express = require('express');
const { registerJobSeeker, loginJobSeeker } = require('../controller/authcontroller');

const router = express.Router();

// Register job seeker endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const result = await registerJobSeeker(email, password);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Login job seeker endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await loginJobSeeker(email, password);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ error: result.error });
  }
});

module.exports = router;
