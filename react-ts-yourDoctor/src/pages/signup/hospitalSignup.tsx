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
      <div
        className="flex flex-col items-center justify-center"
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
            Hospital Signup
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 mt-4">
              <label
                htmlFor="hospital_name"
                className="text-black px-2 text-lg font-semibold bg-indigo-300 py-2"
              >
                Hospital Name
              </label>
              <input
                type="text"
                id="hospital_name"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="email"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none  bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none  bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="Mobile"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Mobile No.
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none  bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="street"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Street No.
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="thana"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Thana
              </label>
              <input
                type="text"
                id="thana"
                name="thana"
                value={formData.thana}
                onChange={handleChange}
                required
                className="w-20 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
              <label
                htmlFor="city"
                className="text-black ml-2 px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-20 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
              <label
                htmlFor="district"
                className="text-black ml-2 px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                district
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-20 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="pdfDocument"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                PDF Document Submission
              </label>
              <input
                type="file"
                id="pdfDocument"
                name="pdfDocument"
                onChange={handleFileChange}
                accept=".pdf"
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-black px-2.5 text-lg font-semibold py-2  bg-indigo-500"
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
