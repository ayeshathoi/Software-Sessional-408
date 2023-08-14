const getConnection = require('../Config/database');
const constant = require("./constants")


const patientList = "SELECT u." + constant.TABLE_USER_USERNAME + " , b." + constant.TABLE_BOOKING_PATIENT_MOBILE + ", b." +constant.TABLE_BOOKING_TOTAL_PRICE
                    + " , b." + constant.TABLE_BOOKING_TIME + " ,b." + constant.TABLE_BOOKING_DATE + " " +
                    "FROM booking b " +
                    "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                    "JOIN users u ON b.patient_id = u.uid " +
                    "WHERE b.doctor_id = $1"


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