const express = require('express');
const app = express();
const user = require('../Repository/search')
const http_status = require('./HTTPStatus')


const Driver_search_Thana = async (req, res) => {
    // const thana = req.body.thana;
    
    // if(!thana) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing thana.' });
    try {
        const thana = req.body.thana;
    
        if(!thana) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing thana.' });
        const result = await user.driverSearchByThana(thana);
        res.send(result);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching data.' });
    }
};

const patient_thana = async (req, res) => {
    // const uid = req.user.uid;
    // if(!uid) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing uid.' });
    try {
        const uid = req.user.uid;
        if(!uid) return res.status(http_status.BAD_REQUEST).json({ error: 'Missing uid.' });
        const result = await user.driverSearchByPatientThana(uid);
        res.send(result);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching data.' });
    }
};

const alldriver = async (req, res) => {
    try {
        const result = await user.driverAll();
        res.send(result);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching data.' });
    }
};



module.exports = {
    Driver_search_Thana,
    patient_thana,
    alldriver,
};
