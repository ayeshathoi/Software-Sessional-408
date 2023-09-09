const express = require('express');
const router = express.Router();
const commnet = require('../Controller/commentBox');
router.use(async (req,res,next) => {
    if(req.user && (req.user.user_type == 'patient' || req.user.user_type == 'nurse' || req.user.user_type == 'doctor' || req.user.user_type == 'driver')){
        next();
    }
    else{
        //res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
        res.send("UNAUTHORIZED");
    }
});
router.post('/add', commnet.addingComment);
router.post('/get', commnet.all_Comment);

module.exports = router;