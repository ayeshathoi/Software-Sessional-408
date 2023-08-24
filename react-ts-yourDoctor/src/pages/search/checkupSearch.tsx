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
  Checkbox,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../navbar/loginHeader';
import Footer from '../navbar/footer';

interface Checkup {
  testname: string;
  price: number;
  hospital_name: string;
}

function CheckupSearch() {
  const [user, setuserData] = useState<Checkup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userid } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState<
    'hospital' | 'test'
  >('test');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/patient/testall`)
      // api call
      .then((response) => {
        setuserData(response.data); // Set the fetched data to the state
        console.log(response.data.length);
        setCount(response.data.length);
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err);
      });
  }, [userid]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchCriteriaChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSearchCriteria(e.target.value as 'hospital' | 'test');
    setSearchTerm('');
  };

  const getUniqueTests = () => {
    // Create a Set to store unique Tests
    const uniqueTestsSet = new Set();

    // Iterate through user data and add Tests to the Set
    user.forEach((test) => {
      if (!uniqueTestsSet.has(test.testname)) {
        uniqueTestsSet.add(test.testname);
      }
    });

    // Convert the Set back to an array
    const uniqueTestsArray = Array.from(uniqueTestsSet);

    return uniqueTestsArray;
  };
  const filteredtests = user.filter((test) =>
    selectedSearchCriteria === 'test'
      ? test.testname.toLowerCase().includes(searchTerm.toLowerCase())
      : test.hospital_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleTestSelection = (testname: string, hospitalName: string) => {
    if (selectedTests.includes(testname)) {
      setSelectedTests(
        selectedTests.filter((selected) => selected !== testname)
      );
    } else {
      setSelectedTests([...selectedTests, testname]);
      if (selectedHospital === null) {
        setSelectedHospital(hospitalName);
      } else if (selectedHospital !== hospitalName) {
        setError('Selected tests have different hospital names.');
      }
    }
  };
  const calculateCombinedPrice = () => {
    return selectedTests.reduce((totalPrice, testName) => {
      const selectedTest = user.find((test) => test.testname === testName);
      return (
        totalPrice +
        (selectedTest ? parseFloat(selectedTest.price.toString()) : 0)
      );
    }, 0);
  };

  const handleBookTests = () => {
    if (selectedHospital === null) {
      setError('Please select at least one test to book.');
    } else {
      const combinedPrice = calculateCombinedPrice();
      navigate('/BookCheckup', {
        state: {
          selectedTests: JSON.stringify(selectedTests),
          combinedPrice,
          selectedHospital,
          userId: userid,
        },
      });
    }
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
          onChange={handleSearchCriteriaChange}
        >
          <option value="test">Search by Test Name</option>
          <option value="hospital">Search by Hospital Name</option>
        </select>
        <Autocomplete
          options={getUniqueTests()} // Get unique Tests from user data
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Type the Test name"
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
            <option value="Price Low to High">Visit Low to High</option>
            <option value="Price High to Low">Visit High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div className="flex ml-4">
            <Grid container spacing={3}>
              {filteredtests.map((test, index) => (
                <Grid item xs={4} key={index}>
                  <CardMedia
                    component="img"
                    alt="test"
                    height="100"
                    image="https://img.freepik.com/free-vector/medical-healthcare-background-with-cardiograph-line_1017-25757.jpg?w=1380&t=st=1692518445~exp=1692519045~hmac=724b60d0cfae3f817610a3997cfdff415cfc435b91945e4970b0466fb0d03cae"
                  />
                  <Card style={{ backgroundColor: '	#33CCCC' }}>
                    <Checkbox
                      checked={selectedTests.includes(test.testname)}
                      onChange={() =>
                        handleTestSelection(test.testname, test.hospital_name)
                      }
                    />
                    <CardContent>
                      <Typography variant="h6">{test.testname}</Typography>
                      <Typography variant="body2">
                        testname: {test.hospital_name}
                      </Typography>

                      <Typography variant="body2">Fee: {test.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-4 flex justify-center items-center">
        <Button
          variant="contained"
          color="inherit"
          onClick={handleBookTests}
          disabled={!!error}
        >
          Book
        </Button>
      </div>
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      <div className="flex justify-center items-center">
        <div className="text-gray-400 p-2"> {count} results found</div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default CheckupSearch;
