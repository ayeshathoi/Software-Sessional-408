const express = require('express');
const router = express.Router();
const userController = require('../Controller/review_complaint');

router.post('/:booking_id', userController.INSERT_RatingAndComplaint);
router.get('/:hospital_id', userController.show_complaint);
module.exports = router;
