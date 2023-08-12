const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/doctor');

router.get('/:id', doctorController.getPatient_List);

module.exports = router;
