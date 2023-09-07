/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

const baseURL = 'http://localhost:3000';

axios.defaults.withCredentials = true;

export const bookAmbulance = async (dataToSend) => {
  const ret = await axios.post(`${baseURL}/booking/ambulance`, dataToSend);
  return ret.data;
};

export const bookCheckup = async (dataToSend) => {
  const ret = await axios.post(`${baseURL}/booking/checkup`, dataToSend);
  return ret.data;
};

export const bookDoctor = async (dataToSend) => {
  const ret = await axios.post(`${baseURL}/booking/appointment`, dataToSend);
  return ret.data;
};

export const getTimeline = async (doctorID) => {
  const ret = await axios.get(`${baseURL}/doctor/timeline/${doctorID}`);
  console.log(ret.data);
  return ret.data;
};

export const getComments_Chatbox = async (bookingID) => {
  const ret = await axios.post(`${baseURL}/comment/get`, {
    booking_id: bookingID,
  });
  console.log(ret.data);
  return ret.data;
};

export const addComment_Chatbox = async (formData) => {
  const ret = await axios.post(`${baseURL}/comment/add`, formData);
  return ret.data;
};

export const addSchedule_Doctor = async (requestData) => {
  const ret = await axios.post(`${baseURL}/doctor/addschedule`, requestData);
  return ret.data;
};

export const getDoctorDetails = async () => {
  const ret = await axios.get(`${baseURL}/doctor/details`);
  return ret.data;
};

export const doctor_patient_list = async (requestBody) => {
  const ret = await axios.post(`${baseURL}/doctor/patientlist`, requestBody);
  return ret.data;
};

export const driverDetails = async () => {
  const ret = await axios.get(`${baseURL}/driver`);
  return ret.data[0];
};

export const driver_patient_list = async () => {
  const ret = await axios.get(`${baseURL}/driver/order`);
  return ret.data;
};

export const addTest = async (formData) => {
  const ret = await axios.post(`${baseURL}/hospital/addtest`, formData);
  return ret;
};

export const allTest = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/test`);
  return ret.data;
};

export const deleteTest = async (data) => {
  const ret = await axios.post(
    `http://localhost:3000/hospital/test/delete/${testid}`,
    data
  );
  return ret;
};

export const booking_to_assign_nurse = async (bookingID) => {
  const ret = await axios.get(
    `http://localhost:3000/hospital/onebooking/${bookingID}`
  );
  return ret.data;
};

export const assign_nurse = async (data) => {
  const ret = await axios.post(
    `http://localhost:3000/hospital/assign/nurse`,
    data
  );
  return ret.data;
};

export const available_nurse_to_assign = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/nurse`);
  return ret.data;
};

export const editTestprice = async (formData) => {
  const res = await axios.post(
    `http://localhost:3000/hospital/updateprice`,
    formData
  );
  return res.data;
};

export const test_Details = async (testID) => {
  const ret = await axios.get(`http://localhost:3000/hospital/test/${testID}`);
  return ret.data;
};

export const available_doctor_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/doctor`);
  return ret.data;
};

export const available_driver_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/driver`);
  return ret.data;
};

export const available_nurse_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/nurse`);
  return ret.data;
};

export const remove_employee = async (data) => {
  const ret = await axios.post(`http://localhost:3000/hospital/remove`, data);
  return ret.data;
};

export const pending_doctor_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/pending/doctor`);
  return ret.data;
};

export const pending_nurse_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/pending/nurse`);
  return ret.data;
};

export const pending_driver_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/pending/driver`);
  return ret.data;
};

export const update_employee = async (data) => {
  const ret = await axios.post(
    `http://localhost:3000/hospital/update/employee`,
    data
  );
  return ret.data;
};

export const pending_patient_req = async () => {
  const ret = await axios.get(`http://localhost:3000/hospital/booking`);
  return ret.data;
};

export const allReview_hospital = async () => {
  const ret = await axios.get(`http://localhost:3000/review`);
  return ret.data;
};

export const nurse_profile = async () => {
  const ret = await axios.get(`http://localhost:3000/nurse`);
  return ret.data;
};

export const nurse_patient_list = async () => {
  const ret = await axios.get(`http://localhost:3000/nurse/checkup`);
  return ret.data;
};

export const ambulanceSearch = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/ambulanceall`);
  return ret.data;
};

export const checkupSearch = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/testall`);
  return ret.data;
};

export const doctorSearch = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/doctorall`);
  return ret.data;
};

export const reg_doctor = async (formData) => {
  const ret = await axios.post(
    'http://localhost:3000/auth/register/doctor',
    formData
  );
  return ret.data;
};

export const reg_nurse = async (formData) => {
  const ret = await axios.post(
    'http://localhost:3000/auth/register/nurse',
    formData
  );
  return ret.data;
};

export const reg_driver = async (formData) => {
  const ret = await axios.post(
    'http://localhost:3000/auth/register/driver',
    formData
  );
  return ret.data;
};

export const reg_hospital = async (formData) => {
  const ret = await axios.post(
    'http://localhost:3000/auth/register/hospital',
    formData
  );
  return ret.data;
};

export const reg_patient = async (formData) => {
  const ret = await axios.post(
    'http://localhost:3000/auth/register/patient',
    formData
  );
  return ret.data;
};

export const login = async (formData) => {
  const ret = await axios.post('http://localhost:3000/auth/login', formData);
  return ret.data;
};

export const patient_ambulance = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/ambulance`);
  console.log(ret.data);
  return ret.data;
};

export const patient_appointment = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/appointment`);
  return ret.data;
};

export const patient_checkup = async () => {
  const ret = await axios.get(`http://localhost:3000/patient/checkup`);
  return ret.data;
};

export const patient_profile = async () => {
  const ret = await axios.get(`http://localhost:3000/user/frontend`);
  return ret.data;
};

export const editHospitalList_doctor = async (selectedHospital, doctor_id) => {
  const ret = await axios.get(
    `http://localhost:3000/doctor/timeline/${doctor_id}/?hospital=${selectedHospital}`
  );
  console.log(ret.data);
  return ret.data;
};

export const deleteTimeline_doctor = async (timeline_id) => {
  const ret = await axios.post(
    `http://localhost:3000/doctor/deleteSCHEDULE/${timeline_id}`
  );
  return ret.data;
};

export const updateSchedule_doctor = async (timeline_id, requestData) => {
  const ret = await axios.post(
    `http://localhost:3000/doctor/update-Schedule/${timeline_id}`,
    requestData
  );
  return ret.data;
};

export const addreview = async (booking_id, requestData) => {
  console.log('request data', requestData);
  const ret = await axios.post(
    `http://localhost:3000/review/${booking_id}`,
    requestData
  );
  return ret.data;
};
