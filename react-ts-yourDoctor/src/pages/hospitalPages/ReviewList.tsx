// page for hospital home and verify employee
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Container } from '@mui/material';
import axios from 'axios';

interface Reviews {
  booking_id: number;
  date: string;
  time: string;
  rating: string;
  complaint_text: string;
  type: string;
  appointment_serial: string;
  patient_name: string;
  service_provider: string;
}

function ReviewsPatient() {
  const { userid } = useParams();
  const [reviews, setRevies] = useState([]);
  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/review/${userid}`)
      // api call
      .then((response) => {
        setRevies(response.data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userid]);

  return (
    <div className="mt-24">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Adjust the grid item width based on your layout */}
            <Paper elevation={3} className="p-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Service Provider
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Complaint
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((request: Reviews) => (
                    <tr key={request.booking_id}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Typography variant="subtitle1">
                          {request.patient_name}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="body2" color="textSecondary">
                          {request.type}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.service_provider}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.date.split('T')[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.time}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.rating} Add Stars Here
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {request.complaint_text}
                      </td>
                      <hr />
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

export default ReviewsPatient;
