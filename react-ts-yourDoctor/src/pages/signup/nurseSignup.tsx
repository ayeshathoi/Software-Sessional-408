/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function NurseSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: 'male', // Default value
    designation: '',
    workplace: '',
    qualification: '',
    pdfDocument: null,
  });

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:3000/registerNurse', formData)
        .then((res) => {
          console.log('here is the form', res.data);
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
            Nurse Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-y-0 gap-x-6 ml-32 mt-4"
          >
            <div className="mb-8">
              <label
                htmlFor="firstName"
                className="text-black px-2 text-lg font-semibold bg-indigo-300 py-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="lastName"
                className="text-black px-2 text-lg font-semibold bg-indigo-300 py-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
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
                htmlFor="mobile"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Mobile Number
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
            <div className="mb-8 flex items-center">
              <label className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2">
                Date of Birth
              </label>
              <div className="ml-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="Day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                  className="w-16 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-16 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-20 rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
                />
              </div>
            </div>

            <div className="mb-8 flex items-center">
              <label className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2">
                Gender
              </label>
              <div className="ml-4 flex space-x-4">
                <span className="bg-indigo-100 px-2.5 text-lg font-semibold py-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />{' '}
                  Male
                </span>
                <span className="bg-indigo-100 px-2.5 text-lg font-semibold py-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />{' '}
                  Female
                </span>
                <span className="bg-indigo-100 px-2.5 text-lg font-semibold py-2">
                  <input
                    type="radio"
                    name="gender"
                    value="custom"
                    checked={formData.gender === 'custom'}
                    onChange={handleChange}
                  />{' '}
                  Custom
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="designation"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="workplace"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Workplace(Compulsory)
              </label>
              <input
                type="text"
                id="workplace"
                name="workplace"
                value={formData.workplace}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="qualification"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 "
              >
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-indigo-200 px-3 py-2"
              />
            </div>

            <div className="col-span-2 mb-8">
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
            <div className="col-span-2 flex justify-center">
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

export default NurseSignup;
