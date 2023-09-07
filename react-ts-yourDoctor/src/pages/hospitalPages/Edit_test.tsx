import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

interface FormData {
  testname: string;
  price: number;
}

function EditTest() {
  const { userid } = useParams();
  const { testID } = useParams();
  const [formData, setFormData] = useState<FormData>({
    testname: '',
    price: 0,
  });

  useEffect(() => {
    // Make the HTTP GET tests to the backend API
    axios
      .get(`http://localhost:3000/hospital/test/${userid}/${testID}`)
      // api call
      .then((response) => {
        setFormData({
          testname: response.data[0].testname,
          price: response.data[0].price,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userid]);

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:3000/hospital/updateprice/${userid}`, formData)
        .then((res) => {
          console.log(formData);
          alert('Test Updated Successfully');
          navigate(`/hospitalHome/${userid}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
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
            Edit Test
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
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default EditTest;
