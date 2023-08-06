const express = require('express');
const router = express.Router();
const userController = require('../Controller/nurse');

router.get('/:id', userController.getPatient_List);
router.put('/editProfile/:id', userController.editProfile)

module.exports = router;
