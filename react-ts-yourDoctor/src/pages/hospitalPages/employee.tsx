/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  available_doctor_hospital,
  available_driver_hospital,
  available_nurse_hospital,
  remove_employee,
} from '@/api/apiCalls';

function AvailableEmployee() {
  const [doctor, setDoctor] = useState([]);
  const [nurse, setNurse] = useState([]);
  const [driver, setDriver] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch both doctor and nurse data from your APIs here
    const fetchDoctors = available_doctor_hospital();
    const fetchNurses = available_nurse_hospital();
    const fetchDrivers = available_driver_hospital();

    // Use Promise.all to wait for all requests to complete
    Promise.all([fetchDoctors, fetchNurses, fetchDrivers])
      .then((responses) => {
        setDoctor(responses[0].result);
        setNurse(responses[1].result);
        setDriver(responses[2].result);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  });

  const handleUpdateStatus = async (employeeEmail: string) => {
    const data = { email: employeeEmail };
    try {
      const res = remove_employee(data);
    } catch (err) {
      console.log(err);
    }
    navigate(`/hospitalHome`);
  };

  // want to sort the employees by their user_type
  return (
    <div className="mt-40 ml-40 mr-20">
      <h2 className="text-2xl font-bold mb-10">
        Available Doctor
        <hr />
      </h2>

      <div className="flex flex-col justify-center items-center">
        <Grid container spacing={3}>
          {doctor.map((doctors, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1">{doctors.uname}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      Mobile: {doctors.mobile_no}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {doctors.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Specialization : {doctors.speciality}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mt={5}
                      ml={10}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(doctors.email)}
                      >
                        Remove
                      </Button>
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <h2 className="text-2xl font-bold mb-10 mt-10">
        Available Nurse
        <hr />
      </h2>

      <div className="flex flex-col justify-center items-center">
        <Grid container spacing={3}>
          {nurse.map((nurse, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1">{nurse.uname}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      Mobile: {nurse.mobile_no}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {nurse.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Designation : {nurse.designation}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mt={5}
                      mb={2}
                      mr={6}
                      ml={10}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(nurse.email)}
                      >
                        Remove
                      </Button>
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <h2 className="text-2xl font-bold mb-10 mt-10">
        Available Driver
        <hr />
      </h2>

      <div className="flex flex-col justify-center items-center">
        <Grid container spacing={3}>
          {driver.map((driver, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1">{driver.uname}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      Mobile: {driver.mobile_no}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {driver.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ambulance Type : {driver.ambulance_type}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mt={5}
                      mb={2}
                      mr={6}
                      ml={10}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(driver.email)}
                      >
                        Remove
                      </Button>
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default AvailableEmployee;
