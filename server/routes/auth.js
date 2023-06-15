const express = require('express');
const { registerUser, loginUser } = require('../controller/authcontroller');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { email, password, userType } = req.body;

  const result = await registerUser(email, password, userType);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  const result = await loginUser(email, password, userType);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ error: result.error });
  }
});

module.exports = router;
