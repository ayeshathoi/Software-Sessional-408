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
import PatientPrescription from './pages/doctorPages/prescriptionSubmission';
import NurseHome from './pages/nursePages/nurseHome';
import DriverHome from './pages/driverPages/driverHome';
import UserHome from './pages/userPages/userHome';
import HospitalHome from './pages/hospitalPages/hospitalHome';
import DoctorSearch from './pages/search/doctorSearch';
import AmbulanceSearch from './pages/search/AmbulanceSearch';

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
          path="/doctorHome/:userid/PatientPrescription/"
          element={<PatientPrescription />}
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

        <Route path="/doctorSearch/:userid" element={<DoctorSearch />} />
        <Route path="/AmbulanceSearch/:userid" element={<AmbulanceSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
