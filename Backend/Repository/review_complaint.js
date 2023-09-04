const getConnection = require('../Config/database');
const constant = require("./constants")

const INSERT_Rating_Complaint = " INSERT INTO review (rating, complaint_text, booking_id) VALUES ($1, $2, $3)"
const rating_complaint_insert = async (rating, complaint, booking_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(INSERT_Rating_Complaint, [rating, complaint, booking_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const show_complaint = "SELECT * FROM review " +
                        "JOIN booking ON review.booking_id = booking.booking_id " +
                        "where booking.hospital_id = $1"
const booking_details = "SELECT * FROM booking WHERE booking_id = $1"
const user_name = "SELECT uname FROM users WHERE uid = $1"
const show_complaints = async (hospital_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(show_complaint, [hospital_id]);
        for (var i = 0; i < result.rows.length; i++) {
            const booking = await client.query(booking_details, [result.rows[i].booking_id]);
            if(booking.rows[0].patient_id == null) continue;
            const user = await client.query(user_name, [booking.rows[0].patient_id]);
            result.rows[i].patient_name = user.rows[0].uname;
            if (booking.rows[0].doctor_id != null) {
                const service_provider = await client.query(user_name, [booking.rows[0].doctor_id]);
                result.rows[i].service_provider = service_provider.rows[0].uname;
            }
            if (booking.rows[0].nurse_id != null) {
                const service_provider = await client.query(user_name, [booking.rows[0].nurse_id]);
                result.rows[i].service_provider = service_provider.rows[0].uname;
            }
            if (booking.rows[0].driver_id != null) {
                const service_provider = await client.query(user_name, [booking.rows[0].driver_id]);
                result.rows[i].service_provider = service_provider.rows[0].uname;
            }
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
    rating_complaint_insert,
    show_complaints
 }