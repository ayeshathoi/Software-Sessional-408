const user = require('../Repository/doctor')
const http_status = require('./HTTPStatus')
const { viewPrescription } = require('../Repository/doctor');

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

const addPrescription = async (req, res) => {
    const { booking_id } = req.params; // Extract booking_id from URL params
    const { disease, tests, suggestions, medicine } = req.body;

    try {
        const prescriptionId = await user.addPrescriptionDetails(booking_id, disease, tests, suggestions, medicine);
        res.status(http_status.CREATED).json({ prescription_id: prescriptionId });
    } catch (error) {
        console.error('Error adding prescription:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while adding the prescription.' });
    }
};




const viewPrescriptionDetails = async (req, res) => {
    const { booking_id } = req.params;

    try {
        const prescriptionDetails = await viewPrescription(booking_id);
        if(prescriptionDetails==null){
            res.status(http_status.OK).json({prescriptionDetails:"No prescriptions found"});
        }
        else if (!prescriptionDetails) {
            res.status(http_status.NOT_FOUND).json({ error: 'Prescription not found for the given booking_id.' });
        } else {
            res.status(http_status.OK).json(prescriptionDetails);
        }
    } catch (error) {
        console.error('Error viewing prescription details:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while viewing prescription details.' });
    }
};

const checkPrescription = async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      const prescriptionDetails = await viewPrescription(booking_id);
  
      if (prescriptionDetails === null) {
        // If no prescription found, serve the "Create Prescription" form
        res.status(http_status.OK).json({ prescriptionExists: false });
      } else {
        // If prescription details are found, serve a message indicating it already exists
        res.status(http_status.OK).json({ prescriptionExists: true });
      }
    } catch (error) {
      console.error('Error checking prescription:', error.message);
      res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while checking prescription.' });
    }
  };
  


module.exports = {
    getPatient_List,
    getProfile,
    updateDoctorProfile,
    addPrescription,
    viewPrescriptionDetails,
    checkPrescription,
    addSchedule,
    getDoctorDetails,
    getTimeline
}
