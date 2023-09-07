/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { patient_checkup } from '@/api/apiCalls';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/notificationsSlice';

interface Checkup {
  time: string;
  date: string;
  testname: string;
  price: number;
  uname: string;
  booking_id: number;
  nurse_name: string;
}

function Tests() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [tests, setTests] = useState<Checkup[]>([]);
  const navigate = useNavigate();

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const dispatch = useDispatch();

  const [, setPreviousCount3] = useState<number>(0);
  const currentDate = new Date().toISOString();

  useEffect(() => {
    patient_checkup().then((patient_checkup_list) => {
      const currentTests: Checkup[] = patient_checkup_list || [];

      const storedPreviousCount3: number =
        JSON.parse(localStorage.getItem('previousCount3')) || 0;

      const previousTestsCount = tests.filter(
        (test) => test.date <= currentDate
      ).length;

      const previousTests: Checkup[] =
        JSON.parse(localStorage.getItem('previousTests')) || [];

      console.log('Previous Tests:', previousTests.length);
      console.log('Stored Previous Count:', storedPreviousCount3);
      console.log('Previous Tests:', previousTests.length);

      if (
        previousTestsCount > storedPreviousCount3 &&
        storedPreviousCount3 > 0
      ) {
        console.log('Previous Test Count:', previousTestsCount);
        console.log('Stored Previous Count:', storedPreviousCount3);
        dispatch(addNotification({ message: 'Add Review for Test' }));
        alert('Add Review for Test');
      } else if (
        currentTests.length > previousTests.length &&
        previousTests.length > 0
      ) {
        console.log('Previous Test:', previousTests.length);
        console.log('Current Test:', currentTests.length);

        dispatch(
          addNotification({
            message: 'New Test added!',
          })
        );
        alert('New Test added!');
      }

      localStorage.setItem('previousTests', JSON.stringify(currentTests));
      setPreviousCount3(previousTestsCount);
      localStorage.setItem(
        'previousCount3',
        JSON.stringify(previousTestsCount)
      );

      setTests(patient_checkup_list);
    })
    .catch((error) => {
      console.error('Error fetching Tests:', error);
    });
}, [tests, dispatch, currentDate]);


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
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() =>
                      navigate('/Chatbox', {
                        state: {
                          receiverName: test.uname,
                          bookingId: test.booking_id,
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
export default Tests;
