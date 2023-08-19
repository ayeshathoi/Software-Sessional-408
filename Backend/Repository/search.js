const getConnection = require('../Config/database');
const constant = require("./constants")
const hospital = require("./hospital")
const doctor = require("./doctor")
const patient = require("./patient")
const nurse = require("./nurse")
const driver = require("./driver")
const user = require("./user")


const driverSearchThana = "SELECT * FROM " + constant.TABLE_DRIVER + " WHERE " + 
                    constant.TABLE_DRIVER_THANA + " = $1 "                    

const hospitalname = "SELECT * FROM " + constant.TABLE_HOSPITAL + " WHERE " +
                    constant.TABLE_HOSPITAL_ID + " = $1 "

const userDetail = "SELECT * FROM users where uid = $1"                    

const driverSearchByThana = async (thana) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(driverSearchThana, [thana]);
        for(var i = 0; i < result.rows.length; i++){
            const hospital_id = result.rows[i].hospital_id;
            const driver = await client.query(userDetail,[result.rows[i].driver_id]);
            result.rows[i].driver_name = driver.rows[0].uname;
            result.rows[i].driver_phone = driver.rows[0].mobile_no;
            if(hospital_id == null){
                result.rows[i].hospital = "Not Assigned";
            }
            else {
            const hospital_name = await client.query(hospitalname,[hospital_id]);
            result.rows[i].hospital = hospital_name.rows[0].hospital_name;
            result.rows[i].street = hospital_name.rows[0].street;
            result.rows[i].city = hospital_name.rows[0].city;
            result.rows[i].thana = hospital_name.rows[0].thana;
            result.rows[i].district = hospital_name.rows[0].district;
            }
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const driver_by_patient_thana = "SELECT * FROM " + constant.TABLE_DRIVER + " WHERE " +
                                constant.TABLE_PATIENT_THANA + " = $1 "

const driverSearchByPatientThana = async (uid) => {
    try {
        const client = await getConnection.connect();
        const patient = await client.query(userDetail,[uid]);
        const result = await client.query(driver_by_patient_thana, [patient.rows[0].thana]);
        for(var i = 0; i < result.rows.length; i++){
            const hospital_id = result.rows[i].hospital_id;
            const driver = await client.query(userDetail,[result.rows[i].driver_id]);
            result.rows[i].driver_name = driver.rows[0].uname;
            result.rows[i].driver_phone = driver.rows[0].mobile_no;
            if(hospital_id == null){
                result.rows[i].hospital = "Not Assigned";
            }
            else {
            const hospital_name = await client.query(hospitalname,[hospital_id]);
            result.rows[i].hospital = hospital_name.rows[0].hospital_name;
            result.rows[i].street = hospital_name.rows[0].street;
            result.rows[i].city = hospital_name.rows[0].city;
            result.rows[i].thana = hospital_name.rows[0].thana;
            result.rows[i].district = hospital_name.rows[0].district;
            }
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const all = "SELECT * FROM " + constant.TABLE_DRIVER ;

const driverAll = async () => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(all);
        for(var i = 0; i < result.rows.length; i++){
            const hospital_id = result.rows[i].hospital_id;
            const driver = await client.query(userDetail,[result.rows[i].driver_id]);
            result.rows[i].driver_name = driver.rows[0].uname;
            result.rows[i].driver_phone = driver.rows[0].mobile_no;
            if(hospital_id == null){
                result.rows[i].hospital = "Self";
                continue;
            }
            else {
            const hospital_name = await client.query(hospitalname,[hospital_id]);
            result.rows[i].hospital = hospital_name.rows[0].hospital_name;
            result.rows[i].street = hospital_name.rows[0].street;
            result.rows[i].city = hospital_name.rows[0].city;
            result.rows[i].thana = hospital_name.rows[0].thana;
            result.rows[i].district = hospital_name.rows[0].district;
            }
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}




module.exports = {
    driverSearchByThana,
    driverSearchByPatientThana,
    driverAll

}