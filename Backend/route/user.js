const express = require('express');
const router = express.Router();
const userController = require('../Controller/user');

router.get('/:username', userController.getUserDetails);

module.exports = router;
