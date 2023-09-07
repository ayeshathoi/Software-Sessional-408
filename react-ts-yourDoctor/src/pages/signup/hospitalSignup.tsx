/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';

import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import { reg_hospital } from '@/api/apiCalls';

function HospitalSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital_name: '',
    email: '',
    password: '',
    mobile: '',
    street: '',
    thana: '',
    city: '',
    district: '',
    reg_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('pending', e.target);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await axios
      //   .post('http://localhost:3000/auth/register/hospital', formData)
      //   .then((res) => {
      //     console.log('here is the form', res.data);
      //     navigate('/LogIn/');
      //   });
      const ret = reg_hospital(formData);
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
          <h1
            style={{ fontWeight: 'bold', fontSize: '24px', color: 'green' }}
          >
            Hospital Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4"
          >
            <TextField
              label="Hospital Name"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
             <TextField
              label="Registration ID"
              name="reg_id"
              value={formData.reg_id}
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

export default HospitalSignup;
