const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/doctor');

router.use(async (req,res,next) => {
    if(req.user && (req.user.user_type == 'doctor' || req.user.user_type == 'patient')){
        next();
    }
    else{
        //res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
        res.send("UNAUTHORIZED");
    }
});

router.get('/details', doctorController.getDoctorDetails);
router.post('/patientlist', doctorController.getPatient_List);
router.post('/update-profile', doctorController.updateDoctorProfile);
router.post('/addschedule', doctorController.addSchedule);
router.get('/profile', doctorController.getProfile);

router.get('/timeline/:doctor_id', doctorController.getTimeline);
router.post('/addPrescription/:booking_id', doctorController.addPrescription);
router.post('/update-Schedule/:timeline_id', doctorController.updateSchedule);
router.post('/deleteSCHEDULE/:timeline_id', doctorController.deleteSCHEDULE);
router.get('/viewPrescriptionDetails/:booking_id', doctorController.viewPrescriptionDetails);


module.exports = router;
