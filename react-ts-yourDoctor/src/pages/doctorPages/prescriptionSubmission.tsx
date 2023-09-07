import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

const styles = {
  prescriptionContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
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
  const [prescriptionExists, setPrescriptionExists] = useState(false);
  const location = useLocation();
  const { bookingId } = location.state;
  console.log('bookingId', bookingId);

  useEffect(() => {
    // Check if a prescription exists for the given booking
    axios
      .get(`http://localhost:3000/doctor/viewprescription/${bookingId}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.prescriptionDetails === 'No prescriptions found') {
            // If 'No prescriptions found', set the state to indicate it
            setPrescriptionExists(false);
          } else {
            // If prescription details are found, set the state to indicate it
            setPrescriptionExists(true);
          }
        } else {
          // Handle non-200 status codes if needed
          console.error('Error checking prescription. Status:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error checking prescription:', error);
      });
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/doctor/addPrescription/${bookingId}`, {
        disease: formData.disease,
        tests: formData.tests,
        suggestions: formData.suggestions,
        medicine: formData.medicine,
      })
      .then((response) => {
        console.log('Prescription created:', response.data);
        // After creating the prescription, you can update the state or redirect as needed
      })
      .catch((error) => {
        console.error('Error creating prescription:', error);
      });
  };

  return (
    <div>
      <HeaderDoctor /> {/* Include the HeaderDoctor component */}
      <div className="mt-16">
        <div style={styles.prescriptionContainer}>
          {prescriptionExists ? (
            <p>Prescription already created for this booking.</p>
          ) : (
            <>
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
                  ></textarea>
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
                  ></textarea>
                </div>
                <button type="submit" style={styles.submitButton}>
                  Create Prescription
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
  
}

export default Prescription;
