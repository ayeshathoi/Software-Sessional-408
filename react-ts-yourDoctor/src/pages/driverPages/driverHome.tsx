import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import Header from '../navbar/header_nd';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';
import AmbulanceImage from '@/assets/ambulance.jpg';
import Order from './patient_list_order';

function DriverHome() {
  const [user, setUser] = useState({
    ambulance_type: '',
    ambulance_fare: 0,
    street: '',
    thana: '',
    city: '',
    district: '',
    document: '',
    document_content: '',
    driver_name: '',
    driver_phone: '',
    hospital: '',
  });

  const [value, setValue] = useState<number>(0);
  const { userid } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/driver/${userid}`)
      .then((res) => {
        setUser(res.data[0]);
        user.ambulance_type = res.data[0].ambulance_type;
        user.ambulance_fare = res.data[0].ambulance_fare;
        user.street = res.data[0].street;
        user.thana = res.data[0].thana;
        user.city = res.data[0].city;
        user.district = res.data[0].district;
        user.document = res.data[0].document;
        user.document_content = res.data[0].document_content;
        user.driver_name = res.data[0].driver_name;
        user.driver_phone = res.data[0].driver_phone;
        user.hospital = res.data[0].hospital;
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
            <h2 className="text-lg font-semibold">{user.driver_name}</h2>
            <p className="text-gray-500">Driver,{user.hospital}</p>
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
              <Tab label="Ambulance Order Chatbox" />
              <div className="flex justify-center mr-5">
                <Link to="DriverProfileUpdate">
                  <Tab label="Edit Profile" />
                </Link>
              </div>
            </Tabs>
          </Paper>
        </div>
        <Box flexGrow={3} className="p-8">
          {value === 0 && (
            <div>
              <img
                src={AmbulanceImage}
                alt="ambulance"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <Order />

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

export default DriverHome;
