const express = require('express');
const router = express.Router();
const patient = require('../Controller/patient');
const search = require('../Controller/search');

router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'patient'){
        next();
    }
    else{
        res.send("UNAUTHORIZED");
    }
});
router.post('/updateProfile', patient.update_profile);
router.post('/speciality', patient.doctor_speciality_search);
router.post('/name', patient.doctor_name_search);
router.get('/appointment', patient.all_Appointments);
router.get('/appointment/online', patient.zoom_Appointments);
router.get('/ambulance', patient.ambulanceDetails);
router.get('/ambulance/hospital', patient.ambulanceDetails);
router.get('/checkup', patient.checkUpDetails);
router.post('/hospital/testnames', patient.choose_test);
router.get('/profile', patient.getProfile);
router.post('/updateProfile', patient.update_profile);
router.get('/doctorall', patient.doctor_all_search);
router.get('/testall', patient.test_all_search);
router.get('/ambulanceall', search.alldriver);
router.get('/viewPrescriptionUser/:booking_id', patient.viewPrescriptionDetailsUser);
router.get('/check/:did',patient.Check_OLD_PATIENT_OR_NOT);
module.exports = router;
