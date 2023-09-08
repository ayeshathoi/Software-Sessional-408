/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import Doctor from '@/assets/doctor.jpg';
axios.defaults.withCredentials = true;
function DoctorProfileUpdate() {
  const [isEditing, setIsEditing] = useState(false);
  const [prevForm, setPrevForm] = useState({
    name: '',
    speciality: '',
    designation: '',
    qualification: '',
    mobile_no: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    designation: '',
    qualification: '',
    mobile_no: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor/profile`)
      .then((response) => {
        setPrevForm({
          name: response.data.name,
          speciality: response.data.speciality,
          designation: response.data.designation,
          qualification: response.data.qualification,
          mobile_no: response.data.mobile_no,
        });
        setFormData({
          name: response.data.name,
          speciality: response.data.speciality,
          designation: response.data.designation,
          qualification: response.data.qualification,
          mobile_no: response.data.mobile_no,
        });
      })
      .catch((error) => {
        console.error('Error fetching doctor profile:', error);
      });
  });

  console.log('dehfbk', prevForm);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      // Send the formData to the server for update
      const response = await axios.post(
        `http://localhost:3000/doctor/updateProfile`,
        formData
      );
      console.log('Updated Data:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div >
        <HeaderDoctor />
      </div>
      <div className="mt-16 pt-16 py-8 px-4 flex justify-center items-center">

      <div className="w-1/5 p-6 bg-white shadow-md">
          <img src={Doctor} alt="Doctor" className="w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-xl font-semibold mb-2">{formData.name}</h2>
          <p className="text-gray-600">{formData.speciality},{formData.designation}</p>
          <p className="text-gray-600">{formData.qualification}</p>
        </div>
        <div className="w-1/2">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Doctor Profile</h1>
            <form>
              {/* Specialist */}
              <div className="mb-4">
                <div className="flex justify-center items-center">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Speciality:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.speciality}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* designation */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Designation:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.designation}</p>

                    )}
                  </div>
                </div>
              </div>
              {/* qualification */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Qualification:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.qualification}</p>
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

export default DoctorProfileUpdate;
