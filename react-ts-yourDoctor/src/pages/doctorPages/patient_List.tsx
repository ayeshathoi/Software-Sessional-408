import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import { doctor_patient_list } from '@/api/apiCalls';

interface PatientDetails {
  time: string;
  date: string;
  uname: string;
  patient_mobile: string;
  total_price: number;
  appointment_serial: number;
  hospital_name: string;
  booking_id: number;
}
interface PatientArrayProps {
  selectedHospital: string | null;
}

function PatientArray({ selectedHospital }: PatientArrayProps) {
  const [selectedSection, setSelectedSection] = useState('upcoming');
  const [patients, setpatients] = useState<PatientDetails[]>([]);

  const handleSectionChange = (section: SetStateAction<string>) => {
    setSelectedSection(section);
  };
  const navigate = useNavigate();
  console.log('newhospital ', selectedHospital);

  useEffect(() => {
    if (selectedHospital) {
      const requestBody = { hospital_name: selectedHospital };
      doctor_patient_list(requestBody).then((res) => {
        if (res) {
          const currentData: PatientDetails[] = res || [];
          const previousPatientListDoctor: PatientDetails[] = JSON.parse(
            localStorage.getItem('previousPatientListDoctor') || '[]'
          );
          if (currentData.length > previousPatientListDoctor.length) {
            alert('New Patient Added!');
          }
          localStorage.setItem(
            'previousPatientListDoctor',
            JSON.stringify(currentData)
          );
          setpatients(res);
        } else {
          console.log('No Patients Found');
        }
      });
    }
  }, [selectedHospital]);

  const currentDate = new Date().toISOString();

  const upcomingPatients = patients.filter(
    (patientsDetails) => patientsDetails.date > currentDate
  );

  const previousPatient = patients.filter(
    (patientsDetails) => patientsDetails.date <= currentDate
  );

  const PatientToShow =
    selectedSection === 'upcoming' ? upcomingPatients : previousPatient;

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
          <h2 className="text-lg font-semibold mr-4">
            {selectedSection === 'upcoming' ? 'Upcoming' : 'Previous'} Serial
          </h2>
          <ul className="space-y-4">
            {PatientToShow.map((patient, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Name: {patient.uname}</p>
                  <p className="text-gray-600">
                    mobile no. : {patient.patient_mobile}
                  </p>
                  <p className="text-gray-600">
                    Serial:{patient.appointment_serial}
                  </p>
                  <p className="text-gray-600">
                    Hospital:{patient.hospital_name}
                  </p>
                  <hr />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {patient.date.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {patient.time.split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Price: {patient.total_price}
                  </p>

                  <div>
                    <Tooltip title="Create Prescription">
                      <Button
                        className="text-blue-500, hover:text-blue-800"
                        onClick={() =>
                          navigate('/Prescription', {
                            state: {
                              bookingId: patient.booking_id,
                            },
                          })
                        }
                      >
                        <PostAddTwoToneIcon />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Prescription">
                      <Button
                        className="text-blue-500, hover:text-blue-800"
                        onClick={() =>
                          navigate('/viewPrescription', {
                            state: {
                              bookingId: patient.booking_id,
                            },
                          })
                        }
                      >
                        <ReceiptLongTwoToneIcon />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Chat">
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() =>
                          navigate('/Chatbox', {
                            state: {
                              receiverName: patient.uname,
                              bookingId: patient.booking_id,
                              serialNumber: patient.appointment_serial,
                            },
                          })
                        }
                      >
                        <ForumTwoToneIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default PatientArray;
