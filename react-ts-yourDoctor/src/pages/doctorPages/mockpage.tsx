import { SetStateAction, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import DoctorImage from '@/assets/doctor.jpg';

function DoctorHome() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [showEditScheduleForm, setShowEditScheduleForm] = useState(false);
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false);
  const [user, setUser] = useState({
    name: '',
    specialization: '',
    patientname: '',
    patientcontact: '',
    date: '',
    time: '',
    zoom: '',
  });
  const [editData, setEditData] = useState({
    workplace: '',
    numberofslots: '',
    start_time: '',
    end_time: '',
  });
  const [addData, setAddData] = useState({
    workplace1: '',
    numberofslots1: '',
    start_time1: '',
    end_time1: '',
    workplace2: '',
    numberofslots2: '',
    start_time2: '',
    end_time2: '',
    workplace3: '',
    numberofslots3: '',
    start_time3: '',
    end_time3: '',
  });
  const { userid } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor/${userid}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      
      })
      .catch((error) => {
        console.error('userprofile not found', error);
      });
  }, [userid]);

  const handleEditScheduleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('http://localhost:3000/api/editSchedule', editData)
      .then((response) => {
        // Handle successful response (e.g., show success message)
        console.log('Schedule updated successfully', response.data);
      })
      .catch((error) => {
        // Handle error (e.g., show error message)
        console.error('Error updating schedule', error);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a POST request to your backend API
    await axios
      .post('http://localhost:3000/api/addSchedule', addData)
      .then((response) => {
        // Handle success, maybe show a success message
        console.log('Schedule added successfully', response.data);
      })
      .catch((error) => {
        // Handle error, show an error message
        console.error('Error adding schedule', error);
      });
  };

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  const handleEditScheduleToggle = () => {
    setShowEditScheduleForm(!showEditScheduleForm);
  };

  const handleAddScheduleToggle = () => {
    setShowAddScheduleForm(!showAddScheduleForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const patientsToShow =
    selectedSection === 'upcoming'
      ? user.date > currentDate
        ? [
            {
              name: user.patientname,
              contact: user.patientcontact,
              date: user.date,
              time: user.time,
              prescriptionLink: '#', // You might need to adapt this
            },
          ]
        : []
      : selectedSection === 'previous'
      ? user.date <= currentDate
        ? [
            {
              name: user.patientname,
              contact: user.patientcontact,
              date: user.date,
              time: user.time,
              prescriptionLink: '#', // You might need to adapt this
            },
          ]
        : []
      : [];
  return (
    <>
      <div>
        <HeaderDoctor />
      </div>

      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              src={DoctorImage}
              alt="Doctor"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Name: {user.name}</h1>
          <p className="text-lg text-gray-600 mb-4">
            Specialist: {user.specialization}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            Zoom Link:{user.zoom}
          </a>
          <div className="mt-4">
            <Link to="DoctorProfileUpdate">
              <button
                type="button"
                className="bg-teal-500 px-4 py-2 rounded-lg text-white"
              >
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/4 ml-8">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-3">Today's Schedule</h2>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer ${
                  selectedSection === 'workplace1'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => handleSectionChange('workplace1')}
              >
                Workplace 1
              </li>
              <li
                className={`cursor-pointer ${
                  selectedSection === 'workplace2'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => handleSectionChange('workplace2')}
              >
                Workplace 2
              </li>
              <li
                className={`cursor-pointer ${
                  selectedSection === 'workplace3'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => handleSectionChange('workplace3')}
              >
                Workplace 3
              </li>
              <li
                className={`cursor-pointer ${
                  selectedSection === 'onlineMeeting'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                onClick={() => handleSectionChange('onlineMeeting')}
              >
                Online Meeting
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 ml-8">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('upcoming')}
            >
              Upcoming
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'previous'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } hover:bg-blue-600 hover:text-white`}
              onClick={() => handleSectionChange('previous')}
            >
              Previous
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">
              {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'}{' '}
              Patients
            </h2>
            <ul className="space-y-4">
              {patientsToShow.map((patient, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{user.patientname}</p>
                    <p className="text-gray-600">{user.patientcontact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{user.date}</p>
                    <p className="text-sm text-gray-500">{user.time}</p>
                    <Link
                      to="PatientPrescription"
                      className="text-blue-600 hover:underline"
                    >
                      Prescription
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showEditScheduleForm && (
          <div className="w-1/4 ml-8">
            <div className="bg-pink-50 p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Edit Schedule</h2>
              <form onSubmit={handleEditScheduleSubmit}>
                <div className="mb-3">
                  <label htmlFor="workplace">Workplace</label>
                  <select
                    id="workplace"
                    name="workplace"
                    value={editData.workplace}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="workplace1">Workplace 1</option>
                    <option value="workplace2">Workplace 2</option>
                    <option value="workplace3">Workplace 3</option>
                    <option value="online meeting">Online meeting</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfSlots">Number of Slots</label>
                  <input
                    type="number"
                    id="numberOfSlots"
                    name="numberOfSlots"
                    value={editData.numberofslots}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={editData.start_time}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={editData.end_time}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        {showAddScheduleForm && (
          <div className="w-1/4 ml-8">
            <div className="bg-pink-50 p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Add Schedule</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="addWorkplace1">Workplace 1</label>
                  <input
                    type="text"
                    id="addWorkplace1"
                    name="workplace1"
                    value={addData.workplace1}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="Name of workplace.."
                  />
                  <input
                    type="number"
                    id="addNumberOfSlots1"
                    name="numberofslots1"
                    value={addData.numberofslots1}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="No of slots.."
                  />
                  <input
                    type="time"
                    id="addStartTime1"
                    name="start_time1"
                    value={addData.start_time1}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                  <input
                    type="time"
                    id="addEndTime1"
                    name="end_time1"
                    value={addData.end_time1}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addWorkplace2">Workplace 2</label>
                  <input
                    type="text"
                    id="addWorkplace2"
                    name="workplace2"
                    value={addData.workplace2}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="Name of workplace.."
                  />
                  <input
                    type="number"
                    id="addNumberOfSlots2"
                    name="numberofslots2"
                    value={addData.numberofslots2}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="No of slots.."
                  />
                  <input
                    type="time"
                    id="addStartTime2"
                    name="start_time2"
                    value={addData.start_time2}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                  <input
                    type="time"
                    id="addEndTime2"
                    name="end_time2"
                    value={addData.end_time2}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addWorkplace3">Workplace 3</label>
                  <input
                    type="text"
                    id="addWorkplace3"
                    name="workplace3"
                    value={addData.workplace3}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="Name of workplace.."
                  />
                  <input
                    type="number"
                    id="addNumberOfSlots3"
                    name="numberofslots3"
                    value={addData.numberofslots3}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    placeholder="No of slots.."
                  />
                  <input
                    type="time"
                    id="addStartTime3"
                    name="start_time3"
                    value={addData.start_time3}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                  <input
                    type="time"
                    id="addEndTime3"
                    name="end_time3"
                    value={addData.end_time3}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>

                {/* Repeat the above structure for Workplace 2 and Workplace 3 */}

                <button
                  type="submit"
                  className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default DoctorHome;
