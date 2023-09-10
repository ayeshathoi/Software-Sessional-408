const express = require('express');
var router = express.Router();
const userController = require('../Controller/review_complaint');
router.use(async (req,res,next) => {
    if(req.user && (req.user.user_type == 'patient'||req.user.user_type == 'hospital')){
        next();
    }
    else{
        res.send("UNAUTHORIZED");
    }
});
router.post('/:booking_id', userController.INSERT_RatingAndComplaint);
router.get('/', userController.show_complaint);
module.exports = router;