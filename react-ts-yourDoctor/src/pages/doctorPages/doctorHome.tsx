import { useState } from 'react';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import DoctorImage from '@/assets/doctor.jpg';

function DoctorHome() {
  const [selectedSection, setSelectedSection] = useState('upcoming');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const patientData = [
    { name: 'Aksa', contact: '123-456-7890', date: '2023-08-01', time: '10:00 AM', prescriptionLink: '#' },
    { name: 'Zinia', contact: '997-555-3210', date: '2023-08-02', time: '02:30 PM', prescriptionLink: '#' },
    { name: 'Ramisa', contact: '123-456-7777', date: '2023-08-21', time: '11:00 AM', prescriptionLink: '#' },
    { name: 'Badhon', contact: '987-654-3210', date: '2023-08-30', time: '05:00 PM', prescriptionLink: '#' },
    // more patient data...
  ];

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const upcomingPatients = patientData.filter(patient => {
    return selectedSection === 'upcoming' && patient.date > currentDate;
  });

  const previousPatients = patientData.filter(patient => {
    return selectedSection === 'previous' && patient.date <= currentDate;
  });

  const patientsToShow = selectedSection === 'upcoming' ? upcomingPatients : previousPatients;

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="flex items-center justify-center bg-gray-100 h-screen">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img src={DoctorImage} alt="Doctor" className="w-32 h-32 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Dr. Afsana</h1>
          <p className="text-lg text-gray-600 mb-4">Specialist: Cardiology</p>
          <a href="#" className="text-blue-600 hover:underline">Zoom Link</a>
        </div>
        <div className="w-1/4 ml-8">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-3">Today's Schedule</h2>
            <ul className="space-y-2">
              <li className={`cursor-pointer ${selectedSection === 'workplace1' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => handleSectionChange('workplace1')}>Workplace 1</li>
              <li className={`cursor-pointer ${selectedSection === 'workplace2' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => handleSectionChange('workplace2')}>Workplace 2</li>
              <li className={`cursor-pointer ${selectedSection === 'workplace3' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => handleSectionChange('workplace3')}>Workplace 3</li>
              <li className={`cursor-pointer ${selectedSection === 'onlineMeeting' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => handleSectionChange('onlineMeeting')}>Online Meeting</li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 ml-8">
          <div className="flex justify-between items-center mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${selectedSection === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${selectedSection === 'previous' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('previous')}
            >
              Previous
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">{selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Patients</h2>
            <ul className="space-y-4">
              {patientsToShow.map((patient, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{patient.name}</p>
                    <p className="text-gray-600">{patient.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{patient.date}</p>
                    <p className="text-sm text-gray-500">{patient.time}</p>
                    <a href={patient.prescriptionLink} className="text-blue-600 hover:underline">Prescription</a>
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

export default DoctorHome;
