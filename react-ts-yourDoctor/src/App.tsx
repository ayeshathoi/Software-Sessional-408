import { HashRouter, Route, Routes } from 'react-router-dom';
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

export function App() {
  return (
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
      <Route path="/doctorUpdateProfile/" element={<DoctorProfileUpdate/>}/>
      <Route path="/doctorHome/" element ={<DoctorHome/>}/>
      <Route path="/prescriptionSubmission/" element ={<PatientPrescription/>}/>
      <Route path="/patientUpdateProfile/" element ={<PatientProfileUpdate/>} />
      <Route path="/nurseUpdateProfile/" element ={<NurseProfileUpdate/>} />
      <Route path="/driverUpdateProfile/" element ={<DriverProfileUpdate/>} />
    </Routes>
  );
}
export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
