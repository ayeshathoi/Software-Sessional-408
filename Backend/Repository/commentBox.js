const getConnection = require('../Config/database');
const constant = require("./constants")

const new_Comment = "INSERT INTO " + constant.TABLE_CHAT_MESSAGE + " ( " 
                + constant.TABLE_CHAT_MESSAGE_BOOKING_ID + " , " +
                constant.TABLE_CHAT_MESSAGE_SENDER_ID + " , " +
                constant.TABLE_CHAT_MESSAGE_MESSAGE + " ) " +
                "VALUES ( $1 , $2 , $3)"

const new_Comment_add = async (booking_id , sender_id , message) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(new_Comment, [booking_id,sender_id,message]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const all_Comment_chat = "SELECT * FROM " + constant.TABLE_CHAT_MESSAGE + " WHERE " + constant.TABLE_CHAT_MESSAGE_BOOKING_ID + " = $1"

const show_all_Comment = async (booking_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(all_Comment_chat, [booking_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

module.exports = {
    new_Comment_add,
    show_all_Comment
}