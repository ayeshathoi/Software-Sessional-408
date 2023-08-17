/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function HospitalSignup() {
  const [formData, setFormData] = useState({
    hospital_name: '',
    email: '',
    password: '',
    mobile: '',
    street: '',
    thana: '',
    city: '',
    district: '',
    pdfDocument: null,
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
      console.log('Form data before submission:', formData);

      const response = await axios.post(
        'http://localhost:3000/auth/register/hospital',
        formData
      );

      console.log('Server response:', response.data);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pt-40 pb-20 px-20 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-500">
            Hospital SignUp
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-8 mt-4">
              <input
                type="text"
                id="hospital_name"
                name="hospital_name"
                value={formData.hospital_name}
                placeholder="Hospital Name"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-5 py-2"
              />
            </div>

            <div className="mb-8">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-5 py-2"
              />
            </div>

            <div className="mb-8">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-5 py-2"
              />
            </div>

            <div className="mb-8">
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-5 py-2"
              />
            </div>

            <div className="mb-8">
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-5 py-2"
              />
            </div>

            <div className="mb-8">
              <input
                type="text"
                id="thana"
                name="thana"
                value={formData.thana}
                onChange={handleChange}
                placeholder="Thana"
                required
                className="w-20 rounded-md rounded-xl bg-gray-200 px-3 py-2"
              />
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-20 rounded-md rounded-xl bg-gray-200 px-3 py-2 ml-2"
              />
              <input
                type="text"
                id="district"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-20 rounded-md rounded-xl bg-gray-200 px-3 py-2 ml-2"
              />
            </div>
            <label
              htmlFor="pdfDocument"
              className="text-sm font-semibold text-gray-700"
            >
              upload Hospital registration certificate
            </label>
            <div className="mb-8">
              <input
                type="file"
                id="pdfDocument"
                name="pdfDocument"
                onChange={handleFileChange}
                required
                className="w-half rounded-md rounded-xl bg-gray-200 px-3 py-2"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-black px-2.5 rounded-xl text-lg text-white font-semibold py-2  bg-indigo-500"
              >
                Sign Up
              </button>
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
