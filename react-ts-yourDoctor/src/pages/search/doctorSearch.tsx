import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import axios from 'axios';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function DoctorSearch() {
  const [user, setuserData] = useState({
    uname: '',
    mobile: '',
    meeting_type: '',
    speciality: '',
    new_patient_fee: '',
    profilepic: '',
  });

  const { userid } = useParams();

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:3000/search/doctor/byname`)
      // api call
      .then((response) => {
        setuserData(response.data[0]); // Set the fetched data to the state
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
        <p className="text-gray-400">Search/{user.speciality}</p>
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

          <div className="flex pt-20 px-10  ">
            <div className="grid grid-cols-3 gap-10">
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden ">
                <div className="card-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                    alt="Card Image"
                  />
                </div>
                <div className="card-title">
                  <h3>Card Title</h3>
                </div>
                <div className="card-description">
                  <p>Card description goes here.</p>
                </div>
                <div className="card-button">
                  <button
                    type="submit"
                    className="bg-indigo-300 text-white 
                   px-2.5 text-sm rounded-lg font-semibold items-center"
                  >
                    Book
                  </button>
                </div>
              </div>

              {/* Add more card components here */}
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Card content goes here */}
              </div>

              <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Card content goes here */}
              </div>

              {/* Add more cards as needed */}
            </div>
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
