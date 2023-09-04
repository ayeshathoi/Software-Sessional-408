import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './navbar/header';
import Footer from './navbar/footer';

function Chatbox() {
  const userId = 2;
  const [formData, setFormData] = useState({
    msg_content: '',
    msg_time: '',
    msg_date: '',
    msg_sender: '',
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
        .post('http://localhost:3000/comment/get/2', formData)
        .then((res) => {
          console.log('here is the form', res.data);
          //   navigate('/LogIn');
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

      <div className="fit-content p-20 ">
        <p className="text-gray-400">Patient Address</p>
        <p className="text-gray-400 justify-right">Patient Name</p>
        <hr className="line-below-text my-4 border-t-2 border-red-300" />
      </div>

      <div className="flex px-20 pt-10">
        <div className="w-half rounded-md rounded-lg bg-gray-200 px-3 py-2 ">
          <div className="mb-8 mt-4">
            <p className="text-sm font-bold text-indigo-500">
              msg sort by time
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Chatbox;
