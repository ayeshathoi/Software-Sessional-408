const express = require('express');
const router = express.Router();
const userController = require('../Controller/review_complaint');

router.post('/:appointid', userController.updateRatingAndComplaint);

module.exports = router;
