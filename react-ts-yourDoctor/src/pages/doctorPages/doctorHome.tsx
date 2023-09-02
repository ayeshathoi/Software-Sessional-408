/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { Button, Toolbar } from '@mui/material';
import DoctorImage from '@/assets/doctor.jpg';
import patient from '@/assets/appointment.jpg';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import PatientArray from './patient_List';

function DoctorHome() {
  const [user, setUser] = useState({
    doctor_id: '',
    designation: '',
    speciality: '',
    qualification: '',
    employee_status: '',
    zoom_link: '',
    old_patient_fee: 0,
    new_patient_fee: 0,
    uname: '',
    user_type: '',
    email: '',
    mobile_no: '',
  });

  const [value, setValue] = useState<number>(0);
  const { userid } = useParams();
  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const [hospitals, setHospitals] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor/details/${userid}`)
      .then((res) => {
        setUser(res.data);

        const hospitalNames = [];
        for (const key in res.data) {
          if (Object.prototype.hasOwnProperty.call(res.data, key)) {
            if (key.includes('hospital')) {
              hospitalNames.push(res.data[key]);
            }
          }
        }
        setHospitals(hospitalNames);
      })
      .catch((error) => {
        console.error('userprofile not found', error);
      });
  }, [userid]);

  const navigateToAddSchedule = () => {
    const hospitalsParam = encodeURIComponent(JSON.stringify(hospitals));
    navigate(`/AddSchedule/${userid}?hospitals=${hospitalsParam}`);
  };

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="mt-16 bg-green-100">
        <Toolbar
          disableGutters
          className="flex items-center justify-between ml-24"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={navigateToAddSchedule}
            >
              Add Schedule
            </Button>
          </Box>
        </Toolbar>
      </div>

      <div className="flex mt-40 ml-24">
        <div className="w-1/4 p-4 bg-green-100 border-r border-gray-300">
          {/* User information */}
          <div className="text-center mb-10">
            <img
              src={DoctorImage}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Dr. {user.uname}</h2>
            <p className="text-gray-500">
              {user.designation},{user.speciality}
            </p>
            <p className="text-gray-500">{user.qualification}</p>
            <p className="text-gray-500">Contact no. {user.mobile_no}</p>
            <p className="text-gray-500">mail : {user.email}</p>
          </div>
          <Paper elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Vertical tabs example"
            >
              {hospitals.map((hospital, index) => (
                <Tab key={index} label={hospital} />
              ))}
              <div className="flex justify-center mr-5">
                <Link to="DoctorProfileUpdate">
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
                src={patient}
                alt="Checkup"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center mb-4">
                Patient List
              </h2>
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

export default DoctorHome;
