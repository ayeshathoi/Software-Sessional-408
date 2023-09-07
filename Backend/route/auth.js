const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
//const verify = require('../middleware/auth');
const error = require('../Controller/HTTPStatus');
const userController = require('../Controller/user');
const passport = require('passport');
const errors = [];

const router = require('express-promise-router')();



router.post('/register/hospital', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await userController.create_hospital(req,res,hashedPassword);
    
});

router.post('/register/patient', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await userController.create_patient(req,res,hashedPassword);
    
});

router.post('/register/nurse', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await userController.create_nurse(req,res,hashedPassword);
});


router.post('/register/doctor', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await userController.create_doctor(req,res,hashedPassword);
});

router.post('/register/driver', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await userController.create_driver(req,res,hashedPassword);
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;
    console.log(user.user_type);
    if(user.user_type != 'patient' && user.user_type != 'hospital' && user.user_type != 'driver' && user.user_type != 'doctor' && user.user_type != 'nurse'){
        res.status(error.BAD_REQUEST).json({ error: 'An error occurred while logging in.' });
    }
    
    else 
     res.status(error.OK).send(user.user_type);
});

// router.post('/hospital/logout', verify.hospital_verify ,(req,res)=>{
//     res.cookie('auth-token', '', { maxAge:1 });
//     res.redirect('/');
// });


// router.post('/logout', verify.user_verify ,(req,res)=>{
//     res.cookie('auth-token', '', { maxAge:1 });
//     res.redirect('/');
// });





module.exports = router;