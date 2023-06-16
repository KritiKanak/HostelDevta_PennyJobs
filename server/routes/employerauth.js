const express = require('express');
const { registerEmployer, loginEmployer } = require('../controller/authcontroller');

const router = express.Router();

// Register employer endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const result = await registerEmployer(email, password);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Login employer endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await loginEmployer(email, password);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ error: result.error });
  }
});

module.exports = router;
