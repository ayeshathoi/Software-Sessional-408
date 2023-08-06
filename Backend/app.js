const express = require('express');
const app = express();
const api = require('./route/api');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*',cors());
app.use(express.json());

app.use('/',api);

module.exports = app;

