const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/doctor');



router.get('/details/:id', doctorController.getDoctorDetails);
router.post('/patientlist/:id', doctorController.getPatient_List);
router.post('/update-profile/:doctor_id', doctorController.updateDoctorProfile);
router.post('/addschedule/:id', doctorController.addSchedule);
router.get('/profile/:id', doctorController.getProfile);
router.get('/timeline/:id', doctorController.getTimeline);
router.post('/addPrescription/:booking_id', doctorController.addPrescription);
router.post('/update-Schedule/:timeline_id', doctorController.updateSchedule);
router.post('/deleteSCHEDULE/:timeline_id', doctorController.deleteSCHEDULE);


module.exports = router;
