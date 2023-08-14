const user = require('../Repository/doctor')
const http_status = require('./HTTPStatus')


const getPatient_List = async (req, res) => {
    const doctor_id = req.params.id;
    const hospital_name = req.body.hospital_name;
    console.log(req.cookies)
    
    try {
        const result = await user.patientListDetails_doctor(doctor_id,hospital_name);
        res.send(result);
    } catch (error) {
        console.error('Error getting patient list:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting patient list.' });
    }
    };

const addSchedule = async (req, res) => {
    const doctor_id = req.params.id;
    const {timeline} = req.body;
    try {
        const result = await user.ADD_SCHEDULE(doctor_id,timeline);
        res.send(result);
    } catch (error) {
        console.error('Error adding schedule:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while adding schedule.' });
    }
    
};

module.exports = {
    getPatient_List,
    addSchedule
}
