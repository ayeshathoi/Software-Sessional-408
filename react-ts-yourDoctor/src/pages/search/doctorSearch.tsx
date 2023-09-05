/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

interface Doctor {
  uname: string;
  mobile_no: string;
  email: string;
  qualification: string;
  speciality: string;
  designation: string;
  new_patient_fee: number;
  hospital_name: string;
  doctor_id: number;
}

function DoctorSearch() {
  const [user, setuserData] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userid } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(''); // State to store sorting option
  const [selectedQualification, setSelectedQualification] =
    useState<string>('');

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/doctorall`)
      .then((response) => {
        setuserData(response.data); // Set the fetched data to the state
        setCount(response.data.length);
        console.log(response.data);

        // Sort the data based on the selected sorting option
        if (sortBy === 'Price Low to High') {
          const sortedData = [...response.data];
          sortedData.sort((a, b) => a.new_patient_fee - b.new_patient_fee);
          setuserData(sortedData);
        } else if (sortBy === 'Price High to Low') {
          const sortedData = [...response.data];
          sortedData.sort((a, b) => b.new_patient_fee - a.new_patient_fee);
          setuserData(sortedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userid, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getUniqueSpecialties = () => {
    // Create a Set to store unique specialties
    const uniqueSpecialtiesSet = new Set();

    // Iterate through user data and add specialties to the Set
    user.forEach((doctor) => {
      if (!uniqueSpecialtiesSet.has(doctor.speciality)) {
        uniqueSpecialtiesSet.add(doctor.speciality);
      }
    });

    // Convert the Set back to an array
    const uniqueSpecialtiesArray = Array.from(uniqueSpecialtiesSet);

    return uniqueSpecialtiesArray;
  };

  const filteredDoctors = user.filter(
    (doctor) =>
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedQualification === '' ||
        doctor.qualification === selectedQualification)
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="text-above-line my-10 text-left p-20 ">
        <Autocomplete
          options={getUniqueSpecialties()} // Get unique specialties from user data
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type the Speciality"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
        />
        <hr className="line-below-text my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center">
          <div className="text-gray-400 p-2">Sort By </div>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Select</option>
            <option value="Price Low to High">Visit Low to High</option>
            <option value="Price High to Low">Visit High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div
            className="side-nav bg-green-200 p-4 w-60 rounded-lg border-2 border-gray-300"
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
                  onChange={(e) => setSelectedQualification(e.target.value)}
                />
                Qualification
                <select
                  name="qualification"
                  id="qualification"
                  className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded-md"
                  value={selectedQualification} // Add this line
                  onChange={(e) => setSelectedQualification(e.target.value)} // Add this line
                >
                  <option value="">Select</option>
                  <option value="MBBS">MBBS</option>
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
              {filteredDoctors.map((doctor, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="Doctor"
                      height="100"
                      image="https://cdn.vectorstock.com/i/1000x1000/27/71/female-doctor-vector-38002771.webp"
                    />
                    <CardContent>
                      <Typography variant="h6">{doctor.uname}</Typography>
                      <Typography variant="body2">
                        Speciality: {doctor.speciality}
                      </Typography>
                      <Typography variant="body2">
                        Qualification: {doctor.qualification}
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
                        color="inherit"
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
        <div className="text-gray-400 p-2"> {count} results found</div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default DoctorSearch;
