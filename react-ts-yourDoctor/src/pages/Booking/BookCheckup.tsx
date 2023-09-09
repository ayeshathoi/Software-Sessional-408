/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent } from 'react';
import { format } from 'date-fns';
import { useNavigate,useLocation } from 'react-router-dom';
import { bookCheckup } from '@/api/apiCalls';
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
import Header from '../navbar/header_nd';
import Footer from '../navbar/footer';
function BookCheckup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTests, combinedPrice, selectedHospital} =
    location.state;

  var alltests = JSON.parse(selectedTests)
  var alltestsname = alltests.map((test: any) => test)
  var list = " "
  for (let i = 0; i < alltestsname.length; i++) {
    if(i == alltestsname.length-1){
      list = list + alltestsname[i]
    }
    else{
      list = list + alltestsname[i] + ", "
    }
  }


  const endTimeForHospital = format(new Date("2021-10-10T16:00:00.000Z"), 'HH:mm:ss');
  const startTimeForHospital = format(new Date("2021-10-10T02:00:00.000Z"), 'HH:mm:ss');

  const [formData, setFormData] = useState<{
    patient_mobile: string;
    date: string;
    time: string;
    end_time: string;
    payment_method: string;
    price: number;
    payment_status: string;
    hospital_name: string;
    test_names: unknown;
  }>({
    patient_mobile: '',
    date: '',
    time: '',
    end_time: '',
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
      const formattedEndTime = format(new Date(formData.end_time), 'HH:mm:ss');
      if (formattedDate < format(new Date(), 'yyyy-MM-dd')) {
        alert('Date must be greater than today');
        return;
      }
      if (formattedTime > formattedEndTime) {
        alert('End time must be greater than start time');
        return;
      }

     
      if(formattedTime < startTimeForHospital || formattedEndTime > endTimeForHospital){
        alert('Hospital is open from 8am to 10pm');
        return;
      }

      const testNamesArray = JSON.parse(selectedTests);
      const dataToSend = {
        ...formData,
        date: formattedDate,
        end_time: formattedEndTime,
        time: formattedTime,
        test_names: testNamesArray,
      };
      const res = await bookCheckup(dataToSend);
        alert('If Hospital confirms your booking, req will be shown in your chekcup list');
        navigate('/userHome')

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
  const handleEndTimeChange = (end_time: any) => {
    setFormData((prevData) => ({ ...prevData, end_time }));
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
                  {selectedHospital} is open from 8am to 10pm
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
                      label="Start time"
                      value={formData.time}
                      onChange={handleTimeChange}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mb-8">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="End Time"
                      value={formData.end_time}
                      onChange={handleEndTimeChange}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="text-sm font-bold text-gray-500"
                  >
                    Tests: {list}
                  </Typography>
                </div>
                <div className="mb-8">
                  <div className="mt-4">
                    <Typography
                      variant="h6"
                      className="text-sm font-bold text-gray-500"
                    >
                      Checkup Fee : {formData.price}
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
                      label="Cash On delivery"
                      className="mt-4"
                    />
                    {/* <FormControlLabel
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
                    /> */}
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
