const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const api = require('./route/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const JWT_SECRET_KEY = 'this-is-not-good'
app.use(cors());
app.use(bodyParser.json());

app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*',cors());
app.use(express.json());

app.use('/',api);


app.use(session
    ({
     secret : JWT_SECRET_KEY,
     resave : false,
     saveUninitialized : false,
     })
 )


app.get('/', (req, res) => {
    res.cookie('visited', true,{
        maxAge: 60000*30,
    });
    res.send(req.sessionID);
});


app.get('/api', (req, res) => {
    res.send('I dont care at all!');
});



module.exports = app;

