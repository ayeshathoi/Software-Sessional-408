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
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg bg-pink-50">
          <h1
            style={{ fontWeight: 'bold', fontSize: '24px', color: 'royalblue' }}
          >
            Log In
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-8 mt-4">
              <label
                htmlFor="email"
                className="text-black px-2.5 text-lg justify-center font-semibold bg-indigo-300 py-2 h-15"
              >
                Email or Mobile Number
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
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
export { checkAuth, logout };
