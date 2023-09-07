const { parse } = require('url');
const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")


const patientList = "SELECT b.appointment_serial,u.uname,b.booking_id, b.patient_mobile, b.total_price"
                    + " , b.time ,b.date, h.hospital_name " +
                    "FROM booking b " +
                    "JOIN doctor d ON b.doctor_id = d.doctor_id " +
                    "JOIN hospital h ON h.hospital_id = b.hospital_id " +
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

//-------------------------------------------------
const update_schedule = "UPDATE " + constant.TABLE_DOCTOR_TIMELINE + " SET " + constant.TABLE_DOCTOR_TIMELINE_WEEKDAY + " = $1 , " +
                        constant.TABLE_DOCTOR_TIMELINE_SLOT + " = $2 , " + constant.TABLE_DOCTOR_TIMELINE_START_TIME + " = $3 , " +
                        constant.TABLE_DOCTOR_TIMELINE_END_TIME + " = $4 "  +
                        "WHERE " + constant.TABLE_DOCTOR_TIMELINE_ID + " = $5"

const editSchedule = async (weekday,slot,start_time,end_time,timeline_id) => {
    try {
	    const client = await getConnection.connect();
	    
        //const result2 = await client.query(updated_user, [mobile_no, doctor_id]);
        const result = await client.query(update_schedule, [weekday,slot,start_time,end_time,timeline_id]);       
        
        client.release();
        return update_schedule.rowsAffected === 1;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};


const delete_Schedule = "DELETE FROM timeline WHERE timeline_id = $1";

const deleteSchedule = async (timeline_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(delete_Schedule, [timeline_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error deleting data:', error.message);
        throw error;
    }
}

//-------------------------------------------------

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

// Add a prescription query

const addPrescriptionQuery = `
    INSERT INTO prescription (booking_id, disease, tests, suggestions, medicine)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING prescription_id
`;


const addPrescriptionDetails = async (booking_id, disease, tests, suggestions, medicine) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(addPrescriptionQuery, [booking_id, disease, tests, suggestions, medicine]);
        client.release();
        return result.rows[0].prescription_id;
    } catch (error) {
        console.error('Error inserting prescription details:', error.message);
        throw error;
    }
};



//EDIT Profile
const updated_user = "UPDATE users SET " + constant.TABLE_USER_MOBILE_NO + " = $1 " + 
                    "WHERE " + constant.TABLE_USER_ID + " = $2";
const updatedDoctor = `
                    UPDATE doctor 
                    SET speciality = $1, designation = $2, qualification = $3
                    WHERE doctor_id = $4
                `;

const updateDoctorProfile = async (doctor_id, speciality,designation,qualification,mobile_no) => {
    try {
	    const client = await getConnection.connect();
	    
        const result2 = await client.query(updated_user, [mobile_no, doctor_id]);
        const result = await client.query(updatedDoctor, [speciality,designation,qualification,doctor_id]);       
        
        client.release();
        return updatedDoctor.rowsAffected === 1;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const getDoctorProfile = async (doctor_id) => {
    try {
        const client = await getConnection.connect();
        const profileQuery = `
            SELECT
                d.speciality,
                d.qualification,
                d.designation,
                u.${constant.TABLE_USER_USERNAME} AS name,
                u.${constant.TABLE_USER_MOBILE_NO} AS mobile_no
            FROM doctor d
            JOIN users u ON d.${constant.TABLE_DOCTOR_ID} = u.${constant.TABLE_USER_ID}
            WHERE d.${constant.TABLE_DOCTOR_ID} = $1
        `;
        const result = await client.query(profileQuery, [doctor_id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching doctor profile:', error.message);
        throw error;
    }
};





const doctorDetails = "SELECT * FROM doctor WHERE doctor_id = $1";
const doctor_user = "SELECT * FROM users WHERE uid = $1";
const doctor_hospitals = "SELECT hospital_name FROM hospital h JOIN doctor_hospital dh ON h.hospital_id = dh.hospital_id WHERE dh.doctor_id = $1";

const getDoctorDetails = async (doctor_id) => {
    try {
        console.log(doctor_id);
        const client = await getConnection.connect();
        const result = await client.query(doctorDetails, [doctor_id]);
        const result1 = await client.query(doctor_user, [doctor_id]);
        for (var key in result1.rows[0]) {
            result.rows[0][key] = result1.rows[0][key];
        }
        var hospital = "hospital";
        const result2 = await client.query(doctor_hospitals, [doctor_id]);
        for(var i = 0;i<result2.rows.length;i++)
        {
            var name = hospital +" " + i;
            result.rows[0][name] = result2.rows[i].hospital_name;
        }
        console.log(result);
        client.release();
        return result.rows[0];
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const timelineDetails = "SELECT * FROM timeline WHERE doctor_id = $1 ORDER BY weekday ASC";
const hospital_name = "SELECT * FROM hospital where hospital_id = $1";
// const doctor_hospital = "SELECT hospital_id FROM doctor_hospital WHERE doctor_id = $1";

const getTimelineDetails = async (doctor_id) => {
    try {
        const client = await getConnection.connect();
        //const hospital_id = await client.query(doctor_hospital, [doctor_id]);
        const result = await client.query(timelineDetails, [doctor_id]);
       
        for(var i = 0;i<result.rows.length;i++)
        {
            const timeforeachslot = (parseInt(result.rows[i].end_time )- parseInt(result.rows[i].start_time))*60/parseInt(result.rows[i].slot);
            result.rows[i].timeforeachslot = timeforeachslot;
            const hospital= await client.query(hospital_name, [result.rows[i].hospital_id]);
            result.rows[i].hospital_name = hospital.rows[0].hospital_name;
            var slot = parseInt(result.rows[i].slot);
            var start = result.rows[i].start_time.split(":")[0];
            var serial = [];

            for(var j = 0;j<slot;j++)
            {
                var hr  = parseInt((parseInt(timeforeachslot)*j/60) + parseInt(start));
                
                if(hr/10 < 1)
                {
                    hr = "0" + hr;
                }

                var min = parseInt(timeforeachslot)*j%60;
                if(min == 0)
                {
                    min = "00";
                }
                var time = hr + ":" + min + ":00";
                serial.push({serial: j+1, time: time});

            }
            result.rows[i].serial = serial;
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
    patientListDetails_doctor,
    addPrescriptionDetails,
    getDoctorProfile,
    updateDoctorProfile,
    ADD_SCHEDULE,
    getDoctorDetails,
    getTimelineDetails,
    editSchedule,
    deleteSchedule
}
