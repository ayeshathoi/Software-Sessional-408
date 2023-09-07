const express = require('express');
const router = express.Router();
const userController = require('../Controller/booking');

router.post('/:uid/appointment', userController.DoctorBooking);
router.get('/:uid/appointment', userController.DoctorBooking);
router.post('/:uid/select/test', userController.selectTEST);
router.post('/:uid/checkup', userController.CheckupBooking);
router.post('/:uid/ambulance', userController.AmbulanceBooking);
module.exports = router;
