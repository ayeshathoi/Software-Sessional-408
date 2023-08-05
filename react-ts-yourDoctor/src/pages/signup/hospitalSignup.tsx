/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function HospitalSignup() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    streetNumber: '',
    thana: '',
    city: '',
    division: '',
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
            Hospital Signup
          </h1>
          <form onSubmit={handleSubmit}>
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
                Full Address
              </label>
            </div>
            <div className="mb-8">
              <label
                htmlFor="streetNumber"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
              >
                Street Number
              </label>
              <input
                type="text"
                id="streetNumber"
                name="streetNumber"
                value={formData.streetNumber}
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="thana"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="city"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
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
                className="w-half rounded-md rounded-r-none bg-pink-600 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="division"
                className="text-black px-2.5 text-lg font-semibold bg-fuchsia-300 py-2 h-15"
              >
                Division
              </label>
              <input
                type="text"
                id="division"
                name="division"
                value={formData.division}
                onChange={handleChange}
                required
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

export default HospitalSignup;
