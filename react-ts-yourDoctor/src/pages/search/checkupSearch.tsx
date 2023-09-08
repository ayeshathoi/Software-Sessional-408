/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { checkupSearch } from '@/api/apiCalls';
import Header from '../navbar/loginHeader';
import Footer from '../navbar/footer';

interface Checkup {
  testname: string;
  price: number;
  hospital_name: string;
}

function CheckupSearch() {
  const [user, setUserData] = useState<Checkup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [selectedTests, setSelectedTests] = useState<{
    [testname: string]: string;
  }>({});
  const [selectedHospital, setSelectedHospital] = useState<string>('0');
  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState<
    'hospital' | 'test'
  >('test');
  const [sortingOrder, setSortingOrder] = useState<
    'PriceLowToHigh' | 'PriceHighToLow'
  >('PriceLowToHigh'); // Default sorting order
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    // axios
    //   .get(`http://localhost:3000/patient/testall`)
    //   .then((response) => {
    //     setUserData(response.data);
    //     console.log(response.data.length);
    //     setCount(response.data.length);
    //   })
    //   .catch((err) => {
    //     console.error('Error fetching user profile:', err);
    //   });
    checkupSearch().then((ret) => {
      if (ret) {
        setUserData(ret);
        setCount(ret.length);
      } else {
        console.log('error');
      }
    });
  });

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
    const uniqueTestsSet = new Set();

    user.forEach((test) => {
      if (!uniqueTestsSet.has(test.testname)) {
        uniqueTestsSet.add(test.testname);
      }
    });

    const uniqueTestsArray = Array.from(uniqueTestsSet);

    return uniqueTestsArray;
  };

  const getUniqueHospitals = () => {
    const uniqueHospitalsSet = new Set();

    user.forEach((test) => {
      if (!uniqueHospitalsSet.has(test.hospital_name)) {
        uniqueHospitalsSet.add(test.hospital_name);
      }
    });

    const uniqueHospitalsArray = Array.from(uniqueHospitalsSet);

    return uniqueHospitalsArray;
  };

  const handleTestSelection = (testname: string, hospitalName: string) => {
    setSelectedTests((prevSelectedTests) => {
      const newSelectedTests = { ...prevSelectedTests };

      if (newSelectedTests[testname] === hospitalName) {
        delete newSelectedTests[testname];
      } else {
        newSelectedTests[testname] = hospitalName;
        setError(null);
      }

      return newSelectedTests;
    });
  };

  const handleBookTests = () => {
    const selectedHospitalNames = Object.values(selectedTests);

    const uniqueHospitalNames = [...new Set(selectedHospitalNames)];

    if (uniqueHospitalNames.length > 1) {
      alert('Please select tests from the same hospital to book.');
    } else if (Object.keys(selectedTests).length === 0) {
      setError('Please select at least one test to book.');
    } else {
      const combinedPrice = Object.keys(selectedTests).reduce(
        (totalPrice, testName) => {
          const hospitalName = selectedTests[testName];
          const selectedTest = user.find(
            (test) =>
              test.testname === testName && test.hospital_name === hospitalName
          );
          return (
            totalPrice +
            (selectedTest ? parseFloat(selectedTest.price.toString()) : 0)
          );
        },
        0
      );
      const selectedTestNames = Object.keys(selectedTests);
      navigate('/BookCheckup', {
        state: {
          selectedTests: JSON.stringify(selectedTestNames),
          combinedPrice,
          selectedHospital: uniqueHospitalNames[0], // Use the first hospital name
          userId: 7,
        },
      });
    }
  };

  const handleHospitalTabClick = (hospital: string) => {
    setSelectedHospital(hospital);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOrder(e.target.value as 'PriceLowToHigh' | 'PriceHighToLow');
  };

  const sortedTests = [...user];

  if (sortingOrder === 'PriceLowToHigh') {
    sortedTests.sort((a, b) => a.price - b.price);
  } else if (sortingOrder === 'PriceHighToLow') {
    sortedTests.sort((a, b) => b.price - a.price);
  }

  const filteredTests = sortedTests.filter((test) => {
    if (selectedHospital === '0') {
      return selectedSearchCriteria === 'test'
        ? test.testname.toLowerCase().includes(searchTerm.toLowerCase())
        : test.hospital_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return selectedSearchCriteria === 'test'
      ? test.testname.toLowerCase().includes(searchTerm.toLowerCase()) &&
          test.hospital_name === selectedHospital
      : test.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          test.hospital_name === selectedHospital;
  });

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
          options={getUniqueTests()}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
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
          <div className="text-gray-400 p-2">Sort By Price</div>
          <select
            name="sort"
            id="sort"
            value={sortingOrder}
            onChange={handleSortChange}
          >
            <option value="PriceLowToHigh">Price Low to High</option>
            <option value="PriceHighToLow">Price High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div className="flex ml-4">
            <Paper elevation={1} className="tabs-container mr-4 w-44">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedHospital}
                className="bg-green-200 h-full"
                onChange={(e, newValue) =>
                  handleHospitalTabClick(newValue as string)
                }
                aria-label="Vertical tabs example"
              >
                <Tab label="All Tests" value="0" />
                {getUniqueHospitals().map((hospital) => (
                  <Tab key={hospital} label={hospital} value={hospital} />
                ))}
              </Tabs>
            </Paper>
            <Grid container spacing={3}>
              {filteredTests.map((test, index) => (
                <Grid item xs={4} key={index}>
                  <CardMedia
                    component="img"
                    alt="test"
                    height="100"
                    image="https://img.freepik.com/free-vector/medical-healthcare-background-with-cardiograph-line_1017-25757.jpg?w=1380&t=st=1692518445~exp=1692519045~hmac=724b60d0cfae3f817610a3997cfdff415cfc435b91945e4970b0466fb0d03cae"
                  />
                  <Card style={{ backgroundColor: '	#33CCCC' }}>
                    <Checkbox
                      checked={
                        selectedTests[test.testname] === test.hospital_name
                      }
                      onChange={() =>
                        handleTestSelection(test.testname, test.hospital_name)
                      }
                    />

                    <CardContent>
                      <Typography variant="h6">{test.testname}</Typography>
                      <Typography variant="body2">
                        Hospital: {test.hospital_name}
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
