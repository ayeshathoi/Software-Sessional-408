const getConnection = require('../Config/database');
const constant = require("./constants")

const FIND_PID = "SELECT " + constant.TABLE_USER_ID + " FROM " + constant.TABLE_USER + 
                " WHERE " + constant.TABLE_USER_EMAIL + " = $1";

const create_hospital_users = "INSERT INTO " + constant.TABLE_USER +
                    "(" + constant.TABLE_USER_TYPE + "," +
                    constant.TABLE_USER_EMAIL + "," +
                    constant.TABLE_USER_PASSWORD + "," +
                    constant.TABLE_USER_MOBILE_NO + ")" +
                    "VALUES ($1, $2, $3, $4);"
const CREATE_HOSPITAL = "INSERT INTO " + constant.TABLE_HOSPITAL + 
                        "(" +constant.TABLE_HOSPITAL_NAME + "," +
                        "hospital_id," +
                        constant.TABLE_HOSPITAL_VERIFICATION + "," +
                        constant.TABLE_HOSPITAL_STREET+ "," +
                        constant.TABLE_HOSPITAL_THANA+ "," +
                        constant.TABLE_HOSPITAL_CITY+ "," +
                        constant.TABLE_HOSPITAL_DISTRICT +  "," +
                        "reg_id)" +
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8);"


const create_hospital = async (hospital_name,reg_id, email, pass, mobile, street, thana, city, district) => {
    try {
        const client = await getConnection.connect();
        const user_type = "hospital";
        const hospital_user = await client.query(create_hospital_users, [user_type,email,pass,mobile]);
        const pid = await findpid(email);
        const pid2 = pid[0].uid.toString();

        const verification_status = "pending";
        const result = await client.query(CREATE_HOSPITAL, [hospital_name,pid2,verification_status,street, thana, city, district,reg_id]);
        client.release();
        return result.rowsAffected === 1;
    } catch (err) {
        console.error("Error creating hospital:", err);
        throw err;
    }
};

const CREATE_USER = "INSERT INTO " + constant.TABLE_USER +
                    "(" + constant.TABLE_USER_USERNAME + "," +
                    constant.TABLE_USER_TYPE + "," +
                    constant.TABLE_USER_EMAIL + "," +
                    constant.TABLE_USER_PASSWORD + "," +
                    constant.TABLE_USER_MOBILE_NO + "," +
                    constant.TABLE_USER_DOB + "," +
                    constant.TABLE_USER_GENDER + ")" +
                    "VALUES ($1, $2, $3, $4, $5, $6 ,$7);"


const findpid = async (email) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(FIND_PID, [email]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};            

const CREATE_PATIENT = "INSERT INTO " + constant.TABLE_PATIENT +
                    "(" + constant.TABLE_PATIENT_ID + "," + 
                    constant.TABLE_PATIENT_STREET + "," +
                    constant.TABLE_PATIENT_THANA + "," +
                    constant.TABLE_PATIENT_CITY + "," +
                    constant.TABLE_PATIENT_DISTRICT + ")" +
                    "VALUES ($1, $2, $3, $4,$5);"

const create_user = async(username,usrtype,email,pass,mobile,dob,gender) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CREATE_USER, [username,usrtype,email,pass,mobile,dob,gender]);
        client.release();
        return result.rowsAffected === 1;
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
};

const create_patient = async (username,email,pass,mobile,dob,gender,street,thana,city,district) => {
    try {
        const client = await getConnection.connect();
        const usrtype = "patient";
        await create_user(username,usrtype,email,pass,mobile,dob,gender);
        const pid = await findpid(email);
        const pid2 = pid[0].uid.toString();
        const result = await client.query(CREATE_PATIENT, [pid2,street,thana,city,district]);
        client.release();
        return result.rowsAffected === 1;
    } catch (err) {
        console.error("Error creating patient:", err);
        throw err;
    }
};


const CREATE_DOCTOR = "INSERT INTO " + constant.TABLE_DOCTOR +
                    "(" + constant.TABLE_DOCTOR_ID + "," +
                    constant.TABLE_DOCTOR_QUALIFICATION + "," +
                    constant.TABLE_DOCTOR_DESIGNATION + "," +
                    constant.TABLE_DOCTOR_SPECIALITY + "," +
                    constant.TABLE_DOCTOR_STATUS + "," +
                    constant.TABLE_DOCTOR_ZOOM_LINK + "," +
                    constant.TABLE_DOCTOR_OLD_PATIENT_FEE + "," +
                    constant.TABLE_DOCTOR_NEW_PATIENT_FEE + "," +
                    "nid )" +
                    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9);"

const FIND_HOS_ID = "SELECT " + constant.TABLE_HOSPITAL_ID + " FROM " + constant.TABLE_HOSPITAL +
                    " WHERE " + constant.TABLE_HOSPITAL_NAME + " = $1";

const findhid = async (hospital_name) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(FIND_HOS_ID, [hospital_name]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//done
const DOC_HOS = "INSERT INTO " + constant.TABLE_DOCTOR_HOSPITAL +
                "(" + constant.TABLE_DOCTOR_ID_HOSPITAL + "," +
                constant.TABLE_DOCTOR_HOSPITAL_ID + ")" +
                "VALUES ($1, $2);"

const create_doctor = async (username,nid,email,pass,mobile,dob,gender,qualification,designation,speciality,zoom,old_fee,new_fee,
    hospital_names) => {
  try {
      const client = await getConnection.connect();
      const user_type = "doctor";
      const user = await create_user(username,user_type,email,pass,mobile,dob,gender);
      const did = await findpid(email);
      const doctorid = did[0].uid.toString();
      const stat = "pending";
      const result = await client.query(CREATE_DOCTOR, [doctorid,qualification,designation,speciality,stat,
        zoom,old_fee,new_fee,nid]);
      const sz = hospital_names.length;
        for(var i = 0; i < sz; i++){
            const hid = await findhid(hospital_names[i]);
            const hid2 = hid[0].hospital_id.toString();
            const result2 = await client.query(DOC_HOS, [doctorid,hid2]);
        }  
      client.release();
      return result.rows;
  } catch (err) {
      console.error("Error creating patient:", err);
      throw err;
  }
};


const CREATE_NURSE = "INSERT INTO " + constant.TABLE_NURSE +
                    "(" + constant.TABLE_NURSE_ID + "," +
                    constant.TABLE_NURSE_DESIGNATION + "," +
                    constant.TABLE_NURSE_STATUS + "," +
                    "nid," +
                    constant.TABLE_NURSE_HOSPITAL + ")" + 
                    "VALUES ($1, $2, $3, $4,$5);"

const create_nurse = async (username,nid_no,email,pass,mobile,dob,gender,designation,hospital_name) => {
  try {

      const client = await getConnection.connect();
      const user_type = "nurse";
      await create_user(username,user_type,email,pass,mobile,dob,gender);
      const nid = await findpid(email);
      const nid2 = nid[0].uid.toString();
      const stat = "pending";
      const hid = await findhid(hospital_name);
      const hid2 = hid[0].hospital_id.toString();
      const result = await client.query(CREATE_NURSE, [nid2,designation,stat,nid_no,hid2]);
      client.release();
      return result.rowsAffected === 1;
  } catch (err) {
      console.error("Error creating nurse:", err);
      throw err;
  }
};

const CREATE_DRIVER = "INSERT INTO " + constant.TABLE_DRIVER +
                    "(" + constant.TABLE_DRIVER_ID + "," +
                    constant.TABLE_DRIVER_AMBULANCE_TYPE + "," +
                    constant.TABLE_DRIVER_AMBULANCE_FARE + "," +
                    constant.TABLE_DRIVER_STATUS + "," +
                    constant.TABLE_DRIVER_STREET + "," +
                    constant.TABLE_DRIVER_THANA + "," +
                    constant.TABLE_DRIVER_CITY + "," +
                    constant.TABLE_DRIVER_DISTRICT + "," +
                    "nid ," +
                    constant.TABLE_DRIVER_HOSPITAL + ")" + 
                    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10);"

const create_driver = async (username,email,pass,mobile,dob,gender,type,fare,
    hospital_name,street,thana,city,district,nid) => {
  try {
      const client = await getConnection.connect();
      const user_type = "driver";
      const user = await create_user(username,user_type,email,pass,mobile,dob,gender);
      const drid = await findpid(email);
      const drid2 = drid[0].uid.toString();
      const stat = "pending";
      result = "";
      if(hospital_name != null){
      const hid = await findhid(hospital_name);
      const hid2 = hid[0].hospital_id.toString();
      result = await client.query(CREATE_DRIVER, [drid2,type,fare,stat,street,thana,city,district,nid,hid2]);
      }
      else{
        if(street != null && thana != null && city != null && district != null){
        result = await client.query(CREATE_DRIVER, [drid2,type,fare,stat,street,thana,city,district,nid,null]);
        }
        else
            {return false;}

      }
      client.release();
      return result.rowsAffected === 1;
  } catch (err) {
      console.error("Error creating driver:", err);
      throw err;
  }
};


//-------------------------------------------------------------------------
const UserDetailBYID = "SELECT * FROM users where uid = $1"

const GET_USER_DETAIL = async (uid) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(UserDetailBYID, [uid]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//-------------------------------------------------------------------------
const UserDetailbyEmail = "SELECT * FROM users where email = $1"

const GET_USER_DETAILEmail = async (email) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(UserDetailbyEmail, [email]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//-------------------------------------------------------------------------
// const HospitalDetail = "SELECT * FROM hospital where email = $1"

// const GET_HOSPITAL_DETAIL = async (email) => {
//     try {
//         const client = await getConnection.connect();
//         const result = await client.query(HospitalDetail, [email]);
//         client.release();
//         return result.rows;
//     }
//     catch (error) {
//         console.error('Error fetching data:', error.message);
//         throw error;
//     }
// };


const HospitalDetailbyId = "SELECT * FROM hospital where hospital_id = $1"

const GET_HOSPITAL_DETAILID = async (hospital_id) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(HospitalDetailbyId, [hospital_id]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};








module.exports = {
    create_hospital,
    create_user,
    findpid,
    findhid,
    create_patient,
    create_doctor,
    create_nurse,
    create_driver,
    GET_USER_DETAIL,
    GET_USER_DETAILEmail,
    //GET_HOSPITAL_DETAIL,
    GET_HOSPITAL_DETAILID
}