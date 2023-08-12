const express = require('express');
const router = express.Router();
const userController = require('../Controller/user');

router.get('/:uid', userController.getUserDetailsByID);
router.get('/:email', userController.getUserDetailsByEmail);
router.post('/create_hospital', userController.create_hospital);
module.exports = router;
