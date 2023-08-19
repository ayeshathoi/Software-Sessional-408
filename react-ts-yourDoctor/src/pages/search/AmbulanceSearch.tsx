import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function AmbulanceSearch() {
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
      .get(`http://localhost:3000/search/Ambulance/byname`)
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
        <p className="text-gray-400">Search/Ambulance Search</p>
        <hr className="line-below-text my-4 border-t-2 border-gray-300" />

        <div className="flex justify-end items-center">
          <div className="text-gray-400 p-2">Sort By </div>
          <select name="sort" id="sort">
            <option value="Price Low to High">Fare Low to High</option>
            <option value="Price High to Low">Fare High to Low</option>
          </select>
        </div>

        <div className="flex">
          <div className="flex-grow ">
            <div className="flex" style={{ width: '20%' }}>
              <input
                type="text"
                placeholder="Search by thana"
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              <button className="bg-indigo-500 text-white rounded-lg px-4 py-2 ml-2">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center items-center">
              <h1 className="text-gray-400 p-2">4 results around This thana</h1>
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
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default AmbulanceSearch;
