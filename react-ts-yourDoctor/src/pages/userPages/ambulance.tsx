import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Ambulances() {
  // const [selectedSection, setSelectedSection] = useState('upcoming');

  // const handleSectionChange = (section) => {
  //   setSelectedSection(section);
  // };

  const [user, setuserData] = useState({
    uname: '',
    time: '',
    ambulance_type: '',
    new_patient_fee: '',
  });

  const { userid } = useParams();

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/ambulance/4`)
      .then((response) => {
        setuserData(response.data[0]); // Set the fetched data to the state
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
    <div className="flex items-center justify-center bg-green-100 ">
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
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Driver : {user.uname}</p>
                <p className="text-gray-600">Fee: {user.new_patient_fee}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Ambulance Type: {user.ambulance_type}
                </p>
                <p className="text-sm text-gray-500">Time: {user.time}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ambulances;
