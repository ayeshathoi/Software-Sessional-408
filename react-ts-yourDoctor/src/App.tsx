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
