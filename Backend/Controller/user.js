const user = require('../Repository/user');
const http_status = require('./HTTPStatus');


//done
const create_hospital = async (req, res,hashedPassword) => {
    const hospital_name = req.body.hospital_name;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const street = req.body.street;
    const thana = req.body.thana;
    const city = req.body.city;
    const district = req.body.district;
    const reg_id = req.body.reg_id;

    try {
        const new_hospital = user.create_hospital(hospital_name,reg_id, email, pass, mobile, street, thana, city , district);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the hospital.' });
    }
};

//done
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

//done
const create_nurse = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const designation = req.body.designation;
    const hospital_name = req.body.hospital_name;
    const nid = req.body.nid;
    try {
       
        const new_nurse = await user.create_nurse(username,nid,email,pass,mobile,dob,gender,designation,hospital_name);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the nurse.' });
    }
};



//hospital er under e na hole street thana city district ditei hobe
//done
const create_driver = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const type = req.body.type;
    const hospital_name = req.body.hospital_name;
    const fare = req.body.fare;
    const street = req.body.street;
    const thana = req.body.thana;
    const city = req.body.city;
    const district = req.body.district;
    const nid = req.body.nid;

    try {
        const new_driver = await user.create_driver(username,email,pass,mobile,dob,gender,type,fare,
            hospital_name,street,thana,city,district,nid);
        res.status(http_status.CREATED).json({ created: true });
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the driver.' });
    }
};


//done
//error handling hoyto dekhte hobe
const create_doctor = async (req, res,hashedPassword) => {
    const username = req.body.uname;
    const nid = req.body.nid
    const email = req.body.email;
    const pass = hashedPassword;
    const mobile = req.body.mobile;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const qualification = req.body.qualification;
    const designation = req.body.designation;
    const speciality = req.body.speciality;
    const zoom_link = req.body.zoom_link;
    const old_patient_fee = req.body.old_patient_fee;
    const new_patient_fee = req.body.new_patient_fee;
    const { hospital_name } = req.body; 
    try
    {
        const new_doctor = await user.create_doctor(username,nid,email,pass,mobile,dob,gender,qualification,designation,speciality,zoom_link,
            old_patient_fee,new_patient_fee,hospital_name);
        res.status(http_status.CREATED).json({ created: true });
    }
    catch(error)
    {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while creating the doctor.' });
    }
}

const getUserDetailsByIDUtil = async (uid) => {
    try {
        const userDetails = await user.GET_USER_DETAIL(uid);
        return userDetails;
    } catch (error) {
        return null;
    }
};
const getUserDetailsByID = async (req, res) => {
    try {
        const userDetails = await user.GET_USER_DETAIL(req.user.uid);
        res.send(userDetails);
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching user details.' });
    }
};


const getUserDetailsByIDfrontend = async (req, res) => {
    try {
        const uid = req.user.uid;
        const userDetails = await user.GET_USER_DETAIL(uid);
        res.send(userDetails);
    } catch (error) {
        console.error(error);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching user details.' });
    }
};
        


const getUserDetailsByEmail = async (email) => {
    try {
        const userDetails = await user.GET_USER_DETAILEmail(email);
        return userDetails;
    } 
    catch (error) {
        console.error(error);
        return null;
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
    create_hospital,
    getHospitalDetailsByID,
    create_patient,
    create_nurse,
    getUserDetailsByIDfrontend,
    create_driver,
    create_doctor,
    getUserDetailsByIDUtil
};
