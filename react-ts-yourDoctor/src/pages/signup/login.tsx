import { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

function LogIn() {
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
      const formDataToSend = new FormData();
      formDataToSend.append('emailOrMobile', formData.emailOrMobile);
      formDataToSend.append('password', formData.password);

      // Replace the following code with your backend API call using Axios or Fetch
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formDataToSend,
      });

      // Handle the response from the backend (e.g., show success message, redirect, etc.)
      if (response.ok) {
        console.log('Login successful');
        // Redirect to the user dashboard or any other authenticated page
      } else {
        console.error('Login failed');
        // Handle error response from the backend (e.g., show error message, etc.)
      }
    } catch (error) {
      console.error('Error occurred while login:', error);
      // Handle any network or other errors that may occur during login
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
