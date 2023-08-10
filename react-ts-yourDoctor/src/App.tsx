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
import Appointments from './pages/userPages/appointments';
import Tests from './pages/userPages/tests';
import Ambulances from './pages/userPages/ambulance';
import NurseHome from './pages/nursePages/nurseHome';
import DriverHome from './pages/driverPages/driverHome';
import UserHome from './pages/userPages/userHome';

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
          path="/doctorHome/DoctorProfileUpdate/"
          element={<DoctorProfileUpdate />}
        />
        <Route path="/doctorHome/" element={<DoctorHome />} />
        <Route path="/nurseHome/" element={<NurseHome />} />
        <Route path="/driverHome/" element={<DriverHome />} />
        <Route
          path="/doctorHome/PatientPrescription/"
          element={<PatientPrescription />}
        />
        <Route
          path="/userHome/PatientProfileUpdate/"
          element={<PatientProfileUpdate />}
        />
        <Route
          path="/nurseHome/NurseProfileUpdate/"
          element={<NurseProfileUpdate />}
        />
        <Route
          path="/driverHome/DriverProfileUpdate/"
          element={<DriverProfileUpdate />}
        />
        <Route path="/userHome/Appointments/" element={<Appointments />} />
        <Route path="/userHome/Tests/" element={<Tests />} />
        <Route path="/userHome/Ambulances/" element={<Ambulances />} />
        <Route path="/userHome/" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
