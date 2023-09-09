import { useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { TextField, Button } from '@mui/material';
interface FormData {
  testname: string;
  price: number;
}

import { addTest } from '@/api/apiCalls';

function AddTest() {
  const [formData, setFormData] = useState<FormData>({
    testname: '',
    price: 0,
  });

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await axios
      //   .post(`http://localhost:3000/hospital/addtest`, formData)
      //   .then((res) => {
      //     alert('Test Added Successfully');
      //     navigate(`/hospitalHome`);
      //     // navigate korte homepage er ekta generic page e pathaite hobe
      //   });
      const res = await addTest(formData);
      if(res){
        alert('Test Added Successfully');
        navigate(`/hospitalHome`);
      }
      else {
        console.log("Error in adding test");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div
      className="flex flex-col items-center justify-center mt-36"
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg bg-green-50">
        <h1 style={{ fontWeight: 'bold', fontSize: '24px', color: 'Green' }}>
          Add Test
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4"
        >
          {/* <TextField
            label="Test Name"
            name="testname"
            value={formData.testname}
            onChange={handleChange}
            variant="outlined"
            required
            className="w-full"
          /> */}
          <select name="testname" 
          value={formData.testname}
          onChange={handleChange} 
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
            <option value="Select Test">Select Test</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            <option value="MRI">MRI</option>
            <option value="ECG">ECG</option>
            <option value="EEG">EEG</option>
            <option value="EMG">EMG</option>
            <option value="TMT">TMT</option>
            <option value="Endoscopy">Endoscopy</option>
            <option value="Colonoscopy">Colonoscopy</option>
            <option value="Laparoscopy">Laparoscopy</option>
            <option value="Biopsy">Biopsy</option>
            <option value="Mammography">Mammography</option>
            <option value="Cardiac Stress Test">Cardiac Stress Test</option>
            <option value="Bone Marrow Aspiration">Bone Marrow Aspiration</option>
            <option value="Lumbar Puncture">Lumbar Puncture</option>
            <option value="Angiography">Angiography</option>
            <option value="Angioplasty">Angioplasty</option>
            <option value="Cardiac Catheterization">Cardiac Catheterization</option>
            <option value="Cardiac Electrophysiology">Cardiac Electrophysiology</option>
            <option value="Cardiac Imaging">Cardiac Imaging</option>
            <option value="Cardiac MRI">Cardiac MRI</option>
            <option value="Cardiac Stress Test">Cardiac Stress Test</option>
            <option value="Cardiac Ultrasound">Cardiac Ultrasound</option>
            <option value="Cardiac CT">Cardiac CT</option>
            <option value="Cardiac CT Angiography">Cardiac CT Angiography</option>
            <option value="Cardiac PET">Cardiac PET</option>
            <option value="Doppler Ultrasound">Doppler Ultrasound</option>
            <option value="Echocardiogram">Echocardiogram</option>
            <option value="Electrocardiogram (EKG)">Electrocardiogram (EKG)</option>
            <option value="Electrophysiology Study">Electrophysiology Study</option>
            <option value="Holter Monitor">Holter Monitor</option>
            <option value="Nuclear Stress Test">Nuclear Stress Test</option>
            <option value="Stress Echocardiogram">Stress Echocardiogram</option>
            <option value="Tilt Table Test">Tilt Table Test</option>
            </select>


          <TextField
            label="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            required
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />

          <div className="col-span-2 flex justify-center">
            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTest;
