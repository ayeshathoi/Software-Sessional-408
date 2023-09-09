/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import Navbar from '../navbar/headerCommon';
import Footer from '../navbar/footer';
import { login } from '@/api/apiCalls';

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
      const ret = await login(formData);
      console.log(ret);

      if (ret) {
        let userProfileUrl = '';
        if (ret === 'doctor') {
          userProfileUrl = `/doctorHome/`;
        } else if (ret === 'patient') {
          userProfileUrl = `/userHome`;
        } else if (ret === 'driver') {
          userProfileUrl = `/driverHome`;
        } else if (ret === 'nurse') {
          userProfileUrl = `/nurseHome`;
        } else if (ret === 'hospital') {
          userProfileUrl = `/hospitalHome`;
        }
        navigate(userProfileUrl);
        alert('Login Successful');
      }

    } catch (err) {
      alert('Invalid email or password');
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
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4 text-green-700">
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
                  placeholder="Email"
                  value={formData.email}
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
            <div className="flex items-center justify-center">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-green-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Log In
              </button>
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
