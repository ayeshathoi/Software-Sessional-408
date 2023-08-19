const express = require('express');
const router = express.Router();
const userController = require('../Controller/nurse');

router.get('/:id/chekcup', userController.getPatient_List);
router.put('/editProfile/:id', userController.editProfile)
router.get('/:id', userController.nursepr);

module.exports = router;
