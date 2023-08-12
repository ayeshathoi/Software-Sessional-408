// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../middleware/auth');
const verifyController = require('../middleware/verify');

router.post('/login', authController.login);
router.get('/verify', verifyController.verifyToken);
module.exports = router;
