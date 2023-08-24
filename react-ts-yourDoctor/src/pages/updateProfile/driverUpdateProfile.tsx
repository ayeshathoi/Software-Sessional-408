/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderCommon from '../navbar/headerCommon';
import Footer from '../navbar/footer';
import axios from 'axios';
import Driver from '@/assets/driver.jpg';


function DriverProfileUpdate() {
  const { userid } = useParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [prevForm, setPrevForm] = useState({
    name: '',
    hospital: '',
    mobile_no: '',
   
  });
  const [formData, setFormData] = useState({
    name: '',
    hospital: '',
    mobile_no: '',
   
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/driver/profile/${userid}`)
      .then((response) => {
        console.log('API Response:', response.data); 
        setPrevForm({
          name: response.data.name,
          hospital: response.data.hospital,
          mobile_no: response.data.mobile_no,
        });
        setFormData({
          name: response.data.name,
          hospital: response.data.hospital,
          mobile_no: response.data.mobile_no,
        });
      })
      .catch((error) => {
        console.error('Error fetching driver profile:', error);
      });
  }, [userid]);
  
  console.log("dehfxxkxmk",prevForm);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
 
  const handleUpdate = async () => {
    try {
      // Send the formData to the server for update
      console.log("here is the formdata",formData,{userid})
      const response = await axios.put(` http://localhost:3000/driver/editProfile/${userid}`, formData); 
      console.log('Updated Data:', response.data); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className="bg-lightpink py-6">
        <HeaderCommon />
      </div>
      <div className="flex">
        {/* Driver's Photo, Name*/}
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={Driver} alt="Driver" className="h-40 w-full object-cover" />
          <h2 className="text-xl font-semibold mb-2">{formData.name}</h2>
          
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Driver Profile</h1>
            <form>
              {/* Workplace */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Workplace:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.hospital}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Contact no. */}
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
                    <label className="font-semibold">Contact no.:</label>
                  </div>
                  <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={handleChange}
                        className="w-full rounded border-none px-3 py-2"
                      />
                    ) : (
                      <p>{formData.mobile_no}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {isEditing ? (
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-4 mx-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default DriverProfileUpdate;
