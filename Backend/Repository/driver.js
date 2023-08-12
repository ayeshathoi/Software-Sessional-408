const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")

//appointment e total fare rakhte hobe
const patientList =         "SELECT u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", a.time " +
                            "FROM appointment a " +
                            "JOIN driver n ON a.driver_id = n.driver_id " +
                            "JOIN users u ON a.patient_id = u.uid " +
                            "WHERE a.driver_id = $1 AND a.type = 'Ambulance'"

const patientListDetails_driver = async (drid) => {
    try {
        const client = await getConnection.connect();
        
        const result = await client.query(patientList, [drid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const update_user = "UPDATE users SET " + constant.TABLE_USER_MOBILE_NO + " = $1 " + 
                   // , " + constant.TABLE_USER_EMAIL + " = $2 " +
                    "WHERE " + constant.TABLE_USER_ID + " = $2";

const updateProfile = "UPDATE driver SET " +constant.TABLE_DRIVER_HOSPITAL + " = $1 " +
                    "WHERE " + constant.TABLE_DRIVER_ID + " = $2";



//confused about document Update
const update_profile = async (hospital, did,mobile) => {
    try {
        const client = await getConnection.connect();
  
        const hid = await user.findhid(hospital);
        const hid2 = hid[0].hospital_id.toString();
        const result2 = await client.query(update_user, [mobile, did]);
        const result = await client.query(updateProfile, [hid2, did]);
        client.release();
        return result.rowsAffected === 1;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

module.exports = {
    patientListDetails_driver,
    update_profile
}