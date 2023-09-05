/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

interface Checkup {
  time: string;
  date: string;
  uname: string;
  mobile_no: string;
}

function PatientArray() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [tests, setTests] = useState<Checkup[]>([]);
  const navigate = useNavigate();

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };
  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/nurse/${userid}/checkup`)
      .then((response) => {
        setTests(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Patient_list:', error);
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
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'}{' '}
            Checkup Duty
          </h2>
          <ul className="space-y-4">
            {AmbulancesToShow.map((test, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Name: {test.uname}</p>
                  <p className="text-gray-600">mobile no. : {test.mobile_no}</p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {test.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {test.time.split('T')[0]}
                  </p>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() =>
                      navigate('/Chatbox', {
                        state: {
                          receiverName: test.uname,
                          bookingId: test.booking_id,
                          userId: userid,
                        },
                      })
                    }
                  >
                    Chat
                  </Button>
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
