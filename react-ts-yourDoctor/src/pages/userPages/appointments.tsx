import { useState } from 'react';
import Header from '../navbar/header_user';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';

function Appointments() {
  const [selectedSection, setSelectedSection] = useState('upcoming');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const doctorData = [
    {
      name: 'Dr Anila',
      specialist: 'Cardiologist',
      date: '2023-08-01',
      time: '10:00 AM',
    },
    {
      name: 'Dr. Afroza Parvin',
      specialist: 'Neurologist',
      date: '2023-08-21',
      time: '11:00 AM',
    },

    // more doctor data...
  ];

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const upcomingDoctors = doctorData.filter((doctor) => {
    return selectedSection === 'upcoming' && doctor.date > currentDate;
  });

  const previousDoctors = doctorData.filter((doctor) => {
    return selectedSection === 'previous' && doctor.date <= currentDate;
  });

  const doctorsToShow =
    selectedSection === 'upcoming' ? upcomingDoctors : previousDoctors;

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex items-center justify-center bg-gray-100 h-screen">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img src={User} alt="User" className="w-32 h-32 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Ayesha</h1>
          <p className="text-lg text-gray-600 mb-4">User</p>
          <p className="text-lg text-gray-600 mb-4">017XX-XXXXXX</p>
        </div>
        <div className="w-1/2 ml-8">
          <div className="flex justify-between items-center mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'previous'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('previous')}
            >
              Previous
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">
              {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Doctors
            </h2>
            <ul className="space-y-4">
              {doctorsToShow.map((doctor, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{doctor.name}</p>
                    <p className="text-gray-600">{doctor.specialist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{doctor.date}</p>
                    <p className="text-sm text-gray-500">{doctor.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Appointments;
