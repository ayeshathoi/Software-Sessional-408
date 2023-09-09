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
            try {
            if(!email || !password){
                 done(new Error('Email and Password are required'), null);
            }
            const user = await userController.getUserDetailsByEmail(email);

            if(!user){
                 done(new Error('Invalid Email or Password'), null);
            }

            try {

            const match = await bcrypt.compare(password,user[0].pass);
            if(match){
                done (null,user[0]);
            }
            
            else{

                done(new Error('Invalid Email or Password'), null);
            }
        }
        catch(err){
            done(err,null);
        }
        }
        catch(err){
            return done(err,null);
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