const getConnection = require('../Config/database');
const constant = require("./constants")


const CREATE_HOSPITAL = "INSERT INTO " + constant.TABLE_HOSPITAL + 
                        "(" +constant.TABLE_HOSPITAL_NAME + "," +
                        constant.TABLE_HOSPITAL_EMAIL+ "," +
                        constant.TABLE_HOSPITAL_PASSWORD+ "," +
                        constant.TABLE_HOSPITAL_MOBILE_NO+ "," +
                        constant.TABLE_HOSPITAL_STREET+ "," +
                        constant.TABLE_HOSPITAL_THANA+ "," +
                        constant.TABLE_HOSPITAL_CITY+ "," +
                        constant.TABLE_HOSPITAL_DISTRICT + ")" +
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8);"

//post yourDoctor.com/account/signup/Hospital
//hospital name unique hoite hobe
//hospital status -: approved, unapproved, pending dite hobe
const create_hospital = async (hospital_name, email, pass, mobile, street, thana, city, district) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CREATE_HOSPITAL, [hospital_name, email, pass, mobile, street, thana, city, district]);
        client.release();
        return result.rowsAffected === 1;
    } catch (err) {
        console.error("Error creating hospital:", err);
        throw err;
    }
};

const CREATE_USER = "INSERT INTO " + constant.TABLE_USER +
                    "(" + constant.TABLE_USER_USERNAME + "," +
                    constant.TABLE_USER_EMAIL + "," +
                    constant.TABLE_USER_PASSWORD + "," +
                    constant.TABLE_USER_MOBILE_NO + "," +
                    constant.TABLE_USER_DOB + "," +
                    constant.TABLE_USER_GENDER + ")" +
                    "VALUES ($1, $2, $3, $4, $5, $6);"


const FIND_PID = "SELECT " + constant.TABLE_USER_ID + " FROM " + constant.TABLE_USER + 
                " WHERE " + constant.TABLE_USER_EMAIL + " = $1";


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
//post yourDoctor.com/account/signup/patient
const create_user = async(username,email,pass,mobile,dob,gender) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(CREATE_USER, [username,email,pass,mobile,dob,gender]);
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
        const user = create_user(username,email,pass,mobile,dob,gender);
        
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

//need to add degree
const CREATE_DOCTOR = "INSERT INTO " + constant.TABLE_DOCTOR +
                    "(" + constant.TABLE_DOCTOR_ID + "," +
                    constant.TABLE_DOCTOR_DESIGNATION + "," +
                    constant.TABLE_DOCTOR_SPECIALITY + "," +
                    constant.TABLE_DOCTOR_STATUS + "," +
                    constant.TABLE_DOCTOR_DOCUMENT + ")" +
                    "VALUES ($1, $2, $3, $4, $5);"

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


const DOC_HOS = "INSERT INTO " + constant.TABLE_DOCTOR_HOSPITAL +
                "(" + constant.TABLE_DOCTOR_ID_HOSPITAL + "," +
                constant.TABLE_DOCTOR_HOSPITAL_ID + ")" +
                "VALUES ($1, $2);"
//yourDoctor.com/account/signup/doctor
const create_doctor = async (username,email,pass,mobile,dob,gender,designation,speciality,document) => {
  try {
      const client = await getConnection.connect();
      const user = create_user(username,email,pass,mobile,dob,gender);
      
      const did = await findpid(email);
      const doctorid = did[0].uid.toString();
      console.log(did);
      const stat = "pending";
      const result = await client.query(CREATE_DOCTOR, [doctorid,designation,speciality,stat,document]);
      client.release();
      return result.rowsAffected === 1;
  } catch (err) {
      console.error("Error creating patient:", err);
      throw err;
  }
};


const CREATE_NURSE = "INSERT INTO " + constant.TABLE_NURSE +
                    "(" + constant.TABLE_NURSE_ID + "," +
                    constant.TABLE_NURSE_DESIGNATION + "," +
                    constant.TABLE_NURSE_STATUS + "," +
                    constant.TABLE_NURSE_DOCUMENT + ","+
                    constant.TABLE_NURSE_HOSPITAL + ")" + 
                    "VALUES ($1, $2, $3, $4,$5);"

const create_nurse = async (username,email,pass,mobile,dob,gender,designation,document,hospital_name) => {
  try {
      const client = await getConnection.connect();
      const user = create_user(username,email,pass,mobile,dob,gender);
      
      const nid = await findpid(email);
      console.log(nid);
      const nid2 = nid[0].uid.toString();
      console.log(nid2);
      const stat = "pending";
      const hid = await findhid(hospital_name);
      const hid2 = hid[0].hospital_id.toString();
      const result = await client.query(CREATE_NURSE, [nid2,designation,stat,document,hid2]);
      client.release();
      return result.rowsAffected === 1;
  } catch (err) {
      console.error("Error creating nurse:", err);
      throw err;
  }
};

const CREATE_DRIVER = "INSERT INTO " + constant.TABLE_DRIVER +  "("
                    constant.TABLE_DRIVER_ID + "," +
                    constant.TABLE_DRIVER_STATUS + "," +
                    constant.TABLE_DRIVER_DOCUMENT +
                    constant.TABLE_DRIVER_AMBULANCE_TYPE +
                    constant.TABLE_DRIVER_HOSPITAL + ")" +
                    "VALUES ($1, $2, $3, $4 , $5);"

//hospital er bepar ta dekhte hobe ekhane
const create_driver = async (username,email,pass,mobile,dob,gender,type,document,hospital_name) => {
  try {
      const client = await getConnection.connect();
      const user = create_user(username,email,pass,mobile,dob,gender);
      
      const drid = await findpid(email);
      console.log(drid);
      const drid2 = drid[0].uid.toString();
      console.log(drid2);
      const stat = "pending";
      result = "";
      if(hospital_name == null){
      const hid = await findhid(hospital_name);
      const hid2 = hid[0].hospital_id.toString();
      result = await client.query(CREATE_DRIVER, [drid2,stat,document,type,hid2]);
      }
      else{
        result = await client.query(CREATE_DRIVER, [drid2,stat,document,type,null]);
      }
      client.release();
      return result.rowsAffected === 1;
  } catch (err) {
      console.error("Error creating driver:", err);
      throw err;
  }
};


//-------------------------------------------------------------------------
const UserDetail = "SELECT * FROM users where uname = $1"

const GET_USER_DETAIL = async (name) => {
    try {
        const client = await getConnection.connect();
        const result = await client.query(UserDetail, [name]);
        client.release();
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

//-------------------------------------------------------------------------
// const USERNAME_OCCUPIED = `SELECT COUNT(*) FROM ${constant.TABLE_USER} WHERE LOWER(${constant.TABLE_USER_USERNAME}) = LOWER($1)`
// const EMAIL_OCCUPIED = `SELECT COUNT(*) FROM ${constant.TABLE_USER} WHERE LOWER(${constant.TABLE_USER_EMAIL}) = LOWER($1)`

// const usernameAvailable = async (username) => {
//     const connection = await getConnection()
//     const result = await connection.execute(USERNAME_OCCUPIED, [username])
//     connection.release()
//     console.log(result.rows[0]['COUNT(*)']);
//     return result.rows[0]['COUNT(*)'] !== 1
// }

// const emailAvailable = async (email) => {
//     const connection = await getConnection()
//     const result = await connection.execute(EMAIL_OCCUPIED, [email])
//     connection.release()
//     return result.rows[0]['COUNT(*)'] !== 1
// }


// const UPDATE_PASSWORD = `UPDATE ${constant.TABLE_USER} SET ${constant.TABLE_USER_PASSWORD} = $1 WHERE ${constant.TABLE_USER_USERNAME} = $2`

// const updatePassword = async (username, password) => {
//     const connection = await getConnection()
//     const result = await connection.execute(UPDATE_PASSWORD, [password, username])
//     connection.release()
//     return result.rowsAffected === 1;
// }






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
                //   usernameAvailable,
                //   emailAvailable,
                //   updatePassword
                }