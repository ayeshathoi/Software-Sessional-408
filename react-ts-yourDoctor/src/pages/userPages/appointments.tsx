/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Appointments() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patient/appointment/inperson/2`)
      .then((response) => {
        setAppointments(response.data); // Set the fetched appointments to the state
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [userid]);

  const currentDate = new Date().toISOString();

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.date > currentDate
  );

  const previousAppointments = appointments.filter(
    (appointment) => appointment.date <= currentDate
  );

  const appointmentsToShow =
    selectedSection === 'upcoming'
      ? upcomingAppointments
      : previousAppointments;

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 ml-8">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              selectedSection === 'upcoming'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600'
            } hover:bg-green-600 hover:text-white`}
            onClick={() => handleSectionChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              selectedSection === 'previous'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600'
            } hover:bg-green-600 hover:text-white`}
            onClick={() => handleSectionChange('previous')}
          >
            Previous
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'}{' '}
            Appointments
          </h2>
          <ul className="space-y-4">
            {appointmentsToShow.map((appointment, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Name: {appointment.uname}
                  </p>
                  <p className="text-gray-600">
                    Designation: {appointment.designation}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Speciality: {appointment.speciality}
                  </p>
                  <p className="text-sm text-gray-500">
                    Fee: {appointment.new_patient_fee}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Appointments;
