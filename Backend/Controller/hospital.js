const user = require('../Repository/hospital')
const http_status = require('./HTTPStatus')


const getAvailable_Doctor = async (req, res) => {
    const hospital_id = req.params.hid;
    try {
        const result = await user.availableDoctor(hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting available doctor:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting available doctor.' });
    }
}


const getAvailable_Nurse = async (req, res) => {
    const hospital_id = req.params.hid;
    try {
        const result = await user.available_nurse(hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting available doctor:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting available doctor.' });
    }
}


const getAvailable_Driver = async (req, res) => {
    const hospital_id = req.params.hid;
    try {
        const result = await user.available_driver(hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting available doctor:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting available doctor.' });
    }
}


const addTEST = async (req, res) => {
    const testname = req.body.testname;
    const price = req.body.price;
    const hospital_id = req.params.hid;
    console.log(testname, price, hospital_id);
    try {
        const result = await user.addtest(testname, price, hospital_id);
        res.status(http_status.OK).json({add : "added test"});
    } catch (error) {
        console.error('Error adding test:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while adding test.' });
    }
}


const update_price = async (req, res) => {
    const testname = req.body.testname;
    const price = req.body.price;
    const hospital_id = req.params.hid;
    try {
        const result = await user.updateTESTPrice(testname, price, hospital_id);
        res.status(http_status.OK).json({update : "updated test price"});
    } catch (error) {
        console.error('Error updating price:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while updating price.' });
    }
}


const show_complaint = async (req, res) => {
    const hospital_id = req.params.hid;
    const booking_id = req.body.booking_id;
    try {
        const result = await user.show_complaint(booking_id,hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting complaint:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting complaint.' });
    }
}

const all_booking = async (req, res) => {
    const hospital_id = req.params.hid;
    try {
        const result = await user.booking_total(hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting complaint:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting complaint.' });
    }
}





const assign_nurse = async (req, res) => {
    const nurse_email = req.body.nurse_email;
    const booking_id = req.body.booking_id;
    try {
        const result = await user.assign_nurse_to_test(nurse_email, booking_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error assigning nurse:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while assigning nurse.' });
    }
}


const update_employee = async (req, res) => {
    const hospital_id = req.params.hid;
    const email = req.body.email;
    try
    {
        const result = await user.update_employee_hospital(email, hospital_id);
        res.status(http_status.OK).json({ result });
    }
    catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while updating employee.' });
    }
}


const show_pending_checkup = async (req, res) => {
    const hospital_id = req.params.hid;
    try {
        const result = await user.show_patient_request_checkup(hospital_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting request list:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting request list.' });
    }
}


const show_pending_test = async (req, res) => {
    const booking_id = req.body.booking_id;
    try {
        const result = await user.pending_test(booking_id);
        res.status(http_status.OK).json({ result });
    } catch (error) {
        console.error('Error getting request list:', error.message);
        res.status(http_status.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while getting request list.' });
    }
} 










module.exports = {
    getAvailable_Doctor,
    getAvailable_Nurse,
    getAvailable_Driver,
    addTEST,
    update_price,
    show_complaint,
    assign_nurse,
    update_employee,
    all_booking,
    show_pending_checkup,
    show_pending_test
}
