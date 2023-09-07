/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addNotification } from '@/store/notificationsSlice';
import { patient_appointment } from '@/api/apiCalls';

interface Appointment {
  time: string;
  date: string;
  uname: string;
  appointment_serial: number;
  designation: string;
  speciality: string;
  total_price: number;
  hospital_name: string;
  booking_id: number;
}

function Appointments() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [,setUpcomingCount] = useState<number>(0);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const dispatch = useDispatch();
  useEffect( () => {
    patient_appointment().then((patient_appointment_list) => {
      const currentAppointments: Appointment[] = patient_appointment_list || [];

        const storedUpcomingCount: number =
          JSON.parse(localStorage.getItem('upcomingCount')) || 0;

        const upcomingAppointmentsCount = currentAppointments.filter(
          (appointment) => appointment.date > currentDate
        ).length;

        const previousAppointments: Appointment[] =
          JSON.parse(localStorage.getItem('previousAppointments')) || [];

        if (
          currentAppointments.length > previousAppointments.length &&
          previousAppointments.length > 0 &&
          upcomingAppointmentsCount === storedUpcomingCount
        ) {
          dispatch(addNotification({ message: 'Add Review for Appointment' }));
          alert('Add Review for Appointment');
        } else if (
          currentAppointments.length > previousAppointments.length &&
          previousAppointments.length > 0
        ) {
          dispatch(addNotification({ message: 'New Appointment added!' }));
          alert('New Appointment added!');
        }

        localStorage.setItem(
          'previousAppointments',
          JSON.stringify(currentAppointments)
        );

        setUpcomingCount(upcomingAppointmentsCount);
        localStorage.setItem(
          'upcomingCount',
          JSON.stringify(upcomingAppointmentsCount)
        );
        setAppointments(patient_appointment_list);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [appointments, dispatch, currentDate]);



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
                  <p className="text-gray-600">
                    serial : {appointment.appointment_serial}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Speciality: {appointment.speciality}
                  </p>
                  <p className="text-sm text-gray-500">
                    Fee: {appointment.total_price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {appointment.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hospital : {appointment.hospital_name}
                  </p>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() =>
                      navigate('/chatbox', {
                        state: {
                          receiverName: appointment.uname,
                          bookingId: appointment.booking_id,
                          serialNumber: appointment.appointment_serial,
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
export default Appointments;
