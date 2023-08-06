const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")

const Available_Doctor = "SELECT u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", d.speciality " +
                        "FROM doctor d " +
                        "JOIN users u ON d.doctor_id = u.uid " +
                        "JOIN doctor_hospital dh ON d.doctor_id = dh.doctor_id " +
                        "JOIN hospital h ON dh.hospital_id = h.hospital_id " +
                        "WHERE h.hospital_id = $1 AND d.status = 'Active'" 
                        //AND d.doctor_id NOT IN (SELECT doctor_id FROM appointment WHERE time = $2 AND date = $3 AND type = 'Appointment')"

const availableDoctor = async (hid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(Available_Doctor, [hid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}


const AVAILABE_NURSE =  "SELECT u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", n.designation " +
                        "FROM nurse n " +
                        "JOIN users u ON n.nurse_id = u.uid " +
                        "WHERE n.hospital_id = $1 AND n.status = 'Active'" 


const available_nurse = async (hid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(AVAILABE_NURSE, [hid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const AVAILABE_Driver = "SELECT u.uname, u."+ constant.TABLE_USER_MOBILE_NO + " " +
                        "FROM driver d " +
                        "JOIN users u ON d.driver_id = u.uid " +
                        "WHERE d.hospital_id = $1 AND d.status = 'Active'" 

const available_driver = async (hid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(AVAILABE_Driver, [hid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}


const ADD_TEST = "INSERT INTO test (testname,price, hospital_id) VALUES ($1, $2, $3)"


const addtest = async (testname, price, hospital_id) => {
    try {
        const client = await getConnection.connect();
        // const nid = await client.query(find_id, [nurse_mobile_no]);
        // const nid2 = nid[0].uid.toString();
        const result = await client.query(ADD_TEST, [testname, price, hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}


const update_Price = "UPDATE test SET price = $1 WHERE testname = $2 AND hospital_id = $3"

const updateTESTPrice = async (testname, price, hospital_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(update_Price, [price, testname, hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

//sent a doctor object/nurse object/driver object
const update_doctor_employee = "UPDATE doctor SET status = 'active' WHERE doctor_id = $1 "
const update_nurse_employee = "UPDATE nurse SET status = 'active' WHERE nurse_id = $1 AND hospital_id = $2"
const update_driver_employee = "UPDATE driver SET status = 'active' WHERE driver_id = $1 AND hospital_id = $2"

//check
const update_employee = async (employee, id, hospital_id) => {
    try {
        const client = await getConnection.connect();
        if(employee == "Doctor"){
            const result = await client.query(update_doctor_employee, [id]);
        }
        else if(employee == "Nurse"){
            const result = await client.query(update_nurse_employee, [id, hospital_id]);
        }
        else if(employee == "Driver"){
            const result = await client.query(update_driver_employee, [id, hospital_id]);
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const find_id = "SELECT uid FROM users WHERE " + constant.TABLE_USER_MOBILE_NO + "= $1"
//assign available nurse to a test
const assign_nurse = "INSERT INTO nurse_test (test_id, nurse_id) VALUES ($1, $2)"
const update_appointment_status = "UPDATE appointment SET status = 'Booked' WHERE appoint_id = $1"

// there is a unique thing - mobile no. use it maybe or sent a nurse object
const assign_nurse_to_test = async (test_id, nurse_mobile, appoint_id) => {
    try {
        const client = await getConnection.connect();
        const nurse_id = await client.query(find_id,[nurse_mobile]);
        const result = await client.query(assign_nurse, [test_id, nurse_id]);
        const result2 = await client.query(update_appointment_status, [appoint_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

//driver assign er kono meaning ase?

const show_complaint_text = "SELECT a.complaint_text FROM appointment a " +
                            "WHERE a.appoint_id = $1"
// if the nurse/doctor/driver is of the hospital?


const show_complaint = async (appoint_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(show_complaint_text, [appoint_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}




module.exports = {
    availableDoctor,
    available_nurse,
    available_driver,
    addtest,
    updateTESTPrice,
    update_employee,
    assign_nurse_to_test,
    show_complaint
}