/* eslint-disable react/no-array-index-key */
import { SetStateAction, useEffect, useState } from 'react';
import { driver_patient_list } from '@/api/apiCalls';

interface Ambulance {
  time: string;
  date: string;
  uname: string;
  mobile_no: string;
}

function Order() {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/driver/order`)
    //   .then((response) => {
    //     setAmbulances(response.data.result);
    //     // console.log(response.data);
    //   })
    driver_patient_list().then((res) => {
      if (res) {
        setAmbulances(res.result);
      } else {
        console.log('error');
      }
    });
  });

  const currentDate = new Date().toISOString();

  const upcomingAmbulances = ambulances.filter(
    (ambulance) => ambulance.date > currentDate
  );
  console.log(upcomingAmbulances);

  const previousAmbulances = ambulances.filter(
    (ambulance) => ambulance.date <= currentDate
  );

  const AmbulancesToShow =
    selectedSection === 'upcoming' ? upcomingAmbulances : previousAmbulances;

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 ml-8">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              selectedSection === 'upcoming'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600'
            } hover:bg-green-600 hover:text-white`}
            onClick={() => handleSectionChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              selectedSection === 'previous'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600'
            } hover:bg-green-600 hover:text-white`}
            onClick={() => handleSectionChange('previous')}
          >
            Previous
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Order
          </h2>
          <ul className="space-y-4">
            {AmbulancesToShow.map((ambulance, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Name: {ambulance.uname}
                  </p>
                  <p className="text-gray-600">
                    mobile : {ambulance.mobile_no}
                  </p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {ambulance.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {ambulance.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Order;
