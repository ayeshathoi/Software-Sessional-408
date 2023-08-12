const user = require('../Repository/user');
const http_status = require('./HTTPStatus');
const bcryptjs = require('bcryptjs'); // Use bcryptjs library for hashing

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

const getUserDetailsByID = async (req, res) => {
    try {
        console.log(req.params.uid);
        const uid = req.params.uid;
        const userDetails = await user.GET_USER_DETAIL(uid);
        res.status(http_status.OK).json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching user details.' });
    }
};

const getUserDetailsByEmail = async (req, res) => {
    try {
        
        const email = req.body.email;
        const userDetails = await user.GET_USER_DETAILEmail(email);
        res.status(http_status.OK).json(userDetails);
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
    getHospitalDetailsByID
};
