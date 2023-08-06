/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/extensions */
import { Link } from 'react-router-dom';
import Appointment from '@/assets/appointment.jpg';
import Navbar from '@/pages/navbar/header.tsx';
import Search from '@/assets/searchdoctor.png';
import Waiting from '@/assets/waiting.jpg';
import Online from '@/assets/onlineConsult.jpg';
import Healthcheck from '@/assets/healthcheckhome.jpg';
import Ambulance from '@/assets/ambulance.jpg';
import Footer from './navbar/footer';

function Home() {
  return (
    <>
      <div>
        <Navbar />
        <p>&</p>
      </div>
      <div className="pt-20 flex justify-end bg-indigo-100">
        <Link
          to="ProfileOptions"
          className="inline-block bg-magenta-900 bg-indigo-400 mr-24 font-bold text-lg px-4 py-2 rounded-lg hover:bg-magenta-800"
        >
          SignUp/SignIn
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-14 mx-auto max-w-6xl">
        {/* First Row */}
        <div className="flex flex-col items-center">
          <img src={Search} alt="Search" className="h-40 w-full object-cover" />
          <p className="text-purple-800 font-bold text-lg">
            Search Doctor Easily
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={Appointment}
            alt="Appointment"
            className="h-40 w-full object-cover"
          />
          <p className="text-purple-800 font-bold text-lg">
            Book Doctor Appointment Image
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={Waiting}
            alt="Waiting"
            className="h-40 w-full object-cover"
          />
          <p className="text-purple-800 font-bold text-lg">Brief Waiting</p>
        </div>

        {/* Second Row */}
        <div className="flex flex-col items-center">
          <img
            src={Online}
            alt="Online Consult"
            className="h-40 w-full object-cover"
          />
          <p className="text-purple-800 font-bold text-lg">
            Online Consultation vis Zoom
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={Healthcheck}
            alt="Health Check"
            className="h-40 w-full object-cover"
          />
          <p className="text-purple-800 font-bold text-lg">
            Health Check at Home
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={Ambulance}
            alt="Ambulance"
            className="h-40 w-full object-cover"
          />
          <p className="text-purple-800 font-bold text-lg">Ambulance Service</p>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Home;
