/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { viewPrescription, addprescription } from '@/api/apiCalls';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
// Define the CSS styles as JavaScript objects
const styles = {
  prescriptionContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '200px',
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
          alert('Prescription already exists for this booking.');
          navigate(`/doctorHome`);
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
      medicine: formData.medicine,
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
          {/* <input
            style={styles.input}
            type="text"
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
          /> */}
          <select
            style={styles.input}
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
          >
            <option value="">Select Disease</option>
            <option value="Fever">Fever</option>
            <option value="Headache">Headache</option>
            <option value="Cough">Cough</option>
            <option value="Cold">Cold</option>
            <option value="Diarrhea">Diarrhea</option>
            <option value="Vomiting">Vomiting</option>
            <option value="Stomachache">Stomachache</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          
          {/* <input
            style={styles.input}
            type="text"
            id="tests"
            name="tests"
            value={formData.tests}
            onChange={handleChange}
          /> */}
          <select
            style={styles.input}
            id="tests"
            name="tests"
            value={formData.tests}
            onChange={handleChange}
          >
            <option value="">Select Tests</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            <option value="MRI">MRI</option>
            <option value="ECG">ECG</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <select
            style={styles.input}
            id="suggestions"
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
          >
            <option value="">Select Suggestions</option>
            <option value="Take rest">Take rest</option>
            <option value="Drink plenty of water">Drink plenty of water</option>
            <option value="Take medicine">Take medicine</option>
            <option value="Take medicine after meal">
              Take medicine after meal
            </option>
            <option value="Take medicine before meal">
              Take medicine before meal
            </option>
            <option value="Take medicine twice a day">
              Take medicine twice a day
            </option>
            <option value="Take medicine thrice a day">
              Take medicine thrice a day
            </option>
            <option value="Take medicine once a day">
              Take medicine once a day
            </option>
            <option value="Take medicine for 3 days">
              Take medicine for 3 days
            </option>
            <option value="Take medicine for 5 days">
              Take medicine for 5 days
            </option>
            <option value="Take medicine for 7 days">
              Take medicine for 7 days
            </option>
            <option value="Take medicine for 10 days">
              Take medicine for 10 days
            </option>
            </select>
        </div>
        <div style={styles.formGroup}>
          <select
            style={styles.input}
            id="medicine"
            name="medicine"
            value={formData.medicine}
            onChange={handleChange}
          >
            <option value="">Select Medicine</option>
            <option value="Paracetamol">Paracetamol</option>
            <option value="Aspirin">Aspirin</option>
            <option value="Ibuprofen">Ibuprofen</option>
            <option value="Naproxen">Naproxen</option>
            <option value="Diclofenac">Diclofenac</option>
            <option value="Celecoxib">Celecoxib</option>
            <option value="Acetaminophen">Acetaminophen</option>
            <option value="Others">Others</option>
          </select>

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
