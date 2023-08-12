const getConnection = require('../Config/database');
const constant = require("./constants")

const UPDATE_Rating_Complaint = " UPDATE appointment SET rating = $1, complaint_text = $2 WHERE appoint_id = $3"

const update_rating_complaint = async (rating, complaint, appointment_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(UPDATE_Rating_Complaint, [rating, complaint, appointment_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}
 module.exports = {
    update_rating_complaint
 }