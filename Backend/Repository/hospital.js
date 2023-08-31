const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")

const Available_Doctor = "SELECT u.email,u,user_type, u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", d.speciality ,u.email " +
                        "FROM doctor_hospital dh " +
                        "JOIN doctor d ON dh.doctor_id = d.doctor_id " +
                        "JOIN users u ON dh.doctor_id = u.uid " +
                        "WHERE dh.hospital_id = $1 AND d.employee_status = 'Available'" 
    
const availableDoctor = async (hid) => {
    try {
        const client = await getConnection.connect();
        console.log(hid);
        const result = await client.query(Available_Doctor, [hid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}


const AVAILABE_NURSE =  "SELECT u.email,u,user_type,u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", n.designation,u.email " +
                        "FROM nurse n " +
                        "JOIN users u ON n.nurse_id = u.uid " +
                        "WHERE n.hospital_id = $1 AND n.employee_status = 'Available'" 


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

const AVAILABE_Driver = "SELECT u.email,u.user_type,u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ",u.email, d.ambulance_type " +
                        "FROM driver d " +
                        "JOIN users u ON d.driver_id = u.uid " +
                        "WHERE d.hospital_id = $1 AND d.employee_status = 'Available'" 

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

// update employee status of doctor/nurse/driver
const find_id = "SELECT uid,user_type FROM users WHERE " + constant.TABLE_USER_EMAIL + "= $1"
const fetchDoctorIdsQuery = "SELECT doctor_id FROM doctor_hospital WHERE hospital_id = $1 AND doctor_id = $2";
const update_doctor_employee = "UPDATE doctor SET employee_status = 'Available' "+
                                "WHERE doctor_id = $1"
const update_nurse_employee = "UPDATE nurse SET employee_status = 'Available' WHERE nurse_id = $1 AND hospital_id = $2"
const update_driver_employee = "UPDATE driver SET employee_status = 'Available' WHERE driver_id = $1 AND hospital_id = $2"

const update_employee_hospital = async (email, hospital_id) => {
    const client = await getConnection.connect();
    try {
        const found_id = await client.query(find_id, [email]);
        const id = found_id.rows[0].uid;
        const employee_type = found_id.rows[0].user_type;
        if(employee_type == "doctor"){
            const doctor_find = await client.query(fetchDoctorIdsQuery, [hospital_id,id]);
            if (doctor_find.rows.length > 0){
                const doctor_id_in_hospital = doctor_find.rows[0].doctor_id;
                const result = await client.query(update_doctor_employee, [doctor_id_in_hospital]);
                client.release();
                return result.rows;   
            }       
        }
        else if(employee_type == "nurse"){
            const result = await client.query(update_nurse_employee, [id, hospital_id]);
            client.release();
            return result.rows;
        }
        else if(employee_type == "driver"){
            const result = await client.query(update_driver_employee, [id, hospital_id]);
            client.release();
            return result.rows;
        }
        client.release();
        return ;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}
//------------------------------------------------------------------------

//------------------assign nurse to test------------------//
const findtest_id = "SELECT testid FROM test WHERE testname = $1 AND hospital_id = $2"
const assign_nurse = "INSERT INTO nurse_test (test_id, nurse_id) VALUES ($1, $2)"
const update_appointment_status = "UPDATE booking SET booking_status = 'approved' , nurse_id =$1 WHERE booking_id = $2"

//used email to search the nurse
const assign_nurse_to_test = async (nurse_email, booking_id) => {
    try {
        const client = await getConnection.connect();
        const nurse = await client.query(find_id,[nurse_email]);
        const nurse_id = nurse.rows[0].uid;
        const result2 = await client.query(update_appointment_status, [nurse_id,booking_id]);
        client.release();
        
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

//--------------------------------------------//

const all_booking = "SELECT b.booking_id FROM booking b " +
"WHERE b.hospital_id = $1"

const booking_total = async (hospital_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(all_booking, [hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}



const show_complaint_text = "SELECT r.complaint_text FROM review r " +
                        "JOIN booking b ON r.booking_id = b.booking_id " +
                        "WHERE b.booking_id = $1 AND b.hospital_id = $2"

const show_complaint = async (booking_id,hospital_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(show_complaint_text, [booking_id,hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

// show patient request for check up test non assigned
const show_patient_request = "SELECT u.uname, b.date, b.booking_status, b.type " +
                            "FROM booking b " +
                            "JOIN users u ON b.patient_id = u.uid " +
                            "WHERE b.hospital_id = $1 AND b.booking_status = 'pending' AND b.type = 'Checkup'"

const show_patient_request_checkup = async (hospital_id) => {
    try {
        const client = await getConnection.connect();
        console.log(hospital_id);
        const result = await client.query(show_patient_request, [hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}


const show_pending_tests = "SELECT t.testname , t.price "
                            +"FROM test t "
                            +"JOIN booking_tests bt ON t.testid = bt.test_id "
                            +"JOIN booking b ON bt.booking_id = b.booking_id " +
                            "WHERE bt.booking_id = $1"

const pending_test = async (booking_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(show_pending_tests, [booking_id]);   
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const Pending_Doctor = "SELECT u.uid, u.user_type, u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", d.speciality ,u.email " +
                        "FROM doctor_hospital dh " +
                        "JOIN doctor d ON dh.doctor_id = d.doctor_id " +
                        "JOIN users u ON dh.doctor_id = u.uid " +
                        "WHERE dh.hospital_id = $1 AND d.employee_status = 'pending'" 


const pendingDoctor = async (hid) => {
    try {
        const client = await getConnection.connect();
        console.log(hid);
        const result = await client.query(Pending_Doctor, [hid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const Pending_Nurse = "SELECT u.uid, u.user_type, u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ",n.designation, u.email " +
                        "FROM nurse n "+
                        "JOIN users u ON n.nurse_id = u.uid " +
                        "WHERE n.hospital_id = $1 AND n.employee_status = 'pending'" 

const pendingNurse = async (hid) => {
    try {
        const client = await getConnection.connect();
        console.log(hid);
        const result = await client.query(Pending_Nurse, [hid]);
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
    update_employee_hospital,
    assign_nurse_to_test,
    show_complaint,
    booking_total,
    show_patient_request_checkup,
    pending_test,
    pendingDoctor,
    pendingNurse
}