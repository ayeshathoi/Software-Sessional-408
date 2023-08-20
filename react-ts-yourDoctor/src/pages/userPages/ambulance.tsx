/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Ambulance {
  time: string;
  date: string;
  uname: string;
  ambulance_type: string;
  total_price: number;
  hospital_id: number;
  hospital: string;
  street: string;
  city: string;
  thana: string;
  district: string;
}

function Ambulances() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };
  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patient/ambulance/${userid}`)
      .then((response) => {
        setAmbulances(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Ambulances:', error);
      });
  }, [userid]);

  const currentDate = new Date().toISOString();

  const upcomingAmbulances = ambulances.filter(
    (ambulance) => ambulance.date > currentDate
  );

  const previousAmbulances = ambulances.filter(
    (ambulance) => ambulance.date <= currentDate
  );

  const AmbulancesToShow =
    selectedSection === 'upcoming' ? upcomingAmbulances : previousAmbulances;

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
            Ambulances
          </h2>
          <ul className="space-y-4">
            {AmbulancesToShow.map((ambulance, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Name: {ambulance.uname}
                  </p>
                  <p className="text-gray-600">
                    Ambulance Type : {ambulance.ambulance_type}
                  </p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {ambulance.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Fee: {ambulance.total_price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {ambulance.time.split('T')[0]}
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
export default Ambulances;
