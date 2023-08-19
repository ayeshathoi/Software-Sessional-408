const express = require('express');
const router = express.Router();
const userController = require('../Controller/driver');


router.get('/order/:id', userController.getPatient_List);
router.put('/editProfile/:id', userController.update_profile)
router.get('/:id', userController.oneDriverdetail);

module.exports = router;
