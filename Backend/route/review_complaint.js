const express = require('express');
var router = express.Router();
const userController = require('../Controller/review_complaint');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'patient'){
        next();
    }
    else{
        res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
});
router.post('/:booking_id', userController.INSERT_RatingAndComplaint);

router = express.Router();
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'hospital'){
        next();
    }
    else{
        res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
});
router.get('/', userController.show_complaint);
module.exports = router;
