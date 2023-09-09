/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { doctorSearch } from '@/api/apiCalls';
import Header from '../navbar/header_nd';
import Footer from '../navbar/footer';

interface Doctor {
  uname: string;
  mobile_no: string;
  email: string;
  qualification: string;
  speciality: string;
  designation: string;
  old_patient_fee: number;
  new_patient_fee: number;
  hospital_name: string;
  doctor_id: number;
  weekday: string;
  popularity: number;
}

function DoctorSearch() {
  const [user, setuserData] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(''); // State to store sorting option
  const [selectedQualification, setSelectedQualification] =
    useState<string>('');
  const [selectedWeekday, setSelectedWeekday] = useState<string>('');
  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState<
    'speciality' | 'doctorname'
  >('speciality'); // Track selected search criteria

  useEffect(() => {
    doctorSearch().then((ret) => {
      if (ret) {
        for (let i = 0; i < ret.length; i++) {
          if (ret[i].popularity == null) ret[i].popularity = 0;
        }
        console.log(ret);
        setuserData(ret);
        setCount(ret.length);
        // Sort the data based on the selected sorting option
        if (sortBy === 'New Price Low to High') {
          const sortedData = [...ret];
          sortedData.sort((a, b) => a.new_patient_fee - b.new_patient_fee);
          setuserData(sortedData);
        } else if (sortBy === 'New Price High to Low') {
          const sortedData = [...ret];
          sortedData.sort((a, b) => b.new_patient_fee - a.new_patient_fee);
          setuserData(sortedData);
        }
        else if (sortBy === 'Old  Price Low to High') {
          const sortedData = [...ret];
          sortedData.sort((a, b) =>
          a.old_patient_fee - b.old_patient_fee);
          setuserData(sortedData);
        } else if (sortBy === 'Old Price High to Low') {
          const sortedData = [...ret];
          sortedData.sort((a, b) => b.old_patient_fee - a.old_patient_fee);
          setuserData(sortedData);
        } 
        else if (sortBy === 'Popularity') {
          const sortedData = [...ret];
          sortedData.sort((a, b) => b.popularity - a.popularity);
          setuserData(sortedData);
        }
      } else {
        console.error('Error fetching user profile:', Error);
      }
    });
  }, [sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getUniqueSpecialties = () => {
    const uniqueSpecialtiesSet = new Set();
    user.forEach((doctor) => {
      if (!uniqueSpecialtiesSet.has(doctor.speciality)) {
        uniqueSpecialtiesSet.add(doctor.speciality);
      }
    });

    // Convert the Set back to an array
    const uniqueSpecialtiesArray = Array.from(uniqueSpecialtiesSet);

    return uniqueSpecialtiesArray;
  };

  const getUniqueDoctorNames = () => {
    const uniqueDoctorsSet = new Set();

    user.forEach((doctor) => {
      if (!uniqueDoctorsSet.has(doctor.uname)) {
        uniqueDoctorsSet.add(doctor.uname);
      }
    });

    const uniqueDoctorsArray = Array.from(uniqueDoctorsSet);

    return uniqueDoctorsArray;
  };

  const filteredDoctors = user.filter((doctor) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      ((selectedSearchCriteria === 'speciality' &&
        doctor.speciality.toLowerCase().includes(searchTermLowerCase)) ||
        (selectedSearchCriteria === 'doctorname' &&
          doctor.uname.toLowerCase().includes(searchTermLowerCase))) &&
      (selectedQualification === '' ||
        doctor.qualification === selectedQualification) &&
      (selectedWeekday === '' || doctor.weekday === selectedWeekday)
    );
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="text-above-line my-10 text-left p-20 ">
        <select
          name="searchCriteria"
          id="searchCriteria"
          value={selectedSearchCriteria}
          onChange={(e) =>
            setSelectedSearchCriteria(
              e.target.value as 'speciality' | 'doctorname'
            )
          }
        >
          <option value="speciality">Search by Speciality</option>
          <option value="doctorname">Search by Doctor Name</option>
        </select>
        {selectedSearchCriteria === 'speciality' && (
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
        )}
        {selectedSearchCriteria === 'doctorname' && (
          <Autocomplete
            options={getUniqueDoctorNames()} // Get unique doctor names from user data
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type the Doctor Name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            )}
          />
        )}

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
            <option value="Popularity">Popularity</option>
            <option value="New Price Low to High">New Visit Low to High</option>
            <option value="New Price High to Low">New Visit High to Low</option>
            <option value="Old  Price Low to High">Old Visit Low to High</option>
            <option value="Old Price High to Low">Old Visit High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div
            className="side-nav bg-green-200 p-4 rounded-lg border-2 border-gray-300 w-60"
            style={{ height: 'fit-content' }}
          >
            <div className="side-nav-item">
              <h2 className="text-center text-xl font-semibold mb-4">FILTER</h2>
              <hr className="line-below-text border-gray-400 my-4" />
            </div>
            <div className="side-nav-item">
              <label className="flex items-center text-sm">
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
                  <option value="MD">MD</option>
                  <option value="MCH">MCH</option>
                  <option value="DM">DM</option>
                </select>
              </label>
              <label className="flex items-center text-sm mt-4">
                WeekDay
                <select
                  name="weekday"
                  id="weekday"
                  className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded-md"
                  value={selectedWeekday} // Add this line
                  onChange={(e) => setSelectedWeekday(e.target.value)} // Add this line
                >
                  <option value="">Select</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
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
                      image="https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1.00xw:1.00xh;0,0&resize=800:*"
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
                        Old Patient Fee: {doctor.old_patient_fee}
                      </Typography>
                      <Typography variant="body2">
                        New Patient Fee: {doctor.new_patient_fee}
                      </Typography>
                      <Typography variant="body2">
                        Hospital: {doctor.hospital_name}
                      </Typography>
                      <Typography variant="body2">
                        Weekday: {doctor.weekday}
                      </Typography>

                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() =>
                          navigate('/BookDoctor', {
                            state: {
                              doctorName: doctor.uname,
                              doctorId: doctor.doctor_id,
                              oldPatientFee: doctor.old_patient_fee,
                              newPatientFee: doctor.new_patient_fee,
                              hospitalName: doctor.hospital_name,
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
