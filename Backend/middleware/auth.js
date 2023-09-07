require('dotenv').config();
const jwt = require('jsonwebtoken');
const userController = require('../Controller/user');
const user = require('../Repository/user');
const secretKey = "secretKey";

//middleware function to verify the jwt token and find the user who is currently logged in
async function hospital_verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/patient/hospital/testnames');
    //const token = cookie.split(' ')[1].split('=')[1]
    const token = cookie.split('=')[1];
    try{
        const verified = jwt.verify(token, secretKey).hospital_id;
        console.log(verified);
        req.user =await userController.getHospitalDetailsByID(verified);
        next();

    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function user_verify(req,res,next){
    const cookie  = req.header('cookie');
    const token = cookie.split('=')[1];
    if(!cookie) 
    {
        return res.redirect('/patient/user/testnames');
    }
    try{
        const verified = jwt.verify(token, secretKey).uid;
        req.user =await userController.getUserDetailsByID(verified);
        console.log(req.user);
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}
        


module.exports = {
    hospital_verify,
    user_verify

}