const getConnection = require('../Config/database');
const constant = require("./constants")

// booking er moddhe hospital id na thakar mane hocche online meeting
const appointmentDetails = "SELECT u.uname, b.time, b.date, d.zoom_link, d.designation, d.speciality, b.total_price "+
                            "FROM booking b " +
                            "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "WHERE b.patient_id = $1 AND b.type = 'Appointment' AND b.hospital_id IS NULL"

const onlineAppointments = async (pid) => {
    try {
        const client = await getConnection.connect();
        const zoomMeeting = await client.query(appointmentDetails, [pid]);

        client.release();
        return zoomMeeting.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const inperson = "SELECT u.uname, b.time, b.date,d.designation, h.hospital_name, d.speciality, b.total_price "+
                            "FROM booking b " +
                            "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                            "JOIN hospital h ON b.hospital_id = h.hospital_id " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "WHERE b.patient_id = $1 AND b.type = 'Appointment' AND b.hospital_id IS NOT NULL"

const InpersonAppointments = async (pid) => {
    try {
        const client = await getConnection.connect();
        const inpersonMeeting = await client.query(inperson, [pid]);

        client.release();
        return inpersonMeeting.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};







const CheckUP = "SELECT a.time, t.testname, t.price,u.uname FROM booking a " +
                "JOIN nurse_test nt ON a.nurse_id = nt.nurse_id " +
                "JOIN users u ON nt.nurse_id = u.uid "+
                "JOIN test t ON t.testID = nt.test_id " + 
                "JOIN patient p ON a.patient_id = p.pid "+
                "WHERE a.patient_id = $1 AND a.type = 'Checkup'";

const checkUpDetails = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CheckUP, [pid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//driver er hospital eishob fixed kra lagbe
const Ambulance = "SELECT a.time, u.uname, d.ambulance_type " +
                  "FROM appointment a " +
                  "JOIN driver d ON a.driver_id = d.driver_id " +
                  "JOIN users u ON d.driver_id = u.uid " +
                  //"JOIN ambulance am ON d.ambulance_type = am.ambulance_type " +
                  "WHERE a.patient_id = $1 AND a.type = 'Ambulance'";

const ambulanceDetails = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(Ambulance, [pid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//Doctor Search BY name
//Doctor Search By Speciality

const DoctorSearchBySpeciality = "SELECT u.uname,u.mobile_no,u.email, d.designation, d.speciality,d.new_patient_fee,t.meeting_type " + 
                           "FROM doctor d " +
                           "JOIN users u ON d.doctor_id = u.uid " +
                           "JOIN timeline t ON d.doctor_id = t.doctor_id " +
                           "WHERE d.speciality = $1 ANd d.employee_status = 'Available'";
//patient type
const doctorSpecialitySearch = async (speciality) => {
    try {
        const client = await getConnection.connect();
        console.log(speciality)
        const result = await client.query(DoctorSearchBySpeciality, [speciality]);
        console.log("Here ",result.rows)
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
// yourDoctor.com/DoctorSearch/:NAME
const DoctorSearchByName =  "SELECT u.uname,u.mobile_no, d.designation, d.speciality,t.new_patient_fee " + 
                            "FROM doctor d " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "JOIN timeline t ON d.doctor_id = t.doctor_id " +
                            "WHERE u.uname = $1 AND d.status = 'Active'";

// yourDoctor.com/DoctorSearch/:Speciality
const doctorNameSearch = async (name) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(DoctorSearchByName, [name]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//yourDoctor/HealthCareSearch/:Hospital_ID
const CheckUP_Hospital = "SELECT t.testname,t.price, h.hospital_name from test t "+
                         "JOIN hospital h ON t.hospital_id = h.hospital_id "+
                         "where h.hospital_name = $1"
const checkUpHospitalDetails = async (hospital) => {
    try {
        console.log("HELLOOOOO");
        const client = await getConnection.connect();
        const result = await client.query(CheckUP_Hospital, [hospital]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
        
//yourDoctor.com/AmbulanceSearch/:Thana





//EDIT PROFILE 
const update_user = "UPDATE users SET " + constant.TABLE_USER_MOBILE_NO + " = $1 " + 
                    "WHERE " + constant.TABLE_USER_ID + " = $2";

const updateProfile =   "UPDATE " + constant.TABLE_PATIENT + " SET " +constant.TABLE_PATIENT_STREET + " = $1, " +
                        constant.TABLE_PATIENT_THANA + " = $2, " +
                        constant.TABLE_PATIENT_CITY + " = $3, " +
                        constant.TABLE_PATIENT_DISTRICT + " = $4 " +
                        "WHERE " + constant.TABLE_PATIENT_ID + " = $5"; 



//confused about document Update
const update_profile = async (street,thana,city, district,pid,mobile) => {
    try {
        const client = await getConnection.connect();
        console.log(mobile + " " + pid + " " + street + " " + thana + " " + city + " " + district)
        const result2 = await client.query(update_user, [mobile, pid]);
        const result = await client.query(updateProfile, [street,thana,city,district,pid]);
        client.release();
        return result.rowsAffected === 1;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const DoctorList= "SELECT u.uname,u.mobile_no,u.email, d.designation, d.speciality,d.new_patient_fee, d.doctor_id, h.hospital_name " + 
                  "FROM doctor d " +
                  "JOIN users u ON d.doctor_id = u.uid "+
                  "JOIN doctor_hospital dh ON d.doctor_id = dh.doctor_id " +
                  "JOIN hospital h ON dh.hospital_id = h.hospital_id "  ;

const doctorAllSearch = async () => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(DoctorList);
        console.log("Here ",result.rows)
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

module.exports = { 
    InpersonAppointments,
    onlineAppointments,
    checkUpDetails,
    ambulanceDetails,
    doctorSpecialitySearch,
    doctorNameSearch,
    checkUpHospitalDetails,
    update_profile,
    doctorAllSearch
}