const user = require('../Repository/patient')
const http_status = require('./HTTPStatus')


const all_Appointments = async (req, res) => {
    try {
        const pid = req.user.uid;
        const appointmentDetails = await user.allAppointments(pid);
        res.send(appointmentDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}

const zoom_Appointments = async (req, res) => {
    try {
        const pid = req.user.uid;
        const appointmentDetails = await user.onlineAppointments(pid);
        res.status(http_status.OK).json(appointmentDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}





const ambulanceDetails = async (req, res) => {
    try {
        const pid = req.user.uid;
        const ambulanceDetails = await user.ambulanceDetails(pid);
        res.send(ambulanceDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}

const checkUpDetails = async (req, res) => {
    try {
        const pid = req.user.uid;
        const checkUpDetails = await user.checkUpDetails(pid);
        res.send(checkUpDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}



const doctor_speciality_search = async (req, res) => {
    try {
        const speciality = req.body.speciality;
        const doctorDetails = await user.doctorSpecialitySearch(speciality);
        res.status(http_status.OK).json(doctorDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}


const doctor_name_search = async (req, res) => {
    try {
        const name = req.body.name;
        const doctorDetails = await user.doctorNameSearch(name);
        res.status(http_status.OK).json(doctorDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}

const choose_test = async (req, res) => {
    try {
        const hospital = req.body.name;
        const testDetails = await user.checkUpHospitalDetails(hospital);
        res.status(http_status.OK).json(testDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}

const getProfile = async (req, res) => {
    const pid = req.user.uid;

    try {
        const profile = await user.getPatientProfile(pid);
        res.send(profile);
    } catch (error) {
        console.error('Error getting patient profile:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting patient profile.' });
    }
};

const update_profile = async (req, res) => {
    try {

        const pid = req.user.uid;
        const street = req.body.street;
        const thana = req.body.thana;
        const city = req.body.city;
        const district = req.body.district;
        const mobile_no = req.body.mobile_no;

        const updateProfile = await user.update_profile(street,thana,city, district,pid,mobile_no);
        res.status(http_status.OK).json(updateProfile);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}

const doctor_all_search = async (req, res) => {
    try {
        const doctorDetails = await user.doctorAllSearch();
        res.status(http_status.OK).json(doctorDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}
const test_all_search = async (req, res) => {
    try {
        const testDetails = await user.testAllSearch();
        res.status(http_status.OK).json(testDetails);
    } catch (error) {
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while fetching user details.' });
    }
}



module.exports = {
    all_Appointments,
    zoom_Appointments,
    ambulanceDetails,
    checkUpDetails,
    doctor_speciality_search,
    doctor_name_search,
    choose_test,
    getProfile,
    update_profile,
    doctor_all_search,
    test_all_search
};