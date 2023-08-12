const user = require('../Repository/user')
const http_status = require('./HTTPStatus')

//hospital_name, email, pass, mobile, street, thana, city, district

const create_hospital = async (req, res) => {
    const {hospital_name, email, pass, mobile, street, thana, city , district} = req.body;
    const new_hospital = user.create_hospital(hospital_name, email, pass, mobile, street, thana, city , district);
    res.status(CREATED).json({created: true})
}


const getUserDetails = async (req, res) => {
    try {
        const uname = req.params.username;
        const userDetails = await user.GET_USER_DETAIL(uname);
        res.status(http_status.OK).json(userDetails);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user details.' });
    }
};

module.exports = {
    getUserDetails,
    //create_hospital
};
