const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/doctor');

router.post('/patientlist/:id', doctorController.getPatient_List);
router.post('/addschedule/:id', doctorController.addSchedule);

module.exports = router;
