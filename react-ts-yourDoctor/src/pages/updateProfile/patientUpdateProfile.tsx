import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../navbar/header';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';


function PatientProfileUpdate() {
  const { userid } = useParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [prevForm, setPrevForm] = useState({
    name: '',
    street: '',
    thana: '',
    city: '',
    district: '',
    mobile_no: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    street: '',
    thana: '',
    city: '',
    district: '',
    mobile_no: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patient/profile/${userid}`)
      .then((response) => {
        setPrevForm({
          name: response.data.name,
          street: response.data.street,
          thana: response.data.thana,
          city: response.data.city,
          district: response.data.district,
          mobile_no: response.data.mobile_no,
        });
        setFormData({
          name: response.data.name,
          street: response.data.street,
          thana: response.data.thana,
          city: response.data.city,
          district: response.data.district,
          mobile_no: response.data.mobile_no,
        });

      })
      .catch((error) => {
        console.error('Error fetching patient profile:', error);
      });
  }, [userid]);

  console.log("dehfbk",prevForm);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      
      console.log("here is the formdata",formData,{userid})
      const response = await axios.post(`http://localhost:3000/patient/${userid}`, formData); 
      console.log('Updated Data:', response.data); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className="bg-lightpink py-6">
        <Header />
      </div>
      <div className="flex">
        {/* User's Photo, Name, and Number */}
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={User} alt="User" className="h-40 w-full object-cover" />
          <h2 className="text-xl font-semibold mb-2">{formData.name}</h2>
          <p className="text-gray-600">{formData.mobile_no}</p>
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update User Profile</h1>
            <form>
              {/* Street */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Street: </label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.street}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* thana */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Thana:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="thana"
                        value={formData.thana}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.thana}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* city */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">City:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.city}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* district */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">District:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.district}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Contact no. */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Contact no.:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.mobile_no}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {isEditing ? (
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-4 mx-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default PatientProfileUpdate;
