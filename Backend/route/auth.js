// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../Controller/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/changepass', authController.changePassword);



module.exports = router;
