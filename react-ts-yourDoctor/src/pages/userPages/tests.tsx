/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Button, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { patient_checkup } from '@/api/apiCalls';
import { addNotification } from '@/store/notificationsSlice';
import { all } from 'axios';
import { set } from 'date-fns';

interface Checkup {
  time: string;
  date: string;
  testnames: string;
  total_price: number;
  uname: string;
  booking_id: number;
  nurse_name: string;
  mobile_no: string;
}

function Tests() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [tests, setTests] = useState<Checkup[]>([]);
  
  const navigate = useNavigate();

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const dispatch = useDispatch();

  const [, setUpcomingCount3] = useState<number>(0);
  const currentDate = new Date().toISOString();

  useEffect(() => {
    patient_checkup()
      .then((patient_checkup_list) => {    
        //sort
        const sort = patient_checkup_list.sort(
          (a: Checkup, b: Checkup) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        const currentTests: Checkup[] = patient_checkup_list || [];

        const storedUppcomingCount3: number =
          JSON.parse(localStorage.getItem('upcomingCount3')) || 0;

        const upcomingTestsCount = tests.filter(
          (test) => test.date > currentDate
        ).length;

        const previousTests: Checkup[] =
          JSON.parse(localStorage.getItem('previousTests')) || [];

        if (
          currentTests.length > previousTests.length &&
          previousTests.length > 0 &&
          upcomingTestsCount === storedUppcomingCount3
        ) {
          dispatch(addNotification({ message: 'Add Review for Test' }));
          alert('Add Review for Test');
        } else if (
          currentTests.length > previousTests.length &&
          previousTests.length > 0 &&
          upcomingTestsCount > storedUppcomingCount3
        ) {
          dispatch(
            addNotification({
              message: 'New Test added!',
            })
          );
          alert('New Test added!');
        }

        localStorage.setItem('previousTests', JSON.stringify(currentTests));
        setUpcomingCount3(upcomingTestsCount);
        localStorage.setItem(
          'upcomingCount3',
          JSON.stringify(upcomingTestsCount)
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
          <ul className="space-y-4">
            {AmbulancesToShow.map((test, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Name: {test.uname}
                  </p>
                  <p className="text-sm">
                    Mobile No : {test.mobile_no}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tests : {test.testnames}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {test.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">Fee: {test.total_price}</p>
                  <p className="text-sm text-gray-500">
                    Time: {test.time.split('T')[0]}
                  </p>
                  <Tooltip title="Chat">
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
                      <ForumTwoToneIcon />
                    </Button>
                  </Tooltip>
                  {selectedSection === 'previous' && (
                    <Tooltip title="Add Review">
                      <Button
                        variant="contained"
                        color="inherit"
                        className="ml-2"
                        onClick={() =>
                          navigate('/addReview', {
                            state: {
                              receiverName: test.uname,
                              bookingId: test.booking_id,
                            },
                          })
                        }
                      >
                        <RateReviewOutlinedIcon />
                      </Button>
                    </Tooltip>
                  )}
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
