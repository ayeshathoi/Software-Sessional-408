import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

function AvailableEmployee() {
  const { userid } = useParams();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch both doctor and nurse data from your APIs here
    const fetchDoctors = axios.get(
      `http://localhost:3000/hospital/doctor/${userid}`
    );
    const fetchNurses = axios.get(
      `http://localhost:3000/hospital/nurse/${userid}`
    );
    const fetchDrivers = axios.get(
      `http://localhost:3000/hospital/driver/${userid}`
    );

    // Use Promise.all to wait for all requests to complete
    Promise.all([fetchDoctors, fetchNurses, fetchDrivers])
      .then((responses) => {
        const doctors = responses[0].data.result;
        const nurses = responses[1].data.result;
        const drivers = responses[2].data.result;
        const combinedEmployees = [...doctors, ...nurses, ...drivers];
        setEmployees(combinedEmployees);
        console.log('here is the incoming data', combinedEmployees);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [userid]);

  return (
    <div className="mt-40 ml-40 mr-20">
      <h2 className="text-center text-4xl font-bold mb-10">
        Available Employees
        <hr />
      </h2>

      <div className="flex flex-col justify-center items-center">
        <Grid container spacing={3}>
          {employees.map((employee, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      {employee.user_type === 'doctor'
                        ? `${employee.uname} - ${employee.speciality}`
                        : employee.user_type === 'nurse'
                        ? `${employee.uname} - ${employee.designation}`
                        : `${employee.uname} - ${employee.ambulance_type} Ambulance `}
                    </Typography>
                    {/* {employee.speciality
                        ? `${employee.uname} - ${employee.speciality}`
                        : `${employee.uname} - ${employee.designation}`} */}

                    <Typography variant="body2" color="textSecondary">
                      Mobile: {employee.mobile_no}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {employee.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      User Type: {employee.user_type}
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
