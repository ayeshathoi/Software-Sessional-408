import { useState, ChangeEvent, FormEvent } from 'react';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import DoctorImage from '@/assets/doctor.jpg';

function PatientPrescription() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);

      // Replace the following code with your backend API call using Axios or Fetch
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the backend (e.g., show success message, redirect, etc.)
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
        // Handle error response from the backend (e.g., show error message, etc.)
      }
    } catch (error) {
      console.error('Error occurred while uploading file:', error);
      // Handle any network or other errors that may occur during file upload
    }
  };

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="flex items-center justify-center bg-gray-100 h-screen">
        <div className="w-1/4 ml-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Patient Details</h2>
            <p className="text-xl font-semibold mb-2">Aksa</p>
            <p className="text-gray-600">Contact: 123-456-7890</p>
          </div>
        </div>
        <div className="w-1/2 ml-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Prescription</h2>
            <div className="mb-4">
              <img src={DoctorImage} alt="Doctor" className="w-20 h-20 rounded-full mb-2" />
              <p className="text-xl font-semibold mb-2">Dr. Afsana</p>
              <p className="text-gray-600">Specialist: Cardiology</p>
              <p className="text-gray-600">Contact: 987-654-3210</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-3">Upload Prescription PDF</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default PatientPrescription;
