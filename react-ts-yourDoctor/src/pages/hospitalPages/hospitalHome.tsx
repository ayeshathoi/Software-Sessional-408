// page for hospital home and verify employee
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import AvailableEmployee from './employee';
import PatientRequests from './requests';
import ReviewsPatient from './ReviewList';
import PatientTests from './AllTest';
import AddTest from './Add_Test';

function HospitalHome() {
  const { userid } = useParams();
  const [employees, setEmployees] = useState([]); // Combine both doctors and nurses into a single array
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    // Fetch both doctor and nurse data from your APIs here
    const fetchDoctors = axios.get(
      `http://localhost:3000/hospital/pending/doctor/${userid}`
    );
    const fetchNurses = axios.get(
      `http://localhost:3000/hospital/pending/nurse/${userid}`
    );
    // Use Promise.all to wait for both requests to complete
    Promise.all([fetchDoctors, fetchNurses])
      .then((responses) => {
        const doctors = responses[0].data.result;
        const nurses = responses[1].data.result;
        console.log('here is the incoming data', nurses);
        const combinedEmployees = [...doctors, ...nurses];
        setEmployees(combinedEmployees);
        console.log('here is the incoming data', combinedEmployees);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [userid]);

  const handleUpdateStatus = async (employeeEmail: string) => {
    const data = { email: employeeEmail };
    try {
      console.log('here is the email', data, userid);
      await axios
        .post(`http://localhost:3000/hospital/update/employee/${userid}`, data)
        .then((res) => {
          console.log('here is the form', res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Sidebar */}
      <div
        className="w-1/6 border-r border-white"
        style={{ backgroundColor: '#fff' }}
      >
        <Paper elevation={0}>
          <Typography
            variant="h6"
            gutterBottom
            className="bg-green-200 p-4 h-18"
          >
            Hospital Dashboard
          </Typography>
          <List className="bg-green-100 " style={{ height: '200vh' }}>
            <ListItem button onClick={() => setValue(0)}>
              <ListItemText primary="Verify Employee" />
            </ListItem>
            <ListItem button onClick={() => setValue(1)}>
              <ListItemText primary="Available Employee" />
            </ListItem>
            <ListItem button onClick={() => setValue(2)}>
              <ListItemText primary="Requests" />
            </ListItem>
            <ListItem button onClick={() => setValue(3)}>
              <ListItemText primary="Service Reviews" />
            </ListItem>
            <ListItem button onClick={() => setValue(4)}>
              <ListItemText primary="Test List" />
            </ListItem>
            <ListItem button onClick={() => setValue(5)}>
              <ListItemText primary="Add Test" />
            </ListItem>
          </List>
        </Paper>
      </div>

      {/* Right Content */}
      <div style={{ flexGrow: 1 }}>
        <div>
          <HeaderDoctor />
        </div>
        {/* Tab content */}
        {value === 0 && (
          <div className="mt-40 ml-40 mr-20">
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  {/* Adjust the grid item width based on your layout */}
                  <Paper elevation={3} className="p-4">
                    <Typography variant="h6" gutterBottom>
                      Employee List
                    </Typography>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Employee Name
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Employee Type
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                          <tr key={employee.uid}>
                            <td className="px-6 py-4 whitespace-no-wrap">
                              <Typography variant="subtitle1">
                                {employee.speciality
                                  ? `${employee.uname} - ${employee.speciality}`
                                  : `${employee.uname} - ${employee.designation}`}
                              </Typography>

                              <Typography variant="body2" color="textSecondary">
                                Mobile: {employee.mobile_no} | Email:{' '}
                                {employee.email}
                              </Typography>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap">
                              {employee.user_type}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleUpdateStatus(employee.email)
                                }
                              >
                                Pending
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </div>
        )}
        {value === 1 && (
          <div className="mt-24 ml-20">
            <AvailableEmployee />
            {/* Add content related to ambulance */}
          </div>
        )}
        {value === 2 && (
          <div className="mt-24">
            <PatientRequests />
            {/* Add content related to health check */}
          </div>
        )}
        {value === 3 && (
          <div className="mt-24">
            <ReviewsPatient />
          </div>
        )}
        {value === 4 && (
          <div className="mt-24">
            <PatientTests />
          </div>
        )}
        {value === 5 && (
          <div className="mt-24">
            <AddTest />
          </div>
        )}

        <div>
          {' '}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HospitalHome;
