/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Tooltip,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

import { hospital_name_list, reg_doctor } from '@/api/apiCalls';

interface FormData {
  uname: string;
  email: string;
  mobile: string;
  password: string;
  dob: string;
  gender: string;
  designation: string;
  hospital_name: string[]; // Define hospital_name as a string array
  newHospital: string;
  speciality: string;
  zoom_link: string;
  pdfDocument: File | null;
  qualification: string;
  old_patient_fee: number;
  new_patient_fee: number;
  nid: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface hospitalNames {
  hospital_name: string;
}

function DoctorSignup() {
  const [formData, setFormData] = useState<FormData>({
    uname: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
    gender: 'male', // Default value
    designation: '',
    hospital_name: [],
    newHospital: '',
    speciality: '',
    zoom_link: '',
    pdfDocument: null,
    qualification: '',
    old_patient_fee: 0,
    new_patient_fee: 0,
    nid: '',
  });

  const navigate = useNavigate();
  const [hospitalList, setHospitalNames] = useState<string[]>([]);

  useEffect(() => {
    hospital_name_list().then((res) => {
      setHospitalNames(res.result);
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleHospitalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      hospital_name: e.target.value.split(',').map((name) => name.trim()),
    }));
  };
  console.log('gfgug', formData.hospital_name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ['dob', 'zoom_link'];
    const emptyFields = requiredFields.filter(
      (fieldName) => !formData[fieldName]
    );

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    if (formData.mobile.length !== 11) {
      alert('Mobile number should be 11 digits.');
      return;
    }

    if (formData.password.length < 4 || formData.password.length > 8) {
      alert('Password should be between 4 and 8 characters.');
      return;
    }

    if (!/^\d+$/.test(formData.mobile)) {
      alert('Mobile number should contain numbers only.');
      return;
    }
    if (!/^\d+$/.test(formData.nid)) {
      alert('NID should contain numbers only.');
      return;
    }

    if (formData.new_patient_fee === 0) {
      alert('Patient fees cannot be 0');
      return;
    }
    if (formData.old_patient_fee === 0) {
      alert('Patient fees cannot be 0');
      return;
    }

    const validHospitalNames = hospitalList.map(
      (hospital) => hospital.hospital_name
    );

    // Check for invalid hospitals by comparing with validHospitalNames
    const invalidHospitals = formData.hospital_name.filter(
      (enteredHospital) => !validHospitalNames.includes(enteredHospital)
    );

    if (invalidHospitals.length > 0) {
      alert(
        `The following hospitals are not valid: ${invalidHospitals.join(', ')}`
      );
      return;
    }

    try {
      const ret = reg_doctor(formData);
      navigate('/LogIn');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        className="flex flex-col items-center justify-center mt-36"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // opacity: 0.5, // Adjust the opacity as needed (0.0 to 1.0)
        }}
      >
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg ">
          <h1 style={{ fontWeight: 'bold', fontSize: '24px', color: 'green' }}>
            Doctor Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4"
          >
            <TextField
              label="Name"
              name="uname"
              value={formData.uname}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Nid Number"
              name="nid"
              value={formData.nid}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={formData.dob}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
            <div>
              <label
                htmlFor="Gender"
                className="text-gray-400 text-sm font-semibold "
              >
                Gender
              </label>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="inline-flex"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="Custom"
                />
              </RadioGroup>
            </div>

            <TextField
              label="Zoom Meeting Link"
              name="zoom_link"
              value={formData.zoom_link}
              onChange={handleChange}
              variant="outlined"
              className="w-full"
            />

            <TextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="Speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <Tooltip title="Type hospitals from Available hopsitals">
              <TextField
                label="Hospital Names"
                name="hospital_name"
                value={formData.hospital_name.join(', ')}
                onChange={handleHospitalChange}
                variant="outlined"
                className="w-full"
                multiline
                rows={1}
                inputProps={{
                  style: { minHeight: '20px' },
                }}
              />
            </Tooltip>

            <TextField
              label="Old Patient Fee"
              name="old_patient_fee"
              type="number"
              value={formData.old_patient_fee}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <select
              name="hospitalname"
              value="0"
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              <option value="0">Available hospitals</option>
              {hospitalList.map((hospital) => (
                <option value={hospital.hospital_name}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>

            <TextField
              label="New Patient Fee"
              name="new_patient_fee"
              type="number"
              value={formData.new_patient_fee}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <div className="col-span-2 flex justify-center">
              <Button type="submit" variant="contained" color="success">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default DoctorSignup;
