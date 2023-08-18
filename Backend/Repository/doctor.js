const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")


const patientList = "SELECT u." + constant.TABLE_USER_USERNAME + " , b." + constant.TABLE_BOOKING_PATIENT_MOBILE + ", b." +constant.TABLE_BOOKING_TOTAL_PRICE
                    + " , b." + constant.TABLE_BOOKING_TIME + " ,b." + constant.TABLE_BOOKING_DATE + ", h.hospital_name " +
                    "FROM booking b " +
                    "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                    "JOIN doctor_hospital dh ON dh.doctor_id = dh.doctor_id " +
                    "JOIN hospital h ON h.hospital_id = dh.hospital_id " +
                    "JOIN users u ON b.patient_id = u.uid " +
                    "WHERE b.doctor_id = $1 AND h.hospital_name = $2"


const patientListDetails_doctor = async (did , hospital_name) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(patientList, [did,hospital_name]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

// schedule update
const update_schedule = "UPDATE " + constant.TABLE_DOCTOR_TIMELINE + " SET " + constant.TABLE_DOCTOR_TIMELINE_WEEKDAY + " = $1 , " +
                        constant.TABLE_DOCTOR_TIMELINE_SLOT + " = $2 , " + constant.TABLE_DOCTOR_TIMELINE_START_TIME + " = $3 , " +
                        constant.TABLE_DOCTOR_TIMELINE_END_TIME + " = $4 , " + constant.TABLE_DOCTOR_TIMELINE_HOSPITAL_ID + " = $5 " +
                        "WHERE " + constant.TABLE_DOCTOR_TIMELINE_ID + " = $6"

const add_schedule = `INSERT INTO ${constant.TABLE_DOCTOR_TIMELINE}
(
    ${constant.TABLE_DOCTOR_TIMELINE_DOCTOR_ID},
    ${constant.TABLE_DOCTOR_TIMELINE_WEEKDAY},
    ${constant.TABLE_DOCTOR_TIMELINE_SLOT},
    ${constant.TABLE_DOCTOR_TIMELINE_START_TIME},
    ${constant.TABLE_DOCTOR_TIMELINE_END_TIME},
    ${constant.TABLE_TIMELINE_MEETING_TYPE},
    ${constant.TABLE_DOCTOR_TIMELINE_HOSPITAL_ID}
)
VALUES ( $1, $2, $3, $4, $5, $6, $7 )
`;


const online_add_schedule = `INSERT INTO ${constant.TABLE_DOCTOR_TIMELINE}
(
    ${constant.TABLE_DOCTOR_TIMELINE_DOCTOR_ID},
    ${constant.TABLE_DOCTOR_TIMELINE_WEEKDAY},
    ${constant.TABLE_DOCTOR_TIMELINE_SLOT},
    ${constant.TABLE_DOCTOR_TIMELINE_START_TIME},
    ${constant.TABLE_DOCTOR_TIMELINE_END_TIME},
    ${constant.TABLE_TIMELINE_MEETING_TYPE}
)
VALUES ( $1, $2, $3, $4, $5, $6 )
`;
                    
// schedule unique hote hobe
// how to do that? weekday start time end time slot unique hote hobe
// eki jinish repeat korle hospital nam onujayi likhe deyar ekta page banano lagbe
const ADD_SCHEDULE = async (doctor_id,timeline) => {
    try {
        const client = await getConnection.connect();
        for (var i = 0;i< timeline.length;i++){
            var weekday = timeline[i].weekday;
            var slot = timeline[i].slot;
            var start_time = timeline[i].start_time;
            var end_time = timeline[i].end_time;
            var hospital_name = timeline[i].hospital_name;
            if(hospital_name != undefined)
            {
                var hid = (await user.findhid(hospital_name))[0].hospital_id;
                var meeting_type = "In person";
                const result = await client.query(add_schedule, [doctor_id,weekday,slot,start_time,end_time,meeting_type,hid]);
            }
            
            if (hospital_name == undefined)
            {
                var meeting_type = "Online";
                const result = await client.query(online_add_schedule, [doctor_id,weekday,slot,start_time,end_time,meeting_type]);
            }
            
            
        }
        client.release();
        return;
        
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
} 



// prescription details



//EDIT Profile

module.exports = {
    patientListDetails_doctor,
    ADD_SCHEDULE
}