/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import HeaderCommon from '../navbar/headerCommon';
import Footer from '../navbar/footer';
import Driver from '@/assets/driver.jpg';

function DriverProfileUpdate() {
  const initialData = {
    workplace: 'City Hospital',
    designation: 'Nurse',
    contactNumber: '123-456-7890',
  };

  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleUpdate = () => {
    // Replace this with your update logic to send formData and pdfFile to the server
    console.log('Updated Data:', formData);
    console.log('Uploaded PDF:', pdfFile);
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-lightpink py-6">
        <HeaderCommon />
      </div>
      <div className="flex">
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={Driver} alt="Driver" className="h-40 w-full object-cover" />
          <h2 className="text-xl font-semibold mb-2">XYZ</h2>
          <p className="text-gray-600">Driver</p>
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Drive Profile</h1>
            <form>
              {/* Workplace */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Workplace:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="workplace"
                        value={formData.workplace}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.workplace}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Number */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Contact Number:</label>
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
              {/* Upload PDF */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Upload PDF:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>Uploaded PDF Filename</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
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

export default DriverProfileUpdate;
