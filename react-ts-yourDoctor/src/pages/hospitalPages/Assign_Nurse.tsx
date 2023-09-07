// page for hospital home and verify employee
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import {booking_to_assign_nurse, assign_nurse, available_nurse_to_assign} from '@/api/apiCalls';


interface Requests {
  booking_id: number;
  payment_status: string;
  total_price: number;
  patient_name: string;
  patient_mobile: string;
  date: string;
  time: string;
}

interface TestsDetails {
  testname: string;
  price: number;
}

interface Nurse {
  uname: string;
  mobile_no: string;
  email: string;
  designation: string;
}

function AssignNurse() {
  const { bookingID } = useParams();
  const [resquest, setRequests] = useState([]);
  const [test, setTest] = useState<Requests[]>([]); // Initialize the state with an empty array
  const [nurse, setNurse] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Make the HTTP GET request to the backend API
    // axios
    //   .get(`http://localhost:3000/hospital/onebooking/${bookingID}`)
    //   // api call
    //   .then((response) => {
    //     setRequests(response.data.result);
    //     setTest(response.data.result[0].tests);
    //     console.log(response.data.result);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   })
    const res = booking_to_assign_nurse(bookingID);
    if(res){
      setRequests(res.result);
      setTest(res.result[0].tests);
    }
    else {
      console.log("Error in fetching data");
    }
  }, [bookingID]);

  const handleUpdateStatus = async (emailnurse: string) => {
    const data = { nurse_email: emailnurse, booking_id: bookingID };
    console.log(data);
    try {
      // await axios
      //   .post(`http://localhost:3000/hospital/assign/nurse`, data)
      //   .then((res) => {
      //       if(res.data === "nurse is successfully assigned"){
      //           alert("Nurse Assigned Successfully");
      //           navigate(`/hospitalHome`);
      //       }
      //       else if(res.data === "Nurse is booked in this slot"){
      //           alert("Nurse is booked in this slot to another patient");
                
      //       }
      //   });
      const res = await assign_nurse(data);
      if(res === "nurse is successfully assigned"){
        alert("Nurse Assigned Successfully");
        navigate(`/hospitalHome`);
      }
      else if(res === "Nurse is booked in this slot"){
        alert("Nurse is booked in this slot to another patient");
      }

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    // available nurse
    // axios
    //   .get(`http://localhost:3000/hospital/nurse`)
    //   // api call
    //   .then((response) => {
    //     setNurse(response.data.result);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    const res = available_nurse_to_assign();
    if(res){
      setNurse(res.result);
    }
    else {
      console.log("Error in fetching data");
    }
  }, []);

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="mt-40 ml-40 mr-20 mb-20">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {/* Adjust the grid item width based on your layout */}
              <Paper elevation={3} className="p-4">
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
                        Total Price
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
                          {request.total_price}
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

      <div className="mt-20 ml-60 mr-20 mb-20">
        <h2 className="text-2xl font-bold mb-10">
          Test Details
          <hr />
        </h2>
        <Grid container spacing={3}>
          {test.map((test: TestsDetails, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1">{test.testname}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      Fee: {test.price}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          )
      )}
        </Grid>
      </div>

      <div className="mt-20 ml-60 mr-20 mb-20">
        <h2 className="text-2xl font-bold mb-10">
          Available Nurse
          <hr />
        </h2>
        <Grid container spacing={3}>
          {nurse.map((nurse: Nurse, index) => (
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
                        Assign
                      </Button>
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default AssignNurse;
