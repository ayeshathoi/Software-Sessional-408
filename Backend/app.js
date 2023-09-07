const express = require('express');
const app = express();
const api = require('./route/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
require("dotenv").config();
const passport = require('passport')
require('./Strategies/local');

app.use(cors(
    {
        origin : process.env.ORIGIN,
        credentials : true,
    }
));

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session
    ({
     secret : process.env.SECRET,
     resave : false,
     saveUninitialized : false,
     cookie:{maxAge:3600000} 
    })
 )


app.use(passport.initialize());
app.use(passport.session());

app.use('/',api);


module.exports = app;
