/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { viewPrescription, addprescription } from '@/api/apiCalls';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
// Define the CSS styles as JavaScript objects
const styles = {
  prescriptionContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  prescriptionHeader: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    marginTop: '15px',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

function Prescription() {
  const [formData, setFormData] = useState({
    disease: '',
    tests: '',
    suggestions: '',
    medicine: '',
  });
  const location = useLocation();
  const { bookingId } = location.state;
  console.log('bookingId', bookingId);
  const [noPrescriptionFound, setNoPrescriptionFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewPrescription(bookingId);
        if (data.prescriptionDetails === 'No prescriptions found') {
          setNoPrescriptionFound(true);
          alert('No prescription found for this booking.');
        } else {
          setNoPrescriptionFound(false);
        }
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchData();
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      disease: formData.disease,
      tests: formData.tests,
      suggestions: formData.suggestions,
    };
    if (noPrescriptionFound === true) {
      // Send a POST request to the backend to create the prescription
      try {
        const ret = await addprescription(bookingId, requestData); // Use the api call from apiCalls.tsx
      } catch (err) {
        console.log(err);
      }
      alert('Prescription created successfully.');
      navigate(`/doctorHome`);
    } else {
      alert('Prescription already exists for this booking.');
    }
  };

  return (
    <>
      <div>
        <HeaderDoctor />
    <div style={styles.prescriptionContainer}>
      <h2 style={styles.prescriptionHeader}>Create Prescription</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="disease">
            Disease:
          </label>
          <input
            style={styles.input}
            type="text"
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="tests">
            Tests:
          </label>
          <input
            style={styles.input}
            type="text"
            id="tests"
            name="tests"
            value={formData.tests}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="suggestions">
            Suggestions:
          </label>
          <textarea
            style={styles.input}
            id="suggestions"
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="medicine">
            Medicine:
          </label>
          <textarea
            style={styles.input}
            id="medicine"
            name="medicine"
            value={formData.medicine}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Create Prescription
        </button>
      </form>
    </div>

        <Footer />
      </div>
    </>
  );
}

export default Prescription;
