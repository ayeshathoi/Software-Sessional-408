import React, { useState } from 'react';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function PatientProfileUpdate() {
  const initialData = {
    street: 'Zahir Raihan Road',
    thana: 'Chawkbazar',
    district: 'Dhaka',
    contactNumber: '01123-345567',
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
      <div>
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center bg-lightpink">
        <div className="w-96 p-6 mt-20 rounded-lg bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-4">Update User Profile</h1>
          <form>
            {/* Street */}
            <div className="mb-4">
              <div className="flex">
                <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                  <label className="font-semibold">Street:</label>
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
            {/* contact no */}
            <div className="mb-4">
              <div className="flex">
                <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                  <label className="font-semibold">Contact Number:</label>
                </div>
                <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                  {isEditing ? (
                    <input
                      type="text"
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
              onClick={handleUpdate}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default PatientProfileUpdate;
