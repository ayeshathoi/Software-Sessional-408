/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
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

interface Driver {
  driver_id: number;
  driver_name: string;
  driver_phone: string;
  ambulance_type: string;
  ambulance_fare: number;
  street: string;
  thana: string;
  city: string;
  district: string;
  hospital: string;
}

function AmbulanceSearch() {
  const [user, setuserData] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userid } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/ambulanceall`)
      // api call
      .then((response) => {
        setuserData(response.data); // Set the fetched data to the state
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userid]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getThana = () => {
    // Create a Set to store unique specialties
    const thanaset = new Set();

    // Iterate through user data and add specialties to the Set
    user.forEach((driver) => {
      if (!thanaset.has(driver.thana)) {
        thanaset.add(driver.thana);
      }
    });

    // Convert the Set back to an array
    const thanasetArray = Array.from(thanaset);

    return thanasetArray;
  };
  const filteredDriver = user.filter((Driver) =>
    Driver.thana.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="text-above-line my-10 text-left p-20 ">
        <Autocomplete
          options={getThana()} // Get unique specialties from user data
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Search by Thana"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
        />
        <hr className="line-below-text my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center">
          <div className="text-gray-400 p-2">Sort By </div>
          <select name="sort" id="sort">
            <option value="Price Low to High">Fare Low to High</option>
            <option value="Price High to Low">Fare High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div className="flex ml-4">
            <Grid container spacing={3}>
              {filteredDriver.map((driver, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="driver"
                      height="200"
                      image="https://www.vectorjunky.com/wp-content/uploads/2017/02/Pr%20122-%20TRI%20-%2025_02_11%20-%20006.jpg"
                    />
                    <CardContent>
                      <Typography variant="h6">{driver.driver_name}</Typography>
                      <Typography variant="body2">
                        Mobile No: {driver.driver_phone}
                      </Typography>
                      <Typography variant="body2">
                        Ambulance Type: {driver.ambulance_type}
                      </Typography>
                      <Typography variant="body2">
                        Ambulance Fare: {driver.ambulance_fare}
                      </Typography>
                      <Typography variant="body2">
                        Thana : {driver.thana}
                      </Typography>
                      <Typography variant="body2">
                        City: {driver.city}
                      </Typography>
                      <Typography variant="body2">
                        Hospital: {driver.hospital}
                      </Typography>

                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() =>
                          navigate('/BookAmbulance', {
                            state: {
                              driverName: driver.driver_name,
                              driverID: driver.driver_id,
                              price: driver.ambulance_fare,
                              hospitalName: driver.hospital,
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

export default AmbulanceSearch;
