// page for hospital home and verify employee
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Container } from '@mui/material';
import { pending_patient_req } from '@/api/apiCalls';

interface Requests {
  booking_id: number;
  payment_status: string;
  total_price: number;
  patient_name: string;
  patient_mobile: string;
  date: string;
  time: string;
}

function PatientRequests() {
  const [resquest, setRequests] = useState([]);
  useEffect(() => {
    // Make the HTTP GET request to the backend API
    // axios
    //   .get(`http://localhost:3000/hospital/booking`)
    //   // api call
    //   .then((response) => {
    //     setRequests(response.data.result); // Set the fetched data to the state
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    pending_patient_req().then((ret) => {
    if (ret) {
      setRequests(ret.result);
    }
    else {
      console.log('error');
    }
  });
  });


  return (
    <div className="mt-40 ml-40 mr-20 mb-20">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Adjust the grid item width based on your layout */}
            <Paper elevation={3} className="p-4">
              <Typography variant="h6" gutterBottom>
                Check Up Requests
              </Typography>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Assigning Nurse
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resquest.map((request: Requests) => (
                    <tr key={request.booking_id}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Typography variant="subtitle1">
                          {request.patient_name}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                          Mobile: {request.patient_mobile}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.date.split('T')[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.time}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Link
                          to={`/hospitalHome/${request.booking_id}`}
                        >
                          <Button variant="contained" color="primary">
                            Assign Nurse
                          </Button>
                        </Link>
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
  );
}

export default PatientRequests;
