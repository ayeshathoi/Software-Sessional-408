/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderCommon from '../navbar/headerCommon';
import Footer from '../navbar/footer';
import Driver from '@/assets/driver.jpg';
import axios from 'axios';

interface FormData {
  hospital: string;
  mobile: string;
}

interface ProfileSectionProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
}

function ProfileSection({ label, value, isEditing, onChange }: ProfileSectionProps) {
  return (
    <div className="mb-4">
      <div className="flex">
        <div className="w-1/2 bg-lightblue p-2 rounded-tl rounded-bl">
          <label className="font-semibold">{label}:</label>
        </div>
        <div className="w-1/2 border border-lightblue rounded-tr rounded-br">
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(label, e.target.value)}
              className="w-full rounded border-none px-3 py-2"
            />
          ) : (
            <p>{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DriverProfileUpdate() {
  const { driver_id } = useParams<{ driver_id: string }>();
  const initialData: FormData = {
    hospital: 'Ibn Sina',
    mobile: '123-456-7899',
  };
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handlePdfChange = (e) => {
  //   const file = e.target.files[0];
  //   setPdfFile(file);
  // };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:3000/driver/editProfile/${driver_id}`,
        formData
      );
      console.log('Updated Data:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating driver profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-lightpink py-6">
        <HeaderCommon/>
      </div>
      <div className="flex">
        
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={Driver} alt="Driver" className="h-40 w-full object-cover" />
          {/* <h2 className="text-xl font-semibold mb-2">{user.name}</h2> */}
          
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Driver Profile</h1>
            <form>
              {/* Hospital */}
              <ProfileSection
              label="Hospital"
              value={formData.hospital}
              isEditing={isEditing}
              onChange={handleChange}
              />
              
              {/* Contact no. */}
              <ProfileSection
              label="Contact no"
              value={formData.mobile}
              isEditing={isEditing}
              onChange={handleChange}
              />
            </form>
            {isLoading ? (
            <button className="mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded cursor-not-allowed">
              Updating...
            </button>
          ) : (
            <button
              type="button"
              onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
              className={`mt-4 mx-auto px-4 py-2 ${
                isEditing ? 'bg-blue-500' : 'bg-green-500'
              } text-white rounded hover:bg-${isEditing ? 'blue-600' : 'green-600'}`}
            >
              {isEditing ? 'Update' : 'Edit Profile'}
            </button>
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
