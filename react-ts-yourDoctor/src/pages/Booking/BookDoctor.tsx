import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function BookDoctor() {
  const [formData, setFormData] = useState({
    Name: '',
    mobile: '',
    Date: '',
    Time: '',
    Payment_Method: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:3000/Booking/Doctor', formData)
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
        <Header />
      </div>

      <div
        className="text-above-line my-10 text-left p-20 "
        style={{ marginLeft: '10%' }}
      >
        <p className="text-gray-400">Booking</p>
        <hr className="line-below-text my-4 border-t-2 border-gray-300" />

        <div className="flex">
          <div className="px-20">
            <h1 className="text-sm font-bold text-indigo-500">
              Choose Payment Method
            </h1>
            <hr />
            <div className="mt-4">
              <input
                type="radio"
                id="Payment_Method"
                name="Payment_Method"
                value="Cash"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
              <label className="ml-4 mt-6 text-sm font-bold text-gray-400">
                Cash
              </label>
            </div>
            <div className="mt-4">
              <input
                type="radio"
                id="Payment_Method"
                name="Payment_Method"
                value="Bkash"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
              <label className="ml-4 mt-6 text-sm font-bold text-gray-400">
                Bkash
              </label>
            </div>
            <div className="mt-4">
              <input
                type="radio"
                id="Payment_Method"
                name="Payment_Method"
                value="Bkash"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
              <label className="ml-4 mt-6 text-sm font-bold text-gray-400">
                Nagad
              </label>
            </div>
            <div className="mt-4">
              <input
                type="radio"
                id="Payment_Method"
                name="Payment_Method"
                value="Bkash"
                onChange={handleChange}
                required
                className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
              />
              <label className="ml-4 mt-6 text-sm font-bold text-gray-400">
                Rocket
              </label>
            </div>
          </div>

          <div className="flex fit-content">
            <div className="pt-30 px-20 rounded-3xl shadow-2xl bg-white border-2 border-gray-200">
              <h1 className="text-sm font-bold text-indigo-500 mt-10">
                Appointment with Dr Doctor Name here
              </h1>
              <hr />

              <form onSubmit={handleSubmit}>
                <div className="mb-8 mt-4">
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2"
                  />
                </div>
                <div className="mb-8">
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile no."
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg  bg-gray-200 px-3 py-2"
                  />
                </div>
                <div className="mb-8">
                  <input
                    type="Date"
                    id="Date"
                    name="Date"
                    placeholder="Date"
                    value={formData.Date}
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg text-gray-400 bg-gray-200 px-3 py-2"
                  />

                  <input
                    type="time"
                    id="Time"
                    name="Time"
                    placeholder="Time"
                    value={formData.Time}
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg text-gray-400 bg-gray-200 px-3 py-2 ml-5"
                  />
                </div>
                <label className="text-sm text-gray-300">
                  Meeting type
                </label>
                <div className="mb-8">
                  <input
                    type="radio"
                    id="Payment_Method"
                    name="Payment_Method"
                    value={formData.Payment_Method}
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg px-3 py-2 "
                  />
                  <label className="ml-4 mt-6 text-sm font-bold text-gray-400">
                    Online
                  </label>
                  <input
                    type="radio"
                    id="Payment_Method"
                    name="Payment_Method"
                    value={formData.Payment_Method}
                    onChange={handleChange}
                    required
                    className="w-half rounded-md rounded-lg px-3 py-2 ml-4"
                  />
                  <label className="ml-4 text-sm font-bold text-gray-400">
                    Hospital Name of Doctors
                  </label>
                  <div className="mt-4">
                    <h2 className="text-sm font-bold text-indigo-500">
                      Visit Fee
                    </h2>
                    <hr />
                    </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-indigo-300 text-white px-2.5 text-lg rounded-lg py-1.5"
        >
          Confirm
        </button>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default BookDoctor;
