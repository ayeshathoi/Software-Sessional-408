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
 module.exports = {
    rating_complaint_insert
 }