import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './viewPrescription.css'; // Import the CSS file
import DoctorImage from '@/assets/doctor.jpg';
import User from '@/assets/user.webp';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

const ViewPrescription = () => {
  const location = useLocation();
  const { bookingId } = location.state;
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [noPrescriptionFound, setNoPrescriptionFound] = useState(false);

  useEffect(() => {
    // Fetch prescription details from the backend using an API call
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/doctor/viewprescription/${bookingId}`);
        if (response.status === 200) {
          const data = await response.json();
          if (data.prescriptionDetails === 'No prescriptions found') {
            // Set the state to indicate no prescription found
            setNoPrescriptionFound(true);
          } else {
            setPrescriptionDetails(data);
          }
        } else {
          // Handle error cases
          console.error('Error fetching prescription details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
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
};

export default ViewPrescription;
