/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
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
    workplace1: '',
    qualification: '',
    pdfDocument: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({ ...prevFormData, pdfDocument: file }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Replace the following code with your backend API call using Axios or Fetch
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formDataToSend,
      });

      // Handle the response from the backend (e.g., show success message, redirect, etc.)
      if (response.ok) {
        console.log('Signup successful');
        // Redirect to a success page or login page
      } else {
        console.error('Signup failed');
        // Handle error response from the backend (e.g., show error message, etc.)
      }
    } catch (error) {
      console.error('Error occurred while signup:', error);
      // Handle any network or other errors that may occur during signup
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
          backgroundColor: 'lightpink',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // opacity: 0.5, // Adjust the opacity as needed (0.0 to 1.0)
        }}
      >
        <div className="pt-20 flex flex-col items-center justify-center">
          <h1
            style={{ fontWeight: 'bold', fontSize: '24px', color: 'darkred' }}
          >
            Nurse Signup
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label
                htmlFor="firstName"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2"
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
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="lastName"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="email"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none  bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="mobile"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none  bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none  bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15">
                Date of Birth
              </label>
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                  className="w-33 ml-4 rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
                />
                <input
                  type="text"
                  placeholder="Month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-33 ml-4 rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
                />
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-33 ml-4 rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
                />
              </div>
            </div>
            <div className="mb-8">
              <div className="mb-4">
                <label className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15">
                  Gender
                </label>
              </div>
              <div className="mb-8">
                <label className="bg-fuchsia-900 px-2.5 text-lg font-semibold py-2 h-15">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />{' '}
                  Male
                </label>
                <label className="bg-fuchsia-900 px-2.5 text-lg font-semibold py-2 h-15">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />{' '}
                  Female
                </label>
                <label className="bg-fuchsia-900 px-2.5 text-lg font-semibold py-2 h-15">
                  <input
                    type="radio"
                    name="gender"
                    value="custom"
                    checked={formData.gender === 'custom'}
                    onChange={handleChange}
                  />{' '}
                  Custom
                </label>
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="designation"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="workplace1"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
              >
                Workplace 1 (Compulsory)
              </label>
              <input
                type="text"
                id="workplace1"
                name="workplace1"
                value={formData.workplace1}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="qualification"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
              >
                Specialization
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="pdfDocument"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
              >
                PDF Document Submission
              </label>
              <input
                type="file"
                id="pdfDocument"
                name="pdfDocument"
                onChange={handleFileChange}
                accept=".pdf"
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <button
              type="submit"
              className="text-black px-2.5 text-lg font-semibold py-2 h-15 bg-violet-900"
            >
              Sign Up
            </button>
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
