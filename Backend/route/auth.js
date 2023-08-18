const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/auth');
const error = require('../Controller/HTTPStatus');
const createhos = require('../Controller/user');
const errors = [];

const router = require('express-promise-router')();
const secretKey = "secretKey";


router.post('/register/hospital', async (req, res) => {
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_hospital(req,res,hashedPassword);
    
});



router.post('/register/patient', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_patient(req,res,hashedPassword);
    
});

router.post('/register/nurse', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_nurse(req,res,hashedPassword);
});


router.post('/register/doctor', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_doctor(req,res,hashedPassword);
});

router.post('/register/driver', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_driver(req,res,hashedPassword);
});

router.post('/login', async (req, res) => {
    result = await createhos.getHospitalDetailsByEmail(req,res);
    userRes = await createhos.getUserDetailsByEmail(req,res);
    if (result.length ==0 && userRes.length == 0){
        console.log('Email not found');
        errors.push(error.email_not_found);
    }
   
    else {

        if (result.length !== 0) 
        {
            {
                console.log(result)
                const validPass = await bcrypt.compare(req.body.password, result[0].pass);
                if (validPass) {
                    const token = jwt.sign({ hospital_id: result[0].hospital_id}, secretKey, { expiresIn: '1h' });
                    let options = {
                        maxAge: 90000000, 
                        httpOnly: true
                    }
                    res.cookie('auth-token', token, options);
                    if(errors.length == 0){
                        const hospital_id=result[0].hospital_id;
                        res.send({ uid : hospital_id,type : "hospital", backendCookie : token});
                
                    }
                }
            }
        }
        else if (userRes.length !== 0){
            const validPassUser = await bcrypt.compare(req.body.password, userRes[0].pass);
            console.log(userRes[0].uid);

            if (validPassUser){
                const token = jwt.sign({ uid: userRes[0].uid}, secretKey, { expiresIn: '1h' });
                let options = {
                    maxAge: 90000000, 
                    httpOnly: true
                }
            res.cookie('auth-token', token, options);
            if(errors.length == 0){
                const user=userRes[0].user_type;
                const uid=userRes[0].uid;
                //change it to nurses,doctors,drivers, patient or add type to user table to store usertype
                res.send({uid : uid, type : user, backendCookie : token});    
                }
            }
        }
    
        else {
            console.log('Invalid password');
            errors.push(error.invalid_password);
        }  
    }
    // redirect to the home page of hospital after login 
});

router.post('/hospital/logout', verify.hospital_verify ,(req,res)=>{
    res.cookie('auth-token', '', { maxAge:1 });
    res.redirect('/');
});


router.post('/logout', verify.user_verify ,(req,res)=>{
    res.cookie('auth-token', '', { maxAge:1 });
    res.redirect('/');
});





module.exports = router;