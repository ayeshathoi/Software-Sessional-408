/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import { useNavigate } from 'react-router-dom';
import { driver_patient_list } from '@/api/apiCalls';

interface Ambulance {
  time: string;
  date: string;
  uname: string;
  mobile_no: string;
  booking_id: number;
}

function Order() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/driver/order`)
    //   .then((response) => {
    //     setAmbulances(response.data.result);
    //     // console.log(response.data);
    //   })
    driver_patient_list().then((res) => {
      if (res) {
        // sort
        const sort = res.result.sort(
          (a: Ambulance, b: Ambulance) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const currentData: Ambulance[] = res.result || [];
        const previousPatientListDriver: Ambulance[] = JSON.parse(
          localStorage.getItem('previousPatientListDriver') || '[]'
        );
        if (currentData.length > previousPatientListDriver.length) {
          alert('New Patient Added For Ambulance!');
        }
        localStorage.setItem(
          'previousPatientListDriver',
          JSON.stringify(currentData)
        );
        setAmbulances(res.result);
      } else {
        console.log('error');
      }
    });
  });

  const currentDate = new Date().toISOString();

  const upcomingAmbulances = ambulances.filter(
    (ambulance) => ambulance.date > currentDate
  );
  console.log(upcomingAmbulances);

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
            Call if you want to contact
          </h2>
          <ul className="space-y-4">
            {AmbulancesToShow.map((ambulance, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Name: {ambulance.uname}
                  </p>
                  <p className="text-gray-600">
                    mobile : {ambulance.mobile_no}
                  </p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {ambulance.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {ambulance.time}
                  </p>
                  <p>{ambulance.booking_id}</p>
                  {/* <Tooltip title="Chat">
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
                  </Tooltip> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Order;
