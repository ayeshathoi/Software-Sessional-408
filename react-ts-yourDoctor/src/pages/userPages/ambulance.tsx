/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { patient_ambulance } from '@/api/apiCalls';
import { addNotification } from '@/store/notificationsSlice';

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
  booking_id: number;
}

function Ambulances() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [, setUpcomingCount2] = useState(0);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const dispatch = useDispatch();
  const currentDate = new Date().toISOString();
  const navigate = useNavigate();

  useEffect(() => {
    patient_ambulance()
      .then((patient_ambulance_list) => {
        if (patient_ambulance_list) {
          // sort
          const sort = patient_ambulance_list.sort(
            (a: Ambulance, b: Ambulance) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          const currentAmbulances: Ambulance[] = patient_ambulance_list || [];

          // console.log(patient_ambulance_list);

          const storedUpcomingCount2: number =
            JSON.parse(localStorage.getItem('upcomingCount2')) || 0;

          const upcomingAmbulanceCount = ambulances.filter(
            (ambulance) => ambulance.date > currentDate
          ).length;

          const previousAmbulances: Ambulance[] =
            JSON.parse(localStorage.getItem('previousAmbulances')) || [];

          if (
            currentAmbulances.length > previousAmbulances.length &&
            previousAmbulances.length > 0 &&
            upcomingAmbulanceCount === storedUpcomingCount2
          ) {
            dispatch(addNotification({ message: 'Add Review for Ambulance' }));
            alert('Add Review for Ambulance');
          } else if (
            currentAmbulances.length > previousAmbulances.length &&
            previousAmbulances.length > 0 &&
            upcomingAmbulanceCount > storedUpcomingCount2
          ) {
            dispatch(addNotification({ message: 'New ambulance added!' }));
            alert('New ambulance added!');
          }

          localStorage.setItem(
            'previousAmbulances',
            JSON.stringify(currentAmbulances)
          );

          setUpcomingCount2(upcomingAmbulanceCount);
          localStorage.setItem(
            'upcomingCount2',
            JSON.stringify(upcomingAmbulanceCount)
          );
          setAmbulances(currentAmbulances);
        } else {
          dispatch(addNotification({ message: 'No Ambulance Found' }));
          alert('No Ambulance Found');
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(addNotification({ message: 'No Ambulance Found' }));
        alert('No Ambulance Found');
      });
  }, [dispatch, ambulances, currentDate]);

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
                  <Tooltip title="Chat">
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() =>
                        navigate('/Chatbox', {
                          state: {
                            receiverName: ambulance.uname,
                            bookingId: ambulance.booking_id,
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
                              receiverName: ambulance.uname,
                              bookingId: ambulance.booking_id,
                              serialNumber: ambulance.time.split('T')[0],
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
export default Ambulances;
