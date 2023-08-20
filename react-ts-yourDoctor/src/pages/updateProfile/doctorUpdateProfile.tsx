/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import axios from 'axios';
import Doctor from '@/assets/doctor.jpg';

interface FormData {
  speciality: string;
  designation: string;
  qualification: string;
  contactNumber: string;
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

function DoctorProfileUpdate() {
  const { doctor_id } = useParams<{ doctor_id: string }>();
  const initialData: FormData = {
    speciality: 'Cardiologist',
    designation: 'Senior Consultant',
    qualification: 'MBBS, MD',
    contactNumber: '123-456-7890',
  };
  // const [user, setUser] = useState({
  //   uname: '',

  // });
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/api/doctorprofile/${userid}')
  //     .then((res) => {
  //       setUser(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.error('userprofile not found', error);
  //     });
  // }, [doctor_id]);
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  //const { doctor_id } = useParams();
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:3000/doctor/update-profile/${doctor_id}`,
        formData
      );
      console.log('Updated Data:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating doctor profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="bg-lightpink py-6">
        <HeaderDoctor />
      </div>
      <div className="flex">
        {/* Doctor's Photo, Name, and Specialist */}
        <div className="w-1/4 p-6 bg-white shadow-md">
          <img src={Doctor} alt="Doctor" className="h-40 w-full object-cover" />
          {/* <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600">{formData.speciality}</p> */}
        </div>
        <div className="w-3/4 p-6 bg-lightpink">
          <div className="w-96 p-6 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Doctor Profile</h1>
            <form>
              {/* Specialist */}
              <ProfileSection
              label="Speciality"
              value={formData.speciality}
              isEditing={isEditing}
              onChange={handleChange}
              />
              {/* designation */}
              <ProfileSection
              label="Designation"
              value={formData.designation}
              isEditing={isEditing}
              onChange={handleChange}
              />
              {/* qualification */}
              <ProfileSection
              label="Qualification"
              value={formData.qualification}
              isEditing={isEditing}
              onChange={handleChange}
              />
              
              {/* Contact no. */}
              <ProfileSection
              label="Contact no"
              value={formData.contactNumber}
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

export default DoctorProfileUpdate;
