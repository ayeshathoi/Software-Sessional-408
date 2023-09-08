const passport = require('passport');
const {Strategy} = require('passport-local');
const userController = require('../Controller/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(
    new Strategy(
        {
            usernameField : 'email',
        },
        async (email,password,done) => {
            if(!email || !password){
                 done(new Error('Email and Password are required'), null);
            }
            const user = await userController.getUserDetailsByEmail(email);

            if(!user){
                 done(new Error('Invalid Email or Password'), null);
            }
            const match = bcrypt.compare(password,user[0].pass);

            if(match){
                return done (null,user[0]);
            }
            
            else{
                return done(new Error('Invalid Email or Password'), null);
            }
            
        }
        )
    );

passport.serializeUser((user,done) => {

    try 
    {
        if(!user){
            done(new Error('Unauthorized'), null);
        }
        else done(null,user.uid);

    }
    catch(err){
        done(err,null);
    }
}
);

passport.deserializeUser (async (uid,done) => {
    try{
        const user = await userController.getUserDetailsByIDUtil(uid);
        if(!user || user.length != 1){
            done(new Error('Unauthorized'), null);
        }else{
            done(null,user[0]);
        }
    }
    catch(err){
        done(err,null);
    }
});


module.exports = passport;