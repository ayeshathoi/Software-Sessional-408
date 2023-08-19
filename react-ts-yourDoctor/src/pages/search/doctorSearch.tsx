/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

interface Doctor {
  uname: string;
  mobile_no: string;
  email: string;
  speciality: string;
  designation: string;
  new_patient_fee: number;
  hospital_name: string;
  doctor_id: number;
}

function DoctorSearch() {
  const [user, setuserData] = useState<Doctor[]>([]);

  const { userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/doctorall`)
      // api call
      .then((response) => {
        setuserData(response.data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userid]);

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="text-above-line my-10 text-left p-20 ">
        <p className="text-gray-400">Search</p>
        <hr className="line-below-text my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center">
          <div className="text-gray-400 p-2">Sort By </div>
          <select name="sort" id="sort">
            <option value="Price Low to High">Visit Low to High</option>
            <option value="Price High to Low">Visit High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div
            className="side-nav bg-indigo-200 p-4 w-60 rounded-lg border-2 border-gray-300"
            style={{ height: 'fit-content' }}
          >
            <div className="side-nav-item">
              <h2 className="text-center text-xl font-semibold mb-4">FILTER</h2>
              <hr className="line-below-text border-gray-400 my-4" />
            </div>
            <div className="side-nav-item">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600 mr-2"
                />
                Qualification
                <select
                  name="qualification"
                  id="qualification"
                  className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded-md"
                >
                  <option value="MBBS">MBBS</option>
                  <option value="MD">MD</option>
                  <option value="MS">MS</option>
                  <option value="MCH">MCH</option>
                  <option value="DM">DM</option>
                </select>
              </label>
              <label className="flex items-center text-sm mt-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600 mr-2"
                />
                Popularity
              </label>
            </div>
          </div>

          <div className="flex ml-4">
            <Grid container spacing={3}>
              {user.map((doctor, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="Doctor"
                      height="200"
                      image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                    />
                    <CardContent>
                      <Typography variant="h6">{doctor.uname}</Typography>
                      <Typography variant="body2">
                        Speciality: {doctor.speciality}
                      </Typography>
                      <Typography variant="body2">
                        Designation: {doctor.designation}
                      </Typography>
                      <Typography variant="body2">
                        New Patient Fee: {doctor.new_patient_fee}
                      </Typography>
                      <Typography variant="body2">
                        Hospital: {doctor.hospital_name}
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate('/BookDoctor', {
                            state: {
                              doctorName: doctor.uname,
                              doctorId: doctor.doctor_id,
                              newPatientFee: doctor.new_patient_fee,
                              hospitalName: doctor.hospital_name,
                              userId: userid,
                            },
                          })
                        }
                      >
                        Book
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="text-gray-400 p-2">100 results found</div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default DoctorSearch;
