const express = require('express');
const router = express.Router();
const userController = require('../Controller/nurse');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'nurse'){
        next();
    }
    else{
        // res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
        res.send("UNAUTHORIZED");
    }
});
router.get('/checkup', userController.getPatient_List);
router.get('/profile', userController.getProfile);
router.put('/editProfile', userController.editProfile)
router.get('/', userController.nursepr);

module.exports = router;
