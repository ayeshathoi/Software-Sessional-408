import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

function HospitalHome() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [isActive, setIsActive] = useState(true);
  const [driverName, setDriverName] = useState('');
  const [contact, setContact] = useState('');
  const [tripData, setTripData] = useState<
    Array<{
      name: string;
      contact: string;
      address: string;
      date: string;
    }>
  >([]);
  useEffect(() => {
    // Fetch driver's name and data from the database here
    // For now, let's simulate fetching the data after a delay
    setTimeout(() => {
      setDriverName('XYZ'); // Simulated fetched name
    }, 1000);
    setTimeout(() => {
      setContact('233-556-7886'); // Simulated fetched contact
    }, 1000);
    setTimeout(() => {
      const fetchedtripData = [
        {
          name: 'Aksa',
          contact: '122-45-23344',
          address: '91/7 Kalabagan',
          date: '2023-08-01',
        },
        {
          name: 'Sara',
          contact: '122-45-23344',
          address: '91/7 Kalabagan',
          date: '2023-08-02',
        },
        {
          name: 'NNl',
          contact: '122-45-23344',
          address: '91/7 Kalabagan',
          date: '2023-08-21',
        },
        {
          name: 'Jara',
          contact: '122-45-23344',
          address: '91/7 Kalabagan',
          date: '2023-08-30',
        },
        // more trip data...
      ];
      setTripData(fetchedtripData);
    }, 1500);
  }, []);

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="flex">
      {/* Side Navigation Bar */}
      <div className="bg-gray-800 text-white w-1/5 h-screen">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Driver Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/driver/employee"
                className="block hover:bg-gray-600 px-2 py-1 rounded"
              >
                Employee
              </Link>
            </li>
            <li>
              <Link
                to="/driver/requests"
                className="block hover:bg-gray-600 px-2 py-1 rounded"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/driver/verify-employee"
                className="block hover:bg-gray-600 px-2 py-1 rounded"
              >
                Verify Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-4">
        <HeaderDoctor />
        {/* Add your content here */}
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HospitalHome;
