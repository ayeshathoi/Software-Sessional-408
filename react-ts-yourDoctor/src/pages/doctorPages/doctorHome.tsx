/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import { Toolbar, Button } from '@mui/material';
import DoctorImage from '@/assets/doctor.jpg';
import patient from '@/assets/appointment.jpg';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import PatientArray from './patient_List';
import { getDoctorDetails } from '@/api/apiCalls';

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

  const [hospitals, setHospitals] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  useEffect(() => {
    getDoctorDetails().then((res) => {
      setUser(res);
      console.log(res);
      const hospitalNames = [];
      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(res, key)) {
          if (key.includes('hospital')) {
            hospitalNames.push(res[key]);
          }
        }
      }
      setHospitals(hospitalNames);
    });
  });
  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    const selectedhospital = hospitals[newValue];
    setSelectedHospital(selectedhospital);
    setValue(newValue);

    console.log(selectedHospital);
  };

  return (
    <>
      <div>
        <HeaderDoctor />
        <div className="mt-16 bg-green-100">
          <Toolbar
            disableGutters
            className="flex items-center justify-between ml-24"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link
                to={`/AddSchedule/?hospitals=${JSON.stringify(hospitals)}`}
                className="ml-2"
              >
                <Button variant="contained" color="inherit">
                  Add Schedule
                </Button>
              </Link>
              <Link
                to={`/EditHospiatlList/?hospitals=${JSON.stringify(hospitals)}`}
                className="ml-2"
              >
                <Button variant="contained" color="inherit">
                  Edit Schedule
                </Button>
              </Link>
            </Box>
            <div className="mr-24 font-bold">
              <Button variant="contained" color="inherit">
                <PersonRemoveSharpIcon />
              </Button>
            </div>
          </Toolbar>
        </div>
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
              <PatientArray selectedHospital={hospitals[value]} />
              {/* Add content related to appointments */}
            </div>
          )}
          {value === 1 && (
            <div>
              <img
                src={patient}
                alt="Checkup"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center mb-4">
                Patient List
              </h2>
              <PatientArray selectedHospital={hospitals[value]} />
              {/* Add content related to appointments */}
            </div>
          )}
          {value === 2 && (
            <div>
              <img
                src={patient}
                alt="Checkup"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center mb-4">
                Patient List
              </h2>
              <PatientArray selectedHospital={hospitals[value]} />
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
