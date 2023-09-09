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
        
    }
}

const all = "SELECT * FROM " + constant.TABLE_DRIVER ;

const one = "SELECT * FROM driver where driver_id = $1";
const patient_address = "SELECT street,thana,city,district FROM patient WHERE pid = $1"

const driverAll = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(all);
        const patient_address_details = await client.query(patient_address,[pid]);
        for(var i = 0; i < result.rows.length; i++){
            const hospital_id = result.rows[i].hospital_id;
            const driver = await client.query(userDetail,[result.rows[i].driver_id]);
            result.rows[i].driver_name = driver.rows[0].uname;
            result.rows[i].driver_phone = driver.rows[0].mobile_no;
            
            result.rows[i].patient_street = patient_address_details.rows[0].street;
            result.rows[i].patient_city = patient_address_details.rows[0].city;
            result.rows[i].patient_thana = patient_address_details.rows[0].thana;
            result.rows[i].patient_district = patient_address_details.rows[0].district;
            if(hospital_id == null){
                result.rows[i].hospital = "Self";
                const one_details = await client.query(one,[result.rows[i].driver_id]);
                result.rows[i].street = one_details.rows[0].street;
                result.rows[i].city = one_details.rows[0].city;
                result.rows[i].thana = one_details.rows[0].thana;
                result.rows[i].district = one_details.rows[0].district;

               
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
        
    }
}

const onedriver = async (did) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(one,[did]);
        const hospital_id = result.rows[0].hospital_id;
        const driver = await client.query(userDetail,[result.rows[0].driver_id]);
        result.rows[0].driver_name = driver.rows[0].uname;
        result.rows[0].driver_phone = driver.rows[0].mobile_no;
        if(hospital_id == null){
            result.rows[0].hospital = "Self";
        }
        else {
        const hospital_name = await client.query(hospitalname,[hospital_id]);
        result.rows[0].hospital = hospital_name.rows[0].hospital_name;
        result.rows[0].street = hospital_name.rows[0].street;
        result.rows[0].city = hospital_name.rows[0].city;
        result.rows[0].thana = hospital_name.rows[0].thana;
        result.rows[0].district = hospital_name.rows[0].district;
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
}





module.exports = {
    driverSearchByThana,
    driverSearchByPatientThana,
    driverAll,
    onedriver

}