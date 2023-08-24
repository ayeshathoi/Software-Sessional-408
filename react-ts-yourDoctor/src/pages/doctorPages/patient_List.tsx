/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PatientDetails {
  time: string;
  date: string;
  uname: string;
  patient_mobile: string;
  total_price: number;
}

function PatientArray() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [patients, setpatients] = useState<PatientDetails[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };
  const { userid } = useParams();

  useEffect(() => {
    const hospitalName = 'DMC'; // Replace with the actual hospital name
    const requestBody = { hospital_name: hospitalName };

    axios
      .post(`http://localhost:3000/doctor/patientlist/${userid}`, requestBody)
      .then((response) => {
        setpatients(response.data);
      })
      .catch((error) => {
        console.error('Error posting checkup:', error);
      });
  }, [userid]);

  const currentDate = new Date().toISOString();

  const upcomingPatients = patients.filter(
    (patientsDetails) => patientsDetails.date > currentDate
  );

  const previousPatient = patients.filter(
    (patientsDetails) => patientsDetails.date <= currentDate
  );

  const PatientToShow =
    selectedSection === 'upcoming' ? upcomingPatients : previousPatient;

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
          <h2 className="text-lg font-semibold mr-4">
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Serial
          </h2>
          <ul className="space-y-4">
            {PatientToShow.map((patient, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Name: {patient.uname}</p>
                  <p className="text-gray-600">
                    mobile no. : {patient.patient_mobile}
                  </p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {patient.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {patient.time.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Price: {patient.total_price}
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
export default PatientArray;
