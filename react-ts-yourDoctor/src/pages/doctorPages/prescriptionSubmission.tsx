import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

// Define the CSS styles as JavaScript objects
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
  const location = useLocation();
  const {bookingId}=location.state;
  console.log('bookingId',bookingId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend to create the prescription
    axios
      .post(` http://localhost:3000/doctor/addPrescription/${bookingId}`, {
        disease: formData.disease,
        tests: formData.tests,
        suggestions: formData.suggestions,
        medicine: formData.medicine,
      })
      .then((response) => {
        // Handle success, e.g., show a success message or redirect
        console.log('Prescription created:', response.data);
        // You can add code here to handle success, such as showing a success message or redirecting to another page.
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating prescription:', error);
        // You can add code here to handle the error, such as showing an error message to the user.
      });
  };

  return (
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
    </div>
  );
  
}

export default Prescription;
