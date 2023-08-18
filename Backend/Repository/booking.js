const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")

const appointment = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_SERIAL + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DOCTOR_ID + ","
                + constant.TABLE_BOOKING_HOSPITAL_ID +  ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";

const onlineAppointments = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_SERIAL + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DOCTOR_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";

const appointmentBooking = async (type,price,time,date,payment_method,payment_status,patient_mobile,patient_id,doctor_id,hospital_name) => {
    
    try {
        const serial = "-1"; //not known yet
        const stat = "approved";
        const client = await getConnection.connect();
        //console.log(hospital_name);
        if(hospital_name !=null){
            const hid = await user.findhid(hospital_name);
            const hid2 = hid[0].hospital_id;
            console.log(hid2);

            const result = await client.query(appointment, [type,price,time,date,payment_method,payment_status,patient_mobile,
                stat,serial,patient_id,doctor_id,hid2]);
            client.release();
            return result.rows;
        }
        else 
        {
            const result = await client.query(onlineAppointments, [type,price,time,date,payment_method,payment_status,patient_mobile,
                stat,serial,patient_id,doctor_id]);
            client.release();
            return result.rows;

        }
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}



const checkup = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_HOSPITAL_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

const search_testID = "SELECT testid,price FROM  test " + 
                        " WHERE " + constant.TABLE_TEST_NAME + " = $1 "
                      + "AND " + constant.TABLE_TEST_HOSPITAL_ID + " = $2";

const last_booking_id = "SELECT booking_id FROM booking ORDER BY booking_id DESC LIMIT 1";

const insert_booking_test = "INSERT INTO " + constant.TABLE_BOOKING_TEST + " ("
                            + constant.TABLE_BOOKING_ID + ", "
                            + constant.TABLE_BOOKING_TEST_ID + ") "
                            + "VALUES ($1,$2)";


const select_test = async (test_names,hospital_name) =>
{
    try {
        const client = await getConnection.connect();
        const hid = await user.findhid(hospital_name);
        const hid2 = hid[0].hospital_id;;
        const result = await client.query(search_testID, [test_names,hid2]);
        var price = 0;
        test_id = []
        for (var i = 0; i < test_names.length; i++) {
            const result = await client.query(search_testID, [test_names[i],hid2]);
            test_id.push(result.rows[0].testid);
            price += parseInt(result.rows[0].price);
        }
        return price;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}                            


const bookingCheckup = async (type,price,time,date,payment_method,payment_status,patient_mobile,patient_id,hospital_name,test_names) =>
{
    try {
        const stat = "pending";
        const client = await getConnection.connect();
        const hid = await user.findhid(hospital_name);
        const hid2 = hid[0].hospital_id;
        test_id = []
        for (var i = 0; i < test_names.length; i++) {
            const result = await client.query(search_testID, [test_names[i],hid2]);
            test_id.push(result.rows[0].testid);
        }
        const result = await client.query(checkup, [type,price,time,date,payment_method,payment_status,
            patient_mobile,stat,patient_id,hid2]);
        
        const bid = await client.query(last_booking_id);
        const bid2 = bid.rows[0].booking_id;
        
        for (var i = 0; i < test_id.length; i++) {
            console.log(test_id[i]);
            const result = await client.query(insert_booking_test, [bid2,test_id[i]]);
        }
        
  
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }

}


const ambulance = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DRIVER_ID + ", "
                + constant.TABLE_HOSPITAL_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";

const self_driver_ambulance = 
                "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DRIVER_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

const bookingAmbulance = async (type,price,time,date,payment_method,payment_status,patient_mobile,patient_id,driver_id,hospital_name) =>
{
    try {
        const stat = "approved";
        const client = await getConnection.connect();
        
        if (hospital_name != null)
        {const hid = await user.findhid(hospital_name);
        const hid2 = hid[0].hospital_id;
        console.log(driver_id)
        const result = await client.query(ambulance, [type,price,time,date,payment_method,payment_status,
            patient_mobile,stat,patient_id,driver_id,hid2]);
            client.release();
            return result.rows;
        }
        else 
        {
            const result = await client.query(self_driver_ambulance, [type,price,time,date,payment_method,payment_status,
                patient_mobile,stat,patient_id,driver_id]);
                client.release();
                return result.rows;
        }
        

    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }

}


module.exports = {
    appointmentBooking,
    bookingCheckup,
    bookingAmbulance,
    select_test
}
