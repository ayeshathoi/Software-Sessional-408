// routes/protected.js
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  // Protected route logic
  // The authenticated user's information can be accessed through req.user
  res.json({ message: 'You are logged in and authorized to access this route.' });
});

module.exports = router;
