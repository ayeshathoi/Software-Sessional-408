import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import Header from '../navbar/header_user';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';
import AppointmentImage from '@/assets/appointment.jpg';
import AmbulanceImage from '@/assets/ambulance.jpg';
import HealthCheckImage from '@/assets/healthcheckhome.jpg';
import Ambulances from './ambulance';
import Appointments from './appointments';
import Tests from './tests';

function UserHome() {
  const [user, setUser] = useState({
    uname: '',
    email: '',
  });

  const [value, setValue] = useState<number>(0);
  const { userid } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/frontend/${userid}`)
      .then((res) => {
        setUser(res.data[0]);
        user.uname = res.data[0].uname;
        user.email = res.data[0].email;
      })
      .catch((error) => {
        console.error('userprofile not found', error);
      });
  }, [user, userid]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex mt-40 ml-24">
        <div className="w-1/4 p-4 bg-green-100 border-r border-gray-300">
          {/* User information */}
          <div className="text-center mb-10">
            <img
              src={User}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Name:{user.uname}</h2>
            <p className="text-gray-500">Email:{user.email}</p>
            <p>User</p>
          </div>

          {/* Tabs */}
          <Paper elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="vertical tabs example"
              className="bg-white rounded-lg shadow"
            >
              <Tab label="Appointments" />
              <Tab label="Ambulance" />
              <Tab label="Health Check" />
              <div className="flex justify-center mr-10">
                <Link to="PatientProfileUpdate">
                  <Tab label="Edit Profile" />
                </Link>
              </div>
            </Tabs>
          </Paper>
        </div>
        <Box flexGrow={3} className="p-8">
          {/* Tab content */}
          {value === 0 && (
            <div>
              <img
                src={AppointmentImage}
                alt="Appointments"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <Appointments />
              {/* Add content related to appointments */}
            </div>
          )}
          {value === 1 && (
            <div>
              <img
                src={AmbulanceImage}
                alt="Ambulance"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Ambulance Order</h2>
              {/* Add content related to ambulance */}
              <Ambulances />
            </div>
          )}
          {value === 2 && (
            <div>
              <img
                src={HealthCheckImage}
                alt="Health Check"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Health Check</h2>
              <Tests />
              {/* Add content related to health check */}
            </div>
          )}
        </Box>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
