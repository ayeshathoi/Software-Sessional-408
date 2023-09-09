const getConnection = require('../Config/database');
const constant = require("./constants")
const user = require("./user")
const doctor = require("./doctor")

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


const check_serial = "select * from booking where doctor_id = $1 and date = $2 and time = $3";

const popularity = "UPDATE doctor SET popularity = $1 WHERE doctor_id = $2";
const total_booking = "select * from booking where doctor_id = $1";

const appointmentBooking = async (type,day,price,time,date,payment_method,payment_status,patient_mobile,patient_id,doctor_id,hospital_name) => {
    
    try {
        var serial = "-1"; //not known yet
        const stat = "approved";
        const client = await getConnection.connect();

        const timeline_serial = await doctor.getTimelineDetails(doctor_id);
        for (let index = 0; index < timeline_serial.length; index++) {
            if(timeline_serial[index].hospital_name == hospital_name && timeline_serial[index].weekday.toLowerCase() == day.toLowerCase())
            {
                for (let i = 0; i < timeline_serial[index].serial.length; i++) {
                    if(timeline_serial[index].serial[i].time == time)
                    {
                        serial = timeline_serial[index].serial[i].serial;
                        break;
                    }
                    
                }
            }
        }

        var res_string = "This serial is already booked.";
        const result2 = await client.query(check_serial, [doctor_id,date,time]);
        if(result2.rows.length > 0)
        {
                return res_string;
        }

        const result3 = await client.query(total_booking, [doctor_id]);
        const popularity_result = await client.query(popularity, [result3.rows.length + 1,doctor_id]);

        if(hospital_name !=null){
            const hid = await user.findhid(hospital_name);
            const hid2 = hid[0].hospital_id;
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
    }
}



const checkup = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + "end_time ,"
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_HOSPITAL_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";

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
    }
}                            


const bookingCheckup = async (type,price,time,end_time,date,payment_method,payment_status,patient_mobile,patient_id,hospital_name,test_names) =>
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
        const result = await client.query(checkup, [type,price,time,end_time,date,payment_method,payment_status,
            patient_mobile,stat,patient_id,hid2]);
        
        const bid = await client.query(last_booking_id);
        const bid2 = bid.rows[0].booking_id;
        
        for (var i = 0; i < test_id.length; i++) {
            const result = await client.query(insert_booking_test, [bid2,test_id[i]]);
        }
        
  
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }

}


const ambulance = "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + "end_time ,"
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DRIVER_ID + ", "
                + constant.TABLE_HOSPITAL_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";

const self_driver_ambulance = 
                "INSERT INTO " + constant.TABLE_BOOKING + " ("
                + constant.TABLE_BOOKING_TYPE + ", "
                + constant.TABLE_BOOKING_TOTAL_PRICE + ", "
                + constant.TABLE_BOOKING_TIME + ", "
                + "end_time ,"
                + constant.TABLE_BOOKING_DATE + ", "
                + constant.TABLE_BOOKING_PAYMENT_METHOD + ", "
                + constant.TABLE_BOOKING_PAYMENT_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_MOBILE + ", "
                + constant.TABLE_BOOKING_STATUS + ", "
                + constant.TABLE_BOOKING_PATIENT_ID + ", "
                + constant.TABLE_BOOKING_DRIVER_ID + ") "
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";


const checkbookingbefore = "select * from booking where driver_id = $1 and date = $2";


const insideRange = (start, end, value) => {
    return (value >= start && value <= end);
}


const bookingAmbulance = async (type,price,time,end_time,date,payment_method,payment_status,patient_mobile,patient_id,driver_id,hospital_name) =>
{
    try {
        const stat = "approved";
        //console.log(type," ", price," ", time," ", end_time," ", date," ", payment_method," ", payment_status," ", patient_mobile," ", patient_id," ", driver_id," ", hospital_name);
        const client = await getConnection.connect();
        
        const check = await client.query(checkbookingbefore, [driver_id,date]);
        for (let index = 0; index < check.rows.length; index++) {
            if(check.rows[index].time <= end_time && check.rows[index].end_time >= time)
            {
                return "Driver is not available at this time.";
            }
        }

        if (hospital_name == "self")
        {const hid = await user.findhid(hospital_name);
        const hid2 = hid[0].hospital_id;
        const result = await client.query(ambulance, [type,price,time,end_time,date,payment_method,payment_status,
            patient_mobile,stat,patient_id,driver_id,hid2]);
            client.release();
            return result.rows;
        }
        else 
        {
            const result = await client.query(self_driver_ambulance, [type,price,time,end_time,date,payment_method,payment_status,
                patient_mobile,stat,patient_id,driver_id]);
                client.release();
                return result.rows;
        }
        

    }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }

}


module.exports = {
    appointmentBooking,
    bookingCheckup,
    bookingAmbulance,
    select_test
}
