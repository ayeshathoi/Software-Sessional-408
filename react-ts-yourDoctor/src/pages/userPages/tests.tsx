import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../navbar/header_user';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';

function Tests() {
  // const [selectedSection, setSelectedSection] = useState('upcoming');

  // const handleSectionChange = (section) => {
  //   setSelectedSection(section);
  // };

  const [user, setuserData] = useState({
    uname: '',
    time: '',
    testname: '',
    price: '',
  });

  const { userid } = useParams();

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/checkup/4`)
      .then((response) => {
        console.log('here entered');
        setuserData(response.data.data); // Set the fetched data to the state
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userid]);

  // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // const upcomingDoctors = doctorData.filter((doctor) => {
  //   return selectedSection === 'upcoming' && doctor.date > currentDate;
  // });

  // const previousDoctors = doctorData.filter((doctor) => {
  //   return selectedSection === 'previous' && doctor.date <= currentDate;
  // });

  // const doctorsToShow =
  //   selectedSection === 'upcoming' ? upcomingDoctors : previousDoctors;

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
          {/* <div className="flex justify-between items-center mb-4">
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
          </div> */}
          {/* <div className="bg-white p-4 rounded-lg shadow-md">
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
          </div> */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Doctor List</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Name: {user.uname}</p>
                  <p className="text-gray-600">Time: {user.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Ambulance Type: {user.testname}
                  </p>
                  <p className="text-sm text-gray-500">Fee: {user.price}</p>
                </div>
              </li>
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

export default Tests;
