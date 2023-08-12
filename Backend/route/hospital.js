const express = require('express');
const router = express.Router();
const userController = require('../Controller/hospital');

router.get('/doctor/:hid', userController.getAvailable_Doctor);
router.get('/nurse/:hid', userController.getAvailable_Nurse);
router.get('/driver/:hid', userController.getAvailable_Driver);
router.post('/updateprice/:hid', userController.update_price);
router.post('/addtest/:hid', userController.addTEST);
router.get('/complaint/:aid', userController.show_complaint);

module.exports = router;
