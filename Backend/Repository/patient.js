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

const all = "SELECT u.uname, b.time, b.date,d.designation, h.hospital_name, d.speciality, b.total_price "+
                            "FROM booking b " +
                            "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                            "JOIN hospital h ON b.hospital_id = h.hospital_id " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "WHERE b.patient_id = $1 AND b.type = 'Appointment'"

const allAppointments = async (pid) => {
    try {
        const client = await getConnection.connect();
        const allMeeting = await client.query(all, [pid]);

        client.release();
        return allMeeting.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};







const CheckUP = "SELECT a.time,a.date, t.testname, t.price,u.uname FROM booking a " +
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
const Ambulance = "SELECT a.time,a.date, u.uname, d.ambulance_type,a.hospital_id,a.total_price " +
                  "FROM booking a " +
                  "JOIN driver d ON a.driver_id = d.driver_id " +
                  "JOIN users u ON d.driver_id = u.uid " +
                  //"JOIN ambulance am ON d.ambulance_type = am.ambulance_type " +
                  "WHERE a.patient_id = $1 AND a.type = 'Ambulance'";

const hospitalname = "SELECT hospital_name,street,city,thana,district FROM hospital WHERE hospital_id = $1"
const ambulanceDetails = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(Ambulance, [pid]);
        for (let i = 0; i < result.rows.length; i++) 
        {
            const hospital_id = result.rows[i].hospital_id;
        if(result.rows[i].hospital_id == null){
            result.rows[i].hospital = "Self";
        }

        else {
        const hospital_name = await client.query(hospitalname,[hospital_id]);
        result.rows[i].hospital = hospital_name.rows[i].hospital_name;
        result.rows[i].street = hospital_name.rows[i].street;
        result.rows[i].city = hospital_name.rows[i].city;
        result.rows[i].thana = hospital_name.rows[i].thana;
        result.rows[i].district = hospital_name.rows[i].district;
        }
    }

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
                           "WHERE d.speciality = $1 AND d.employee_status = 'Available'";
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
const DoctorSearchByName =  "SELECT u.uname,u.mobile_no, d.designation, d.speciality,d.new_patient_fee " + 
                            "FROM doctor d " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "JOIN timeline t ON d.doctor_id = t.doctor_id " +
                            "WHERE u.uname = $1 AND d.employee_status = 'Available'";

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

const getPatientProfile = async (pid) => {
    try {
        const client = await getConnection.connect();
        const profileQuery = `
            SELECT
                u.uname AS name,
                p.street AS street,
                p.thana AS thana,
                p.city AS city,
                p.district AS district,
                u.mobile_no AS mobile_no
            FROM patient p
            JOIN users u ON p.pid = u.uid
            
            WHERE u.uid = $1
        `;
        const result = await client.query(profileQuery, [pid]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching patient profile:', error.message);
        throw error;
    }
};



//EDIT PROFILE 
const update_user = "UPDATE users SET " + constant.TABLE_USER_MOBILE_NO + " = $1 " + 
                    "WHERE " + constant.TABLE_USER_ID + " = $2";

const updateProfile =   "UPDATE " + constant.TABLE_PATIENT + " SET " +constant.TABLE_PATIENT_STREET + " = $1, " +
                        constant.TABLE_PATIENT_THANA + " = $2, " +
                        constant.TABLE_PATIENT_CITY + " = $3, " +
                        constant.TABLE_PATIENT_DISTRICT + " = $4 " +
                        "WHERE " + constant.TABLE_PATIENT_ID + " = $5"; 



//confused about document Update
const update_profile = async (street,thana,city, district,pid,mobile_no) => {
    try {
        const client = await getConnection.connect();
        console.log(mobile_no + " " + pid + " " + street + " " + thana + " " + city + " " + district)
        const result2 = await client.query(update_user, [mobile_no, pid]);
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

const TestList="SELECT t.testname,t.price ,h.hospital_name " +"FROM test t "+"JOIN hospital h ON t.hospital_id = h.hospital_id " ;
const testAllSearch = async () => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(TestList);
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
    allAppointments,
    onlineAppointments,
    checkUpDetails,
    ambulanceDetails,
    doctorSpecialitySearch,
    doctorNameSearch,
    checkUpHospitalDetails,
    getPatientProfile,
    update_profile,
    doctorAllSearch,
    testAllSearch
}