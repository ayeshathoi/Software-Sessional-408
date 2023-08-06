const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./hospital")

//hospital e status dite hobe -- verified o deya jay
const approve_hospital = "UPDATE hospital SET status = 'Active' AND verifyStat = 'YES' WHERE hospital_id = $1"