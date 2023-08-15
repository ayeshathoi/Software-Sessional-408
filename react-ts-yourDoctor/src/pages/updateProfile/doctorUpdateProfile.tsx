/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import Doctor from '@/assets/doctor.jpg';

function DoctorProfileUpdate() {
  const initialData = {
    specialist: 'Cardiologist',
    designation: 'Senior Consultant',
    qualification: 'MBBS, MD',
    workplace1: 'City Hospital',
    workplace2: 'Medical Center',
    workplace3: 'Ibn Sina',
    contactNumber: '123-456-7890',
  };

  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    // Replace this with your update logic to send formData to the server
    console.log('Updated Data:', formData);
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-lightpink py-6">
        <HeaderDoctor />
      </div>
      <div className="flex">
        {/* Doctor's Photo, Name, and Specialist */}
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={Doctor} alt="Doctor" className="h-40 w-full object-cover" />
          <h2 className="text-xl font-semibold mb-2">Afsana</h2>
          <p className="text-gray-600">{formData.specialist}</p>
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Doctor Profile</h1>
            <form>
              {/* Specialist */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Specialist:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialist"
                        value={formData.specialist}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.specialist}</p>
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
              {/* workplace 1 */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Workplace 1:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="workplace1"
                        value={formData.workplace1}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.workplace1}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* workplace 2 */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Workplace 2:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="workplace2"
                        value={formData.workplace2}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.workplace2}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* workplace 3 */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Workplace 3:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="workplace3"
                        value={formData.workplace3}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.workplace3}</p>
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
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.contactNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {isEditing ? (
              <button
                type="button"
                onClick={handleUpdate}
                className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-4 mx-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit Profile
              </button>
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
