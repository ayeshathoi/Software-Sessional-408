const user = require('../Repository/driver')
const http_status = require('./HTTPStatus')
const search_ = require('../Repository/search')

const getPatient_List = async (req, res) => {
    const driver_id = req.params.id;
    try {
        const result = await user.patientListDetails_driver(driver_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error :', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting available doctor.' });
    }
}

const update_profile = async (req, res) => {
    const driver_id = req.params.id;
    const hospital = req.body.hospital;
    const mobile = req.body.mobile;
    
    try
    {
        const result = await user.update_profile(hospital, driver_id,mobile);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error :', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting available doctor.' });
    }
}


const oneDriverdetail = async (req, res) => {
    const id = req.params.id;
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
    update_profile,
    oneDriverdetail
}
