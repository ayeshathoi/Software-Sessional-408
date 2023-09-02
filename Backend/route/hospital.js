const express = require('express');
const router = express.Router();
const userController = require('../Controller/hospital');

router.get('/doctor/:hid', userController.getAvailable_Doctor);
router.get('/nurse/:hid', userController.getAvailable_Nurse);
router.get('/driver/:hid', userController.getAvailable_Driver);
router.post('/updateprice/:hid', userController.update_price);
router.post('/addtest/:hid', userController.addTEST);
router.get('/complaint/:aid', userController.show_complaint);
router.post('/assign/nurse/:hid', userController.assign_nurse);
router.post('/update/employee/:hid', userController.update_employee);
router.get('/booking/:hid', userController.all_booking);
router.post('/booking/complaint/:hid', userController.show_complaint);
router.get('/pending/patient/:hid', userController.show_pending_checkup);
router.post('/pending/test/:hid', userController.show_pending_test);
router.get('/pending/doctor/:hid', userController.getpending_Doctor);
router.get('/pending/nurse/:hid', userController.getpending_Nurse);
router.get('/test/:hid', userController.show_all_test);
router.post('/remove/:hid', userController.remove_employee);

module.exports = router;
