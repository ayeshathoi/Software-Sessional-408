/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Checkup {
  time: string;
  date: string;
  testname: string;
  price: number;
  uname: string;
}

function Tests() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [tests, setTests] = useState<Checkup[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };
  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patient/checkup/${userid}`)
      .then((response) => {
        setTests(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Tests:', error);
      });
  }, [userid]);

  const currentDate = new Date().toISOString();

  const upcomingTests = tests.filter(
    (ambulance) => ambulance.date > currentDate
  );

  const previousAmbulances = tests.filter(
    (ambulance) => ambulance.date <= currentDate
  );

  const AmbulancesToShow =
    selectedSection === 'upcoming' ? upcomingTests : previousAmbulances;

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
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Tests
          </h2>
          <ul className="space-y-4">
            {AmbulancesToShow.map((test, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Name: {test.uname}</p>
                  <p className="text-gray-600">TEST NAME: {test.testname}</p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {test.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">Fee: {test.price}</p>
                  <p className="text-sm text-gray-500">
                    Time: {test.time.split('T')[0]}
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
export default Tests;
