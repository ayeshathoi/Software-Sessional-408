const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/doctor');
// const multer = require('multer'); // Import multer for handling file uploads
// const upload = multer(); // Create a multer instance

router.post('/patientlist/:id', doctorController.getPatient_List);
router.post('/update-profile/:doctor_id', doctorController.updateDoctorProfile);
router.post('/addschedule/:id', doctorController.addSchedule);
router.get('/profile/:id', doctorController.getProfile);
//router.post('/addPrescription', upload.single('prescription_pdf'), doctorController.addPrescription);

module.exports = router;
