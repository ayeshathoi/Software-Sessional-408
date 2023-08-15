import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import Header from '@/pages/navbar/header.tsx';

function HeaderUser() {
  return (
    <div>
      <Header />
      <p>&</p>

      <div className="pt-20 flex justify-between items-center fixed w-full bg-green-100">
        <Link
          to="ProfileOptions"
          className="mx-4 text-magenta-900 font-bold text-lg mr-4 hover:underline"
        >
          Book a new Appointment++
        </Link>
        <Link
          to="ProfileOptions"
          className="text-magenta-900 font-bold text-lg mr-4 hover:underline"
        >
          New HealthCheck Service++
        </Link>
        <Link
          to="ProfileOptions"
          className="text-magenta-900 font-bold text-lg mr-4 hover:underline"
        >
          New Ambulance Service++
        </Link>
        <p className="text-magenta-900 font-bold text-lg mr-4 hover:underline">
          UserName
        </p>
      </div>
    </div>
  );
}
export default HeaderUser;
