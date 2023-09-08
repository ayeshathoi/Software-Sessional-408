const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")


//appointment e total fare rakhte hobe
const patientList =         "SELECT a.booking_id,u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", a.time, a.date " +
                            "FROM booking a " +
                            "JOIN nurse n ON a.nurse_id = n.nurse_id " +
                            "JOIN users u ON a.patient_id = u.uid " +
                            "WHERE a.nurse_id = $1 AND a.type = 'Checkup'"


const nursedetail = "SELECT u.uname, u."+ constant.TABLE_USER_MOBILE_NO +
                    " ,u." + constant.TABLE_USER_TYPE + 
                    ", n." + constant.TABLE_NURSE_DESIGNATION + 
                    ", n." + constant.TABLE_NURSE_STATUS + 
                    ", n." + constant.TABLE_NURSE_HOSPITAL + " " +
                    ", u." + constant.TABLE_USER_EMAIL + " " +
                    "FROM nurse n " +
                    "JOIN users u ON n.nurse_id = u.uid " +
                    "WHERE n.nurse_id = $1"


const patientListDetails_nurse = async (nid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(patientList, [nid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}
const getNurseProfile = async (nurse_id) => {
    try {
        const client = await getConnection.connect();
        const profileQuery = `
            SELECT
                u.uname AS name,
                n.designation AS designation,
                h.hospital_name AS hospital,
                u.mobile_no AS mobile_no
            FROM nurse n
            JOIN users u ON n.nurse_id = u.uid
            JOIN hospital h ON n.hospital_id = h.hospital_id
            WHERE u.uid = $1
        `;
        const result = await client.query(profileQuery, [nurse_id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching nurse profile:', error.message);
        throw error;
    }
};


const update_user = "UPDATE users SET " + constant.TABLE_USER_MOBILE_NO + " = $1 " + 
                   // , " + constant.TABLE_USER_EMAIL + " = $2 " +
                    "WHERE " + constant.TABLE_USER_ID + " = $2";

const updateProfile = "UPDATE nurse SET " + constant.TABLE_NURSE_DESIGNATION + " = $1 " +
                    "WHERE " + constant.TABLE_NURSE_ID + " = $2";



const update_profile = async (designation,nid,mobile_no) => {
    try {
        const client = await getConnection.connect();
        const result2 = await client.query(update_user, [mobile_no, nid]);
        const result = await client.query(updateProfile, [designation,nid]);
        client.release();
        return result.rowsAffected === 1;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}
const hospitalname = "SELECT * FROM " + constant.TABLE_HOSPITAL + " WHERE " +
                    constant.TABLE_HOSPITAL_ID + " = $1 "

const nurse = async (nid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(nursedetail, [nid]);
        const hospital_id = result.rows[0].hospital_id;
        const hospital_name = await client.query(hospitalname,[hospital_id]);
        result.rows[0].hospital = hospital_name.rows[0].hospital_name;
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

module.exports = {
    patientListDetails_nurse,
    getNurseProfile,
    update_profile,
    nurse
}