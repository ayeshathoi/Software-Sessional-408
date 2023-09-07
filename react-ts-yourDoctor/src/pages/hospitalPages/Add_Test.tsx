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
          <TextField
            label="Test Name"
            name="testname"
            value={formData.testname}
            onChange={handleChange}
            variant="outlined"
            required
            className="w-full"
          />

          <TextField
            label="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            required
            className="w-full"
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
