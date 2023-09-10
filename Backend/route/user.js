const express = require('express');
const router = express.Router();
const userController = require('../Controller/user');
router.use(async (req,res,next) => {
    console.log(req.user);
    if(req.user){
        next();
    }
    else{
        res.send("UNAUTHORIZED");
    }
});
router.get('/', userController.getUserDetailsByID);
router.get('/frontend', userController.getUserDetailsByIDfrontend);
router.get('/:email', userController.getUserDetailsByEmail);
router.post('/create_hospital', userController.create_hospital);
module.exports = router;
