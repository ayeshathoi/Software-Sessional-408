/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function NurseSignup() {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    mobile: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: 'male', // Default value
    designation: '',
    hospital: '',
    qualification: '',
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:3000/register/nurse', formData)
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
      <div className="flex flex-col items-center justify-center">
        <div className="pt-40 pb-20 px-20 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-indigo-500 mt-10">
            Nurse SignUp
          </h1>
          <p className="text-sm text-gray-300 mt-5">
            Please fill in this form to create an account!
          </p>
          <hr />

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="Name"
              className="gap-2 text-gray-400 text-sm font-semibold "
            >
              Name
            </label>
            <div className="mb-8">
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                placeholder="Name"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="email"
              className="text-gray-400 text-sm font-semibold "
            >
              Email
            </label>
            <div className="mb-8">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg  bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="mobile"
              className="text-gray-400 text-sm font-semibold "
            >
              Mobile Number
            </label>

            <div className="mb-8">
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg  bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="password"
              className="text-gray-400 text-sm font-semibold "
            >
              Password
            </label>
            <div className="mb-8">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-half rounded-md rounded-lg  bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="dob"
              className="text-gray-400 text-sm font-semibold "
            >
              Date of Birth
            </label>
            <div className="mb-8 flex items-center">
              <div className="flex space-x-4">
                <span className="bg-gray-200 px-2.5 text-lg rounded-lg font-semibold py-2">
                  <input
                    type="number"
                    id="day"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    placeholder="DD"
                    required
                    className="w-16 rounded-md rounded-lg bg-gray-200 px-3 py-2"
                  />
                </span>
                <span className="bg-gray-200 px-2.5 text-lg rounded-lg font-semibold py-2">
                  <input
                    type="number"
                    id="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    placeholder="MM"
                    required
                    className="w-16 rounded-md rounded-lg bg-gray-200 px-3 py-2"
                  />
                </span>
                <span className="bg-gray-200 px-2.5 text-lg rounded-lg font-semibold py-2">
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="YYYY"
                    required
                    className="w-20 rounded-md rounded-lg bg-gray-200 px-3 py-2"
                  />
                </span>
              </div>
            </div>

            <label
              htmlFor="Gender"
              className="text-gray-400 text-sm font-semibold "
            >
              Gender
            </label>
            <div className="mb-8 flex items-center">
              <div className="flex space-x-4">
                <span className="bg-gray-200 text-gray-400 px-2.5 text-sm rounded-sm font-semibold py-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />{' '}
                  Male
                </span>
                <span className="bg-gray-200 text-gray-400 px-2.5 text-sm rounded-sm font-semibold py-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />{' '}
                  Female
                </span>
                <span className="bg-gray-200 text-gray-400 px-2.5 text-sm rounded-sm font-semibold py-2">
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
            <label
              htmlFor="Workplace"
              className="text-gray-400 text-sm font-semibold "
            >
              Workplace
            </label>
            <div className="mb-8">
              <input
                type="text"
                id="Hospital"
                name="Hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
            </div>

            <label
              htmlFor="Designation"
              className="text-gray-400 text-sm font-semibold "
            >
              Designation
            </label>
            <div className="mb-8">
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="qualification"
              className="text-gray-400 text-sm font-semibold "
            >
              Qualification
            </label>
            <div className="mb-8">
              <input
                type="text"
                id="qualification"
                name="qualification"
                placeholder="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
            </div>
            <label
              htmlFor="pdfDocument"
              className="text-black px-2.5 text-sm font-semibold py-2 "
            >
              PDF Document Submission
            </label>
            <div className="col-span-2 mb-8">
              <input
                type="file"
                id="pdfDocument"
                name="pdfDocument"
                onChange={handleFileChange}
                accept=".pdf"
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-indigo-300 text-white px-2.5 text-lg rounded-lg font-semibold py-2"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default NurseSignup;
