/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/pages/navbar/headerdoctor';
import Footer from '@/pages/navbar/footer';
import PatientImage from '@/assets/patient.jpg';
import DoctorImage from '@/assets/doctor.jpg';
import HospitalImage from '@/assets/hospital.jpg';
import NurseImage from '@/assets/nurse.jpg';
import AmbulanceImage from '@/assets/ambulance.jpg';
import LoginImage from '@/assets/login.jpg';

function ProfileOptions() {
  // const loginVariants = {
  //   initial: { scale: 1 },
  //   hover: { scale: 1.1 },
  //   tap: { scale: 0.9 },
  // };

  const shakeVariants = {
    hover: { x: [-5, 5, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
    tap: { x: [-5, 5, -5, 5, -5, 5, 0], transition: { duration: 0.5 } },
  };
  const linksData = [
    { title: 'Doctor SignUp', imageUrl: DoctorImage, linkTo: 'DoctorSignup' },
    { title: 'Nurse SignUp', imageUrl: NurseImage, linkTo: 'NurseSignup' },
    {
      title: 'Driver SignUp',
      imageUrl: AmbulanceImage,
      linkTo: 'DriverSignup',
    },
    {
      title: 'Patient SignUp',
      imageUrl: PatientImage,
      linkTo: 'PatientSignup',
    },
    {
      title: 'Hospital SignUp',
      imageUrl: HospitalImage,
      linkTo: 'HospitalSignup',
    },
    {
      title: 'LogIn',
      imageUrl: LoginImage,
      linkTo: 'LogIn',
    },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center pt-20">
        <div className="grid grid-cols-3 gap-10">
          {linksData.map(({ title, imageUrl, linkTo }, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link to={`/${linkTo}`}>
                <motion.img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-48 h-48 rounded-full mb-5 mr-20"
                  variants={shakeVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
              </Link>
              <Link
                to={`/${linkTo}`}
                className="text-magenta-900 mr-20 mb-2 font-bold text-lg hover:underline"
              >
                {title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default ProfileOptions;
