const express = require('express');
const router = express.Router();
const userController = require('../Controller/search');
router.use(async (req,res,next) => {
    if(req.user && req.user.user_type == 'patient'){
        next();
    }
    else{
        res.status(error.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
});
router.post('/ambulance', userController.Driver_search_Thana);

module.exports = router;