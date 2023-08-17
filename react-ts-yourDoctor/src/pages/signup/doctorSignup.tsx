/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    dob: null,
    gender: 'male', // Default value
    designation: '',
    workplace1: '',
    workplace2: '',
    workplace3: '',
    specialization: '',
    zoomLink: '',
    pdfDocument: null,
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('pending', e.target);
    // const file = e.target.files && e.target.files[0];
    // if (file) {
    //   setFormData((prevFormData) => ({ ...prevFormData, pdfDocument: file }));
    // }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:3000/auth/register/doctor', formData)
        .then((res) => {
          console.log('here is the form', res.data);
          navigate('/LogIn');
        });
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
          backgroundColor: 'ghostwhite',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // opacity: 0.5, // Adjust the opacity as needed (0.0 to 1.0)
        }}
      >
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg bg-pink-50">
          <h1
            style={{ fontWeight: 'bold', fontSize: '24px', color: 'royalblue' }}
          >
            Doctor Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4"
          >
            <TextField
              label="Name"
              name="firstName"
              value={formData.name}
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
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="inline-flex"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="Workplace 1 (Compulsory)"
              name="workplace1"
              value={formData.workplace1}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="Workplace 2 (Optional)"
              name="workplace2"
              value={formData.workplace2}
              onChange={handleChange}
              variant="outlined"
              className="w-full"
            />

            <TextField
              label="Workplace 3 (Optional)"
              name="workplace3"
              value={formData.workplace3}
              onChange={handleChange}
              variant="outlined"
              className="w-full"
            />

            <TextField
              label="Zoom Meeting Link"
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
              variant="outlined"
              className="w-full"
            />

            <div className="col-span-2 mb-8">
              <label
                htmlFor="pdfDocument"
                className="text-black px-2.5 text-lg font-semibold py-2 "
              >
                PDF Document Submission
              </label>
              <input
                type="file"
                id="pdfDocument"
                name="pdfDocument"
                onChange={handleFileChange}
                accept=".pdf"
                className="w-half rounded-md rounded-r-none px-3 py-2"
              />
            </div>

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
