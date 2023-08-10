import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import DoctorImage from '@/assets/doctor.jpg';

function DoctorHome() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [showEditScheduleForm, setShowEditScheduleForm] = useState(false);
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false);
  const [workplace, setWorkplace] = useState('workplace1');
  const [numberOfSlots, setNumberOfSlots] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [patientData, setPatientData] = useState<
    Array<{
      name: string;
      contact: string;
      date: string;
      time: string;
      prescriptionLink: string;
    }>
  >([]);
  useEffect(() => {
    // Fetch doctor's name from the database here
    // For now, let's simulate fetching the name after a delay
    setTimeout(() => {
      setDoctorName('Dr. Afsana'); // Simulated fetched name
    }, 1000);
    setTimeout(() => {
      setSpecialization('Cardiologist'); // Simulated fetched name
    }, 1000);
    setTimeout(() => {
      const fetchedPatientData = [
        {
          name: 'Aksa',
          contact: '123-456-7890',
          date: '2023-08-01',
          time: '10:00 AM',
          prescriptionLink: '#',
        },
        {
          name: 'Zinia',
          contact: '997-555-3210',
          date: '2023-08-02',
          time: '02:30 PM',
          prescriptionLink: '#',
        },
        {
          name: 'Ramisa',
          contact: '123-456-7777',
          date: '2023-08-21',
          time: '11:00 AM',
          prescriptionLink: '#',
        },
        {
          name: 'Badhon',
          contact: '987-654-3210',
          date: '2023-08-30',
          time: '05:00 PM',
          prescriptionLink: '#',
        },
        // more patient data...
      ];
      setPatientData(fetchedPatientData);
    }, 1500);
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleEditScheduleToggle = () => {
    setShowEditScheduleForm(!showEditScheduleForm);
  };

  const handleAddScheduleToggle = () => {
    setShowAddScheduleForm(!showAddScheduleForm);
  };

  const handleWorkplaceChange = (value) => {
    setWorkplace(value);
  };

  const handleNumberOfSlotsChange = (e) => {
    setNumberOfSlots(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const patientsToShow =
    selectedSection === 'upcoming'
      ? patientData.filter((patient) => patient.date > currentDate)
      : selectedSection === 'previous'
      ? patientData.filter((patient) => patient.date <= currentDate)
      : [];
  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="pt-20 bg-indigo-100">
        <div className="flex justify-between mx-4 items-center">
          <div>
            <button
              type="button"
              onClick={handleEditScheduleToggle}
              className="text-purple-800 font-bold text-lg hover:underline"
            >
              Edit Schedule
            </button>
            <button
              type="button"
              onClick={handleAddScheduleToggle}
              className="text-blue-800 font-bold text-lg ml-4 hover:underline"
            >
              Add Schedule
            </button>
          </div>
          <p className="text-gray-700">{doctorName}</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-blue-50 h-screen">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              src={DoctorImage}
              alt="Doctor"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-semibold mb-2">{doctorName}</h1>
          <p className="text-lg text-gray-600 mb-4">
            Specialist: {specialization}
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            Zoom Link
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
                    <p className="text-lg font-semibold">{patient.name}</p>
                    <p className="text-gray-600">{patient.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{patient.date}</p>
                    <p className="text-sm text-gray-500">{patient.time}</p>
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
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Edit Schedule</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="workplace">Workplace</label>
                  <select
                    id="workplace"
                    name="workplace"
                    value={workplace}
                    onChange={(e) => handleWorkplaceChange(e.target.value)}
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
                    value={numberOfSlots}
                    onChange={handleNumberOfSlotsChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={endTime}
                    onChange={handleEndTimeChange}
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
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-3">Add Schedule</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="addWorkplace">Workplace</label>
                  <select
                    id="addWorkplace"
                    name="addWorkplace"
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="workplace1">Workplace 1</option>
                    <option value="workplace2">Workplace 2</option>
                    <option value="workplace3">Workplace 3</option>
                    <option value="online meeting">Online meeting</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="addNumberOfSlots">Number of Slots</label>
                  <input
                    type="number"
                    id="addNumberOfSlots"
                    name="addNumberOfSlots"
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addStartTime">Start Time</label>
                  <input
                    type="time"
                    id="addStartTime"
                    name="addStartTime"
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addEndTime">End Time</label>
                  <input
                    type="time"
                    id="addEndTime"
                    name="addEndTime"
                    className="w-full border p-2 rounded-md"
                  />
                </div>
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
