const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verify} = require('../middleware/testauth');
const error = require('../Controller/HTTPStatus');
const createhos = require('../Controller/user');
const errors = [];

const router = require('express-promise-router')();
const secretKey = "secretKey";


router.post('/register', async (req, res) => {
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let result;
    result = await createhos.create_hospital(req,res,hashedPassword);
    
});

router.post('/login', async (req, res) => {
    
    let result = [];
    result = await createhos.getHospitalDetailsByEmail(req,res);
    if (result === undefined) {
        console.log('Email not found');
        errors.push(error.email_not_found);
    } else {
        const validPass = await bcrypt.compare(req.body.password, result[0].pass);
        if (validPass) {

            const token = jwt.sign({ hospital_id: result[0].hospital_id}, secretKey, { expiresIn: '1h' });
            let options = {
                maxAge: 90000000, 
                httpOnly: true
            }
            //console.log(token.hospital_id);
            res.cookie('auth-token', token, options);
        }
        else {
            console.log('Invalid password');
            errors.push(error.invalid_password);
        }
    }
    // redirect to the home page of hospital after login
    if(errors.length == 0){
        res.redirect("http://localhost:3000/hospital/1");
    }
    
});

router.post('/logout', verify ,(req,res)=>{
    res.cookie('auth-token', '', { maxAge:1 });
    res.redirect('/');
});

router.get('/hospital_id', verify, (req,res)=>{
    res.send({hospital_id : req.createhos.hospital_id});
});




module.exports = router;