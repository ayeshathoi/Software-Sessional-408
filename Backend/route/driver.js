const express = require('express');
const router = express.Router();
const userController = require('../Controller/driver');

router.get('/:id', userController.getPatient_List);
router.put('/editProfile/:id', userController.update_profile)
module.exports = router;
