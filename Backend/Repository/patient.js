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
        
    }
};

const all = "SELECT b.doctor_id,u.uname,b.type,d.zoom_link ,b.booking_id, b.time, b.date,d.designation, b.appointment_serial, b.time,h.hospital_name, d.speciality, b.total_price "+
                            "FROM booking b " +
                            "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                            "JOIN hospital h ON b.hospital_id = h.hospital_id " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "WHERE b.patient_id = $1 AND (b.type = 'Appointment' OR b.type ='Online')"

const check = "select * from booking where patient_id = $1 and doctor_id = $2 and appointment_serial != -1"

const allAppointments = async (pid) => {
    try {
        const client = await getConnection.connect();
        const allMeeting = await client.query(all, [pid]);
        for (let i = 0; i < allMeeting.rows.length; i++) {
            const check1 = await client.query(check, [pid, allMeeting.rows[i].doctor_id]);
            if(check1.rows.length === 1){
                allMeeting.rows[i].booked = "New Patient";
            }
            else{
                allMeeting.rows[i].booked = "Old Patient";
            }
        }

        client.release();
        return allMeeting.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};







// const CheckUP = `
//   SELECT a.booking_id, a.time, a.date, t.testname, t.price, u.uname AS patient_name, a.nurse_id, 
//          (SELECT u2.uname FROM nurse n2 JOIN users u2 ON n2.nurse_id = u2.uid WHERE n2.nurse_id = a.nurse_id) AS nurse_name
//   FROM booking a
//   JOIN booking_tests bt ON a.booking_id = bt.booking_id
//   JOIN test t ON t.testid = bt.test_id
//   JOIN patient p ON a.patient_id = p.pid
//   JOIN users u ON p.pid = u.uid
//   WHERE a.patient_id = $1 AND a.type = 'Checkup' AND a.nurse_id IS NOT NULL
// `;

const testNames = "SELECT testname FROM test " +
                    "Join booking_tests  ON test.testid = booking_tests.test_id " +
                    "Join booking ON booking_tests.booking_id = booking.booking_id " +
                    "WHERE booking.booking_id = $1";

const CheckUp = "SELECT a.booking_id,a.total_price, a.time, a.date, u.uname, n.designation " +
                "FROM booking a " + 
                "JOIN nurse n ON a.nurse_id = n.nurse_id " +
                "JOIN users u ON n.nurse_id = u.uid " +
                "WHERE a.patient_id = $1 AND a.type = 'Checkup' AND a.nurse_id IS NOT NULL";


const checkUpDetails = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CheckUp, [pid]);
        var testnames = "";

        for (let i = 0; i < result.rows.length; i++) {
            const test = await client.query(testNames, [result.rows[i].booking_id]);
            for (let j = 0; j < test.rows.length; j++) {
                if (j === test.rows.length - 1) {
                    testnames += test.rows[j].testname;
                }
                else
                    testnames += test.rows[j].testname + ", ";
            }
            result.rows[i].testnames = testnames;
            testnames = "";
        }
        
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};

//driver er hospital eishob fixed kra lagbe
const Ambulance = "SELECT a.time,a.date,a.booking_id, u.uname, d.ambulance_type,a.hospital_id,a.total_price " +
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
                result.rows[i].hospital_name = "Self";
            }

            else {
            const hospital_name = await client.query(hospitalname,[hospital_id]);
            result.rows[i].hospital_name = hospital_name.rows[0].hospital_name;
            result.rows[i].street = hospital_name.rows[0].street;
            result.rows[i].city = hospital_name.rows[0].city;
            result.rows[i].thana = hospital_name.rows[0].thana;
            result.rows[i].district = hospital_name.rows[0].district;
            }
        
        }
        console.log(result.rows);

        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};


const DoctorSearchBySpeciality = "SELECT u.uname,u.mobile_no,u.email,d.qualification, d.designation, d.speciality,d.new_patient_fee,t.meeting_type " + 
                           "FROM doctor d " +
                           "JOIN users u ON d.doctor_id = u.uid " +
                           "JOIN timeline t ON d.doctor_id = t.doctor_id " +
                           "WHERE d.speciality = $1 AND d.employee_status = 'Available'";

const doctorSpecialitySearch = async (speciality) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(DoctorSearchBySpeciality, [speciality]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};

const DoctorSearchByName =  "SELECT u.uname,u.mobile_no, d.designation, d.speciality,d.new_patient_fee " + 
                            "FROM doctor d " +
                            "JOIN users u ON d.doctor_id = u.uid " +
                            "JOIN timeline t ON d.doctor_id = t.doctor_id " +
                            "WHERE u.uname = $1 AND d.employee_status = 'Available'";

const doctorNameSearch = async (name) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(DoctorSearchByName, [name]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};

const CheckUP_Hospital = "SELECT t.testname,t.price, h.hospital_name from test t "+
                         "JOIN hospital h ON t.hospital_id = h.hospital_id "+
                         "where h.hospital_name = $1"
const checkUpHospitalDetails = async (hospital) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CheckUP_Hospital, [hospital]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};
        
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
        
    }
};

const check_old_patient = "SELECT * FROM booking WHERE patient_id = $1 AND doctor_id = $2";

const checkOldPatient = async (pid, did) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(check_old_patient, [pid, did]);
        client.release();
        if(result.rows.length === 0) {
            return false;
        }
        else return true;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        
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


const update_profile = async (street,thana,city, district,pid,mobile_no) => {
    try {
        const client = await getConnection.connect();
        const result2 = await client.query(update_user, [mobile_no, pid]);
        const result = await client.query(updateProfile, [street,thana,city,district,pid]);
        client.release();
        return result.rowsAffected === 1;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
}

const DoctorList= "SELECT d.old_patient_fee,d.popularity,d.qualification, u.uname,u.mobile_no,u.email, d.designation, d.speciality,d.new_patient_fee, d.doctor_id, h.hospital_name, t.weekday " + 
                  "FROM doctor d " +
                  "JOIN users u ON d.doctor_id = u.uid "+
                  "JOIN doctor_hospital dh ON d.doctor_id = dh.doctor_id " +
                  "JOIN hospital h ON dh.hospital_id = h.hospital_id " +
                  "JOIN timeline t ON d.doctor_id = t.doctor_id and t.hospital_id = h.hospital_id  ";

const doctorAllSearch = async () => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(DoctorList);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};

const check_patient = "select street, thana, city, district from patient where pid = $1";

const TestList="SELECT t.testname,t.price ,h.hospital_name,t.hospital_id FROM test t "+"JOIN hospital h ON t.hospital_id = h.hospital_id " ;
const testAllSearch = async (pid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(TestList);
        const result2 = await client.query(check_patient, [pid]);
        for (let i = 0; i < result.rows.length; i++) {
            const hospital_id = result.rows[i].hospital_id;
            const hospital_name = await client.query(hospitalname,[hospital_id]);
            result.rows[i].street = hospital_name.rows[0].street;
            result.rows[i].city = hospital_name.rows[0].city;
            result.rows[i].thana = hospital_name.rows[0].thana;
            result.rows[i].district = hospital_name.rows[0].district;
            result.rows[i].patient_street = result2.rows[0].street;
            result.rows[i].patient_city = result2.rows[0].city;
            result.rows[i].patient_thana = result2.rows[0].thana;
            result.rows[i].patient_district = result2.rows[0].district;
        }
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        
    }
};

const viewPrescriptionQuery = `
    SELECT
        p.booking_id,
        p.disease,
        p.tests,
        p.suggestions,
        p.medicine,
        b.appointment_serial,
        u.uname AS patient_name,
        u.mobile_no AS patient_mobile,
        h.hospital_name,
        u1.uname AS doctor_name,
        d.speciality,
        d.designation,
        d.qualification
    FROM prescription p
    JOIN booking b ON p.booking_id = b.booking_id
    JOIN hospital h ON b.hospital_id = h.hospital_id
    JOIN doctor d ON b.doctor_id = d.doctor_id
    JOIN users u ON b.patient_id = u.uid
    JOiN users u1 ON d.doctor_id = u1.uid
    WHERE p.booking_id = $1
`;

const viewPrescriptionUser = async (booking_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(viewPrescriptionQuery, [booking_id]);
        client.release();
        if(result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching prescription details:', error.message);
        
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
    testAllSearch,
    viewPrescriptionUser,
    checkOldPatient
}