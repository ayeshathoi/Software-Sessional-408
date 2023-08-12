const user = require('../Repository/doctor')
const http_status = require('./HTTPStatus')


const getPatient_List = async (req, res) => {
    const doctor_id = req.params.id;
    console.log(req.cookies)
    
    try {
        const result = await user.patientListDetails_doctor(doctor_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting patient list:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting patient list.' });
    }
    };

module.exports = {
    getPatient_List
}
