/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/login', formData).then((res) => {
        console.log('here is the form', res.data);

        const { userId } = res.data; // Replace with actual key
        const { userType } = res.data; // Replace with actual key
        let userProfileUrl = '';
        if (userType === 'doctor') {
          userProfileUrl = `/doctorHome/${userId}`;
        } else if (userType === 'patient') {
          userProfileUrl = `/userHome/${userId}`;
        } else if (userType === 'driver') {
          userProfileUrl = `/driverHome/${userId}`;
        } else if (userType === 'nurse') {
          userProfileUrl = `/nurseHome/${userId}`;
        } else if (userType === 'hospital') {
          userProfileUrl = `/hospitalHome/${userId}`;
        }
        navigate(userProfileUrl);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <p>&</p>
      </div>
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg bg-pink-50">
          <h1
            style={{ fontWeight: 'bold', fontSize: '24px', color: 'royalblue' }}
          >
            Log In
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-8 mt-4">
              <label
                htmlFor="emailOrMobile"
                className="text-black px-2.5 text-lg justify-center font-semibold bg-indigo-300 py-2 h-15"
              >
                Email or Mobile Number
              </label>
              <input
                type="text"
                id="emailOrMobile"
                name="emailOrMobile"
                value={formData.emailOrMobile}
                onChange={handleChange}
                required
                className="w-full rounded-md rounded-r-none mt-4 bg-indigo-200 px-10 py-2 h-15"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="text-black px-2.5 text-lg font-semibold bg-indigo-300 py-2 h-15"
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
                className="w-full rounded-md rounded-r-none mt-4 bg-indigo-200 px-10 py-2 h-15"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-black px-2.5 text-lg font-semibold py-2 h-15 bg-indigo-500"
              >
                Log In
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

export default LogIn;
