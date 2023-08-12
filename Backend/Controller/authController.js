// controllers/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Repository/user');
const HttpStatus = require("../Controller/HTTPStatus");

require('dotenv').config();
// Other required imports

const signup_get = async (req, res) => {
  res.render('signup');
};

const signup_post = async (req, res) => {
  res.send('new signup') 
};


const login_get = async (req, res) => {
  res.render('signup');
};


const login_post = async (req, res) => {
  const username = req.body.username;
  const user = { name : username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
};


module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post
};
