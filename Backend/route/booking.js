const express = require('express');
const router = express.Router();
const userController = require('../Controller/booking');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'patient'){
        next();
    }
    else{
        res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
});
router.post('/appointment', userController.DoctorBooking);
router.post('/select/test', userController.selectTEST);
router.post('/checkup', userController.CheckupBooking);
router.post('/ambulance', userController.AmbulanceBooking);
module.exports = router;
