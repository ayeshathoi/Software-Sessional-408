const express = require('express');
const router = express.Router();
const patient = require('../Controller/patient');


router.post('/:id', patient.update_profile);
router.post('/speciality/:id', patient.doctor_speciality_search);
router.post('/name/:id', patient.doctor_name_search);
router.get('/appointment/:id', patient.appointmentDetails);
router.get('/ambulance/:id', patient.ambulanceDetails);
router.get('/checkup/:id', patient.checkUpDetails);
router.post('/test', patient.choose_test);
module.exports = router;
