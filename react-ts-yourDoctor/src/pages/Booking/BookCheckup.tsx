/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function BookCheckup() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { selectedTests, combinedPrice, selectedHospital, userId } =
    location.state;

  // const { userid } = userId;

  const [formData, setFormData] = useState<{
    patient_mobile: string;
    date: string;
    time: string;
    payment_method: string;
    price: number;
    payment_status: string;
    hospital_name: string;
    test_names: unknown;
  }>({
    patient_mobile: '',
    date: '',
    time: '',
    payment_method: '',
    price: parseInt(combinedPrice, 10),
    payment_status: '',
    hospital_name: selectedHospital,
    test_names: selectedTests,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update payment_status based on payment_Method
    const paymentStatus =
      value === 'Cash' ? 'Pending' : value !== '' ? 'paid' : '';

    // const hospitalname = value === 'Online' ? null : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      payment_status: paymentStatus,
      // hospital_name: hospitalname,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log('here is the form', formData);
      const formattedTime = format(new Date(formData.time), 'HH:mm:ss');
      const formattedDate = format(new Date(formData.date), 'yyyy-MM-dd');
      const testNamesArray = JSON.parse(selectedTests);
      const dataToSend = {
        ...formData,
        date: formattedDate,
        time: formattedTime,
        test_names: testNamesArray,
      };
      console.log('here is the form', dataToSend);
      console.log('userrrridd', userId);
      await axios
        .post(`http://localhost:3000/booking/${userId}/checkup`, dataToSend)
        .then((res) => {
          console.log('here is the form', res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTimeChange = (time: any) => {
    setFormData((prevData) => ({ ...prevData, time }));
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-above-line my-10 text-left p-20">
          <p className="text-gray-400">Test Booking</p>
          <hr className="line-below-text my-4 border-t-2 border-gray-300" />

          <Grid container>
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <h1 className="text-sm font-bold text-green-500">
                  {selectedHospital}
                </h1>
                <hr />

                <div className="mb-8 mt-8">
                  <TextField
                    type="text"
                    id="patient_mobile"
                    name="patient_mobile"
                    label="Mobile no."
                    value={formData.patient_mobile}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md rounded-lg"
                  />
                </div>
                <div className="mb-8">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={formData.date}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mb-8">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Time"
                      value={formData.time}
                      onChange={handleTimeChange}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="text-sm font-bold text-green-500"
                  >
                    Tests: {selectedTests}
                  </Typography>
                </div>
                <label className="text-sm text-gray-300">Meeting type</label>
                <div className="mb-8">
                  <div className="mt-4">
                    <Typography
                      variant="h6"
                      className="text-sm font-bold text-green-500"
                    >
                      Visit Fee: {formData.price}
                    </Typography>
                    <hr />
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="p-4 ml-14 w-25">
                <h1 className="text-sm font-bold text-green-500">
                  Choose Payment Method
                </h1>
                <hr />
                <FormControl component="fieldset">
                  <RadioGroup
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="Cash"
                      className="mt-4"
                    />
                    <FormControlLabel
                      value="Bkash"
                      control={<Radio />}
                      label="Bkash"
                      className="mt-4"
                    />
                    <FormControlLabel
                      value="Nagad"
                      control={<Radio />}
                      label="Nagad"
                      className="mt-4"
                    />
                    <FormControlLabel
                      value="Rocket"
                      control={<Radio />}
                      label="Rocket"
                      className="mt-4"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            color="success"
            className="text-lg rounded-lg py-1.5"
            // onClick={() => navigate(-1)}
          >
            Confirm
          </Button>
        </div>
      </form>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default BookCheckup;
