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

// const addPrescription = async (req, res) => {
//     const { pid, doctor_id } = req.body;

//     try {
//         if (!req.file) {
//             return res.status(http_status.BAD_REQUEST).json({ error: 'Prescription PDF file is required.' });
//         }

//         const prescription_pdf = fs.readFileSync(req.file.path);

//         const result = await user.addPrescription(pid, doctor_id, prescription_pdf);

//         fs.unlinkSync(req.file.path);

//         res.send(result);
//     } catch (error) {
//         console.error('Error adding prescription:', error.message);
//         res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while adding prescription.' });
//     }
// };


// Controller function to update a doctor's profile
const updateDoctorProfile = async (req, res) => {
    try{
        const doctor_id = req.params.doctor_id;
        const speciality=req.body.speciality;
        const designation=req.body.designation;
        const qualification=req.body.qualification;
        const mobile_no=req.body.mobile_no;

    
        const updated = await user.updateDoctorProfile(doctor_id, speciality, designation, qualification, mobile_no);

        res.status(http_status.OK).json(updated);
    } catch (error) {
        console.error('Error updating doctor profile:', error.message);
        res.status(http_status.BAD_REQUEST).json({ error: 'An error occurred while updating doctor profile.' });
    }
};

const getProfile = async (req, res) => {
    const doctor_id = req.params.id;

    try {
        const profile = await user.getDoctorProfile(doctor_id);
        res.send(profile);
    } catch (error) {
        console.error('Error getting doctor profile:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting doctor profile.' });
    }
};



const getDoctorDetails = async (req, res) => {
    const doctor_id = req.params.id;
    
    try {
        const result = await user.getDoctorDetails(doctor_id);
        res.send(result);
    } catch (error) {
        console.error('Error getting doctor details:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting doctor details.' });
    }
};


const getTimeline = async (req, res) => {
    const doctor_id = req.params.id;
    try {
        const result = await user.getTimelineDetails(doctor_id);
        res.send(result);
    } catch (error) {
        console.error('Error getting doctor details:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting timeline details.' });
    }
};



module.exports = {
    getPatient_List,
    getProfile,
    updateDoctorProfile,
    //addPrescription,
    addSchedule,
    getDoctorDetails,
    getTimeline
}
