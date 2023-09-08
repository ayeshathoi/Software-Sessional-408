/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './viewPrescriptionuser.css'; // Import the CSS file
import DoctorImage from '@/assets/doctor.jpg';
import User from '@/assets/user.webp';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import { viewPrescriptionUser } from '@/api/apiCalls';

function ViewPrescriptionUser() {
  const location = useLocation();
  const { bookingId } = location.state;
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [noPrescriptionFound, setNoPrescriptionFound] = useState(false);
  console.log('bookingId', bookingId);
  useEffect(() => {
    // Fetch prescription data when component mounts
    const fetchData = async () => {
      try {
        const data = await viewPrescriptionUser(bookingId);

        // const data2 = await data.json();
        if (data.prescriptionDetails === 'No prescriptions found') {
          // Set the state to indicate no prescription found
          setNoPrescriptionFound(true);
          alert('No prescription found for this booking.');
        } else {
          setPrescriptionDetails(data);
        }
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchData();
  }, [bookingId]);

  if (noPrescriptionFound) {
    return <div>No prescription found for this booking.</div>;
  }

  if (!prescriptionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderDoctor /> {/* Include the header component */}
      <div className="view-prescription">
        <div className="doctor-info">
          <div className="doctor-photo">
            <img src={DoctorImage} alt="Doctor" />
          </div>
          <div className="doctor-details">
            <h2>{prescriptionDetails.doctor_name}</h2>
            <p>{prescriptionDetails.speciality}</p>
            <p>{prescriptionDetails.designation}</p>
            <p>{prescriptionDetails.qualification}</p>
          </div>
        </div>
        <div className="patient-info">
          <div className="patient-photo">
            <img src={User} alt="Patient" />
          </div>
          <div className="patient-details">
            <h2>{prescriptionDetails.patient_name}</h2>
            <p>Mobile: {prescriptionDetails.patient_mobile}</p>
            <p>Serial No: {prescriptionDetails.appointment_serial}</p>
            <p>Hospital: {prescriptionDetails.hospital_name}</p>
          </div>
        </div>
        <div className="prescription-table">
          {/* Render the prescription table here using prescriptionDetails */}
          <table>
            <thead>
              <tr>
                <th>Disease</th>
                <th>Tests</th>
                <th>Suggestions</th>
                <th>Medicine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{prescriptionDetails.disease}</td>
                <td>{prescriptionDetails.tests}</td>
                <td>{prescriptionDetails.suggestions}</td>
                <td>{prescriptionDetails.medicine}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer /> {/* Include the footer component */}
    </div>
  );
}
export default ViewPrescriptionUser;
