const express = require('express');
const router = express.Router();
const patient = require('../Controller/patient');
const search = require('../Controller/search');


router.post('/:id', patient.update_profile);
router.post('/speciality/:id', patient.doctor_speciality_search);
router.post('/name/:id', patient.doctor_name_search);
router.get('/appointment/:id', patient.all_Appointments);
router.get('/appointment/online/:id', patient.zoom_Appointments);
router.get('/ambulance/:id', patient.ambulanceDetails);
router.get('/ambulance/hospital/:id', patient.ambulanceDetails);
router.get('/checkup/:id', patient.checkUpDetails);
router.post('/hospital/testnames', patient.choose_test);
router.get('/profile/:id', patient.getProfile);
router.post('/updateProfile/:id', patient.update_profile);
router.get('/doctorall', patient.doctor_all_search);
router.get('/testall', patient.test_all_search);
router.get('/ambulanceall', search.alldriver);
module.exports = router;
