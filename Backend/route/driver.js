const express = require('express');
const router = express.Router();
const userController = require('../Controller/driver');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'driver'){
        next();
    }
    else{
        //res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
        // res.render('error', { title: 'Error', message: 'Unauthorized' });
        res.send("UNAUTHORIZED");
    }
});

router.get('/order', userController.getPatient_List);
router.get('/profile', userController.getProfile);
router.put('/editProfile', userController.update_profile)
router.get('/', userController.oneDriverdetail);

module.exports = router;
