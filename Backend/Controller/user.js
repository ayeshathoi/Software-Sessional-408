const user = require('../Repository/user');
const http_status = require('./HTTPStatus');

const create_hospital = async (req, res,hashedPassword) => {
    const hospital_name = req.body.hospital_name;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const street = req.body.street;
    const thana = req.body.thana;
    const city = req.body.city;
    const district = req.body.district;

    try {

        const new_hospital = user.create_hospital(hospital_name, email, pass, mobile, street, thana, city , district);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the hospital.' });
    }
};

const create_patient = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const street = req.body.street;
    const thana = req.body.thana;
    const city = req.body.city;
    const district = req.body.district;
    try {
        const new_patient = user.create_patient(username,email,pass,mobile,dob,gender,street,thana,city,district);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the patient.' });
    }
};


const create_nurse = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const designation = req.body.designation;
    const document = null;
    const hospital_name = req.body.hospital_name;
    try {
        console.log(hospital_name);
        const new_nurse = user.create_nurse(username,email,pass,mobile,dob,gender,designation,document,hospital_name);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the nurse.' });
    }
};

const create_driver = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const type = req.body.type;
    const document = null;
    const hospital_name = req.body.hospital_name;
    console.log(hospital_name);
    try {
        const new_driver = user.create_driver(username,email,pass,mobile,dob,gender,type,document,hospital_name);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the driver.' });
    }
};

const getUserDetailsByID = async (uid, res) => {
    try {
        console.log(uid);
        const userDetails = await user.GET_USER_DETAIL(uid);
        return userDetails;
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching user details.' });
    }
};

const getUserDetailsByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const userDetails = await user.GET_USER_DETAILEmail(email);
        return userDetails;
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching user details.' });
    }
};


const getHospitalDetailsByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const hospitalDetails = await user.GET_HOSPITAL_DETAIL(email);
        return hospitalDetails;
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching hospital details.' });
    }
};


const getHospitalDetailsByID = async (hid, res) => {
    try {
        
        const hospitalDetails = await user.GET_HOSPITAL_DETAILID(hid);
        return hospitalDetails;
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching hospital details.' });
    }
};

module.exports = {
    getUserDetailsByID,
    getUserDetailsByEmail,
    getHospitalDetailsByEmail,
    create_hospital,
    getHospitalDetailsByID,
    create_patient,
    create_nurse,
    create_driver
};
