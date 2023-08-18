const commenter = require('../Repository/commentBox')
const http_status = require('./HTTPStatus')

const addingComment = async (req, res) => {
    try {
        const sender_id = req.params.sid
        const {booking_id,message} = req.body
        const result = await commenter.new_Comment_add(booking_id,sender_id,message);
        res.status(http_status.OK).json({ result })
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const all_Comment = async (req, res) => {
    try {
        const {booking_id} = req.body
        const result = await commenter.show_all_Comment(booking_id);
        res.status(http_status.OK).json({ result })
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

module.exports = {
    addingComment,
    all_Comment
}