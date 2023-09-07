import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Header from '../navbar/header_nd';
import Footer from '../navbar/footer';
import User from '@/assets/user.webp';
import PatientArray from './patient_list';
import HealthCheckImage from '@/assets/healthcheckhome.jpg';

function NurseHome() {
  const [user, setUser] = useState({
    uname: '',
    email: '',
    user_type: '',
    designation: '',
    hospital: '',
    mobile_no: '',
  });

  const [value, setValue] = useState<number>(0);
  const { userid } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/nurse/${userid}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
        user.uname = res.data[0].uname;
        user.email = res.data[0].email;
        user.user_type = res.data[0].user_type;
        user.designation = res.data[0].designation;
        user.hospital = res.data[0].hospital;
        user.mobile_no = res.data[0].mobile_no;
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
            <h2 className="text-lg font-semibold">{user.uname}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p>
              {user.designation},{user.hospital}
            </p>
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
              <Tab label="Health Checkup Chatbox" />
              <div className="flex justify-center mr-5">
                <Link to="NurseProfileUpdate">
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
                src={HealthCheckImage}
                alt="Checkup"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Checkup</h2>
              <PatientArray />
              {/* Add content related to appointments */}
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

export default NurseHome;
