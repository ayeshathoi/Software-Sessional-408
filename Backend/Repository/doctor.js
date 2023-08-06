const getConnection = require('../Config/database');
const constant = require("./constants")


//appointment e total fare rakhte hobe
//appointment e hospital name rakhte hobe
const patientList =         "SELECT u.uid, u.uname, u."+ constant.TABLE_USER_MOBILE_NO + ", a.time ,t."+constant.TABLE_DOCTOR_TIMELINE_NEW_PATIENT_FEE+" "+
                            "FROM appointment a " +
                            "JOIN doctor d ON a.doctor_id = d.doctor_id " +
                            "JOIN users u ON a.patient_id = u.uid " +
                            "JOIN doctor_hospital dh ON d.doctor_id = dh.doctor_id " +
                            "JOIN timeline t ON d.doctor_id = t.doctor_id AND dh.hospital_id = t.hospital_id " +
                            "WHERE a.doctor_id = $1 AND a.type = 'Appointment'"




const patientListDetails_doctor = async (did) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(patientList, [did]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

// schedule update
const add_schedule = "INSERT INTO " + constant.TABLE_DOCTOR_TIMELINE + " "
                    "(" + constant.TABLE_DOCTOR_TIMELINE_DOCTOR_ID + " ,"
                    constant.TABLE_DOCTOR_TIMELINE_WEEKDAY + " ," + 
                    constant.TABLE_DOCTOR_TIMELINE_SLOT + " ,"
                    constant.TABLE_DOCTOR_TIMELINE_NEW_PATIENT_FEE + " ," +
                    constant.TABLE_DOCTOR_TIMELINE_OLD_PATIENT_FEE + ", " + 
                    constant.TABLE_DOCTOR_TIMELINE_START_TIME + ", " +
                    constant.TABLE_DOCTOR_TIMELINE_END_TIME + ", " +
                    constant.TABLE_DOCTOR_TIMELINE_HOSPITAL_ID + ")" +
                    "VALUES ( $1, $2, $3, $4, $5 , $6 ,$7 ,$8 )"

//constant ADD_SCHEDULE = async 



// prescription details



//EDIT Profile

module.exports = {
    patientListDetails_doctor
}