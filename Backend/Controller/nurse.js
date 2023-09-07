const user = require('../Repository/nurse')
const http_status = require('./HTTPStatus')


const getPatient_List = async (req, res) => {
    const nurse_id = req.user.uid;
    try {
        const result = await user.patientListDetails_nurse(nurse_id);
        res.send(result)
    } catch (error) {
        console.error('Error getting available nurse:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred.' });
    }
}
const getProfile = async (req, res) => {
    const nurse_id = req.user.uid;

    try {
        const profile = await user.getNurseProfile(nurse_id);
        res.send(profile);
    } catch (error) {
        console.error('Error getting nurse profile:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting nurse profile.' });
    }
};


const editProfile = async (req, res) => {
    const nurse_id = req.user.uid;
    const designation = req.body.designation;
    const hospital = req.body.hospital;
    const mobile_no = req.body.mobile_no;
   
    try
    {
        const result = await user.update_profile(designation, hospital, nurse_id,mobile_no);
        res.status(http_status.OK).json({ "updated nurse profile": "updated" });
    }
    catch(error)
    {
        console.error('Error getting available nurse:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred .' });
    }
}

const nursepr = async (req, res) => {
    const nurse_id = req.user.uid;
    try {
        const result = await user.nurse(nurse_id);
        res.send(result);
    } catch (error) {
        console.error('Error getting available nurse:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred.' });
    }
}



module.exports = {
    getPatient_List,
    getProfile,
    editProfile,
    nursepr
}
