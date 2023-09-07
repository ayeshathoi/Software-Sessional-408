import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProfileOptions from './pages/signup/profileOptions';
import DoctorSignup from './pages/signup/doctorSignup';
import NurseSignup from './pages/signup/nurseSignup';
import DriverSignup from './pages/signup/driverSignup';
import PatientSignup from './pages/signup/patientSignup';
import HospitalSignup from './pages/signup/hospitalSignup';
import LogIn from './pages/signup/login';
import NurseProfileUpdate from './pages/updateProfile/nurseUpdateProfile';
import DriverProfileUpdate from './pages/updateProfile/driverUpdateProfile';
import DoctorProfileUpdate from './pages/updateProfile/doctorUpdateProfile';
import PatientProfileUpdate from './pages/updateProfile/patientUpdateProfile';
import DoctorHome from './pages/doctorPages/doctorHome';
// import PatientPrescription from './pages/doctorPages/prescriptionSubmission';
import Prescription from './pages/doctorPages/prescriptionSubmission';
import NurseHome from './pages/nursePages/nurseHome';
import DriverHome from './pages/driverPages/driverHome';
import UserHome from './pages/userPages/userHome';
import HospitalHome from './pages/hospitalPages/hospitalHome';
import DoctorSearch from './pages/search/doctorSearch';
import AmbulanceSearch from './pages/search/AmbulanceSearch';
import BookDoctor from './pages/Booking/BookDoctor';
import BookCheckup from './pages/Booking/BookCheckup';
import BookAmbulance from './pages/Booking/BookAmbulance';
import CheckupSearch from './pages/search/checkupSearch';
import AvailableEmployee from './pages/hospitalPages/employee';
import AssignNurse from './pages/hospitalPages/Assign_Nurse';
import EditTest from './pages/hospitalPages/Edit_test';
import Chatbox from './pages/chatBox/chatBox';
import AddSchedule from './pages/doctorPages/addschedule';
import EditHospiatlList from './pages/doctorPages/editHospitalList';
import EditSchedule from './pages/doctorPages/editschedule';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ProfileOptions" element={<ProfileOptions />} />
        <Route path="/DoctorSignup/" element={<DoctorSignup />} />
        <Route path="/NurseSignup/" element={<NurseSignup />} />
        <Route path="/DriverSignup/" element={<DriverSignup />} />
        <Route path="/PatientSignup/" element={<PatientSignup />} />
        <Route path="/HospitalSignup/" element={<HospitalSignup />} />
        <Route path="/LogIn/" element={<LogIn />} />
        <Route
          path="/doctorHome/:userid/DoctorProfileUpdate/"
          element={<DoctorProfileUpdate />}
        />
        <Route path="/doctorHome/:userid" element={<DoctorHome />} />
        <Route path="/nurseHome/:userid" element={<NurseHome />} />
        <Route path="/driverHome/:userid" element={<DriverHome />} />
        <Route
          path="/doctorHome/:userid/prescriptionSubmission/"
          element={<Prescription />}
        />
        <Route
          path="/userHome/:userid/PatientProfileUpdate/"
          element={<PatientProfileUpdate />}
        />
        <Route
          path="/nurseHome/:userid/NurseProfileUpdate/"
          element={<NurseProfileUpdate />}
        />
        <Route
          path="/driverHome/:userid/DriverProfileUpdate/"
          element={<DriverProfileUpdate />}
        />

        <Route path="/userHome/:userid" element={<UserHome />} />
        <Route path="/hospitalHome/:userid" element={<HospitalHome />} />
        <Route
          path="/hospitalHome/:userid/AvailableEmployee/"
          element={<AvailableEmployee />}
        />
        <Route
          path="/hospitalHome/:userid/:bookingID"
          element={<AssignNurse />}
        />
        <Route
          path="/hospitalHome/:userid/EditTest/:testID"
          element={<EditTest />}
        />

        {/* <Route path="/doctorSearch/:userid" element={<DoctorSearch />} />
        <Route path="/AmbulanceSearch/:userid" element={<AmbulanceSearch />} /> */}
        <Route
          path="/userHome/:userid/DoctorSearch/"
          element={<DoctorSearch />}
        />
        <Route
          path="/userHome/:userid/CheckupSearch/"
          element={<CheckupSearch />}
        />
        <Route
          path="/userHome/:userid/AmbulanceSearch/"
          element={<AmbulanceSearch />}
        />
        <Route path="/BookDoctor/" element={<BookDoctor />} />
        <Route path="/BookAmbulance/" element={<BookAmbulance />} />
        <Route path="/BookCheckup/" element={<BookCheckup />} />
        <Route path="/chatbox/" element={<Chatbox />} />
        <Route path="/AddSchedule/:userid" element={<AddSchedule />} />
        <Route path="/Prescription/" element={<Prescription />} />
        <Route
          path="/EditHospiatlList/:userid"
          element={<EditHospiatlList />}
        />
        <Route
          path="/doctorHome/:userid/EditSchedule/:timelineId"
          element={<EditSchedule />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
