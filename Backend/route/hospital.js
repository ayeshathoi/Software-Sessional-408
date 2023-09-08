const express = require('express');
const router = express.Router();
const userController = require('../Controller/hospital');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'hospital'){
        next();
    }
    else{
        //res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
        res.send("UNAUTHORIZED");
    }
});
router.get('/doctor', userController.getAvailable_Doctor);
router.get('/nurse', userController.getAvailable_Nurse);
router.get('/driver', userController.getAvailable_Driver);

router.post('/updateprice', userController.update_price);
router.post('/addtest', userController.addTEST);

router.get('/complaint/:aid', userController.show_complaint);


router.post('/assign/nurse', userController.assign_nurse);
router.post('/update/employee', userController.update_employee);
router.get('/booking', userController.all_booking);
router.get('/onebooking/:bookId', userController.one_booking);
router.post('/booking/complaint', userController.show_complaint);
router.get('/pending/patient', userController.show_pending_checkup);
router.post('/pending/test', userController.show_pending_test);
router.get('/pending/doctor', userController.getpending_Doctor);
router.get('/pending/nurse', userController.getpending_Nurse);
router.get('/pending/driver', userController.getpending_Driver);
router.post('/remove', userController.remove_employee);

router.get('/test', userController.show_all_test);
router.get('/test/:tid', userController.show_one_test);
router.post('/test/delete/:test_id', userController.deleteTESTQuery);



module.exports = router;
