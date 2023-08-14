const express = require('express');
const router = express.Router();
const userController = require('../Controller/review_complaint');

router.post('/:booking_id', userController.INSERT_RatingAndComplaint);

module.exports = router;
