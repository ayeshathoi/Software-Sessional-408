/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import { reg_patient } from '@/api/apiCalls';

function PatientSignup() {
  const [formData, setFormData] = useState({
    uname: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
    gender: 'male', // Default value
    street: '',
    thana: '',
    city: '',
    district: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requiredFields = ['dob'];
      const emptyFields = requiredFields.filter(
        (fieldName) => !formData[fieldName]
      );

      if (emptyFields.length > 0) {
        alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
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
      if (formData.mobile.length !== 11) {
        alert('Mobile number should be 11 digits.');
        return;
      }
      const ret = reg_patient(formData);
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
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg">
          <h1 style={{ fontWeight: 'bold', fontSize: '24px', color: 'green' }}>
            Patient Signup
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
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
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
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Thana"
              name="thana"
              value={formData.thana}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="District"
              name="district"
              value={formData.district}
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

export default PatientSignup;
