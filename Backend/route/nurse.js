const express = require('express');
const router = express.Router();
const userController = require('../Controller/nurse');

router.get('/:id/checkup', userController.getPatient_List);
router.get('/profile/:id', userController.getProfile);
router.put('/editProfile/:id', userController.editProfile)
router.get('/:id', userController.nursepr);

module.exports = router;
