const user = require('../Repository/driver')
const http_status = require('./HTTPStatus')
const search_ = require('../Repository/search')

const getPatient_List = async (req, res) => {
    const driver_id = req.user.uid;
    try {
        const result = await user.patientListDetails_driver(driver_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error :', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting patient list.' });
    }
}
const getProfile = async (req, res) => {
    const driver_id = req.user.uid;

    try {
        const profile = await user.getDriverProfile(driver_id);
        res.send(profile);
    } catch (error) {
        console.error('Error getting driver profile:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting driver profile.' });
    }
};

const update_profile = async (req, res) => {
    const driver_id = req.user.uid;
    const mobile_no = req.body.mobile_no;
    const street = req.body.street;
    const thana = req.body.thana;
    const city = req.body.city;
    const district = req.body.district;
    
    try
    {
        const result = await user.update_profile(driver_id,mobile_no,street,thana,city,district);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error :', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while updating driver.' });
    }
}


const oneDriverdetail = async (req, res) => {
    const id = req.user.uid;
    try {
        const result = await search_.onedriver(id);
        res.send(result);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching data.' });
    }
};

module.exports = {
    getPatient_List,
    getProfile,
    update_profile,
    oneDriverdetail
}
