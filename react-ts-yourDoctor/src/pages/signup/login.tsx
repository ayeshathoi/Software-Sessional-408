/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

const cookies = new Cookies();
const COOKIE_AGE = 31536000;

const checkAuth = () => {
  return !(cookies.get('token') === undefined || cookies.get('token') === null);
};

const logout = () => {
  cookies.remove('token', { path: '/' });
};

function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('form data', formData.email);
      await axios
        .post('http://localhost:3000/auth/login', formData)
        .then((res) => {
          console.log('sign in res', res);
          cookies.set('token', res.data.backendCookie, {
            path: '/',
            maxAge: COOKIE_AGE,
          });

          const userId = 5; // Replace with actual key
          const { userType } = res.data.type; // Replace with actual key
          console.log('here is type', res.data.type);
          let userProfileUrl = '';
          if (userType === 'doctor') {
            userProfileUrl = `/doctorHome/${userId}/`;
          } else if (userType === 'patient') {
            userProfileUrl = `/userHome/${userId}/`;
          } else if (userType === 'driver') {
            userProfileUrl = `/driverHome/${userId}/`;
          } else if (userType === 'nurse') {
            userProfileUrl = `/nurseHome/${userId}/`;
          } else if (res.data.type === 'hospital') {
            console.log('here is the hospital', `/hospitalHome/${userId}/`);
            userProfileUrl = `/hospitalHome/${userId}/`;
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
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Log In
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="email"
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline"
                  name="password"
                  type="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Log In
              </button>
              <a
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                href="/passwordreset"
              >
                Forgotten your Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 yourDoctor. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LogIn;
export { checkAuth, logout };
