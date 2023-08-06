const user = require('../Repository/nurse')
const http_status = require('./HTTPStatus')


const getPatient_List = async (req, res) => {
    const nurse_id = req.params.id;
    try {
        const result = await user.patientListDetails_nurse(nurse_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting available doctor:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred.' });
    }
}


const editProfile = async (req, res) => {
    const nurse_id = req.params.id;
    const designation = req.body.designation;
    const hospital = req.body.hospital;
    const mobile = req.body.mobile;
   
    try
    {
        const result = await user.update_profile(designation, hospital, nurse_id,mobile);
        res.status(http_status.OK).json({ "updated nurse profile": updated });
    }
    catch(error)
    {
        console.error('Error getting available doctor:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred .' });
    }
}


module.exports = {
    getPatient_List,
    editProfile
}
