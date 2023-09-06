/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  MenuItem,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Select,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import Header from '../navbar/header';
import Footer from '../navbar/footer';

function BookDoctor() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { doctorName, doctorId, newPatientFee, hospitalName, userId } =
    location.state;

  // const { userid } = userId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    patient_mobile: string;
    date: string;
    selectedTime: string;
    payment_method: string;
    price: number;
    payment_status: string;
    doctor_id: unknown;
    weekday: string;
    hospital_name: string | null; // Explicitly define the type as string or null
  }>({
    patient_mobile: '',
    date: '',
    selectedTime: '',
    payment_method: '',
    price: parseInt(newPatientFee, 10),
    payment_status: '',
    doctor_id: doctorId,
    weekday: '',
    hospital_name: ' ', // Initialize hospital_name as an empty string
  });

  const [timetable, setTimetable] = useState([]);

  const [selectedWeekday, setSelectedWeekday] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor/timeline/${doctorId}`)
      .then((res) => {
        setTimetable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doctorId]);

  const filteredTimetable = timetable.filter((item) => {
    if (selectedWeekday === null) return false;
    return (
      item.weekday.toLowerCase() === selectedWeekday.toLowerCase() &&
      item.hospital_name === hospitalName
    );
  });
  const availableWeek = [];
  const filteredSerialArray = [];
  for (let i = 0; i < filteredTimetable.length; i++) {
    for (let j = 0; j < filteredTimetable[i].serial.length; j++) {
      filteredSerialArray.push(filteredTimetable[i].serial[j]);
    }
  }

  for (let i = 0; i < timetable.length; i++) {
    if (timetable[i].hospital_name === hospitalName)
      availableWeek.push(timetable[i].weekday);
  }

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
      // Format time to "hh:mm A" (e.g., "10:00 AM")
      // const formattedTime = format(new Date(formData.time), 'hh:mm a');

      // Format date to "yyyy-MM-dd" (e.g., "2021-02-02")
      const formattedDate = format(new Date(formData.date), 'yyyy-MM-dd');
      // Create the data object with the formatted values
      const dataToSend = {
        price: formData.price,
        time: formData.selectedTime,
        date: formattedDate,
        payment_method: formData.payment_method,
        payment_status: formData.payment_status,
        patient_mobile: formData.patient_mobile,
        doctor_id: formData.doctor_id,
        hospital_name: formData.hospital_name,
        weekday: selectedWeekday,
      };

      console.log('frontend Request', dataToSend);
      var status = true;
      await axios
        .post(`http://localhost:3000/booking/${userId}/appointment`, dataToSend)
        .then((res) => {
          console.log('Backend Response', res);
          if (res.data === 'This serial is already booked.') {
            alert('Slot is already booked. try another slot');
            status = false;
            console.log('status', status);
          }
        });
    } catch (err) {
      console.log(err);
    }
    if (status == true) navigate(`/userHome/${userId}/`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTimeChange = (time: any) => {
    setFormData((prevData) => ({ ...prevData, time }));
  };

  // ... previous code ...

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, date }));
    const selectedDate = new Date(date);
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const weekdayIndex = selectedDate.getDay();
    const weekdayName = weekdays[weekdayIndex];
    setSelectedWeekday(weekdayName);
    formData.weekday = weekdayName;
    console.log('hello', formData.weekday);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-above-line my-10 text-left p-20">
          <p className="text-gray-400">Doctor Appointment Booking</p>
          <hr className="line-below-text my-4 border-t-2 border-gray-300" />

          <Grid container>
            <Grid item xs={12} md={6}>
              <Paper className="p-4">
                <h1 className="text-sm font-bold text-green-500">
                  Dr. {doctorName}
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
                  {availableWeek.length > 0 && (
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-bold text-green-500"
                    >
                      Available Days:{' '}
                      {availableWeek.map((item) => (
                        <label key={item}>{item}</label>
                      ))}
                    </Typography>
                  )}
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
                <div>
                  {selectedWeekday && (
                    <p className="text-sm text-gray-300">
                      Selected Weekday: {selectedWeekday}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="text-sm text-gray-300">Select Time</label>
                  <Select
                    name="selectedTime"
                    value={formData.selectedTime}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        selectedTime: e.target.value as string,
                      }))
                    }
                    className="w-full rounded-md rounded-lg"
                  >
                    <MenuItem value="">Select a time</MenuItem>
                    {filteredSerialArray.map((item) => (
                      <MenuItem key={item.serial} value={item.time}>
                        {item.time} , Serial : {item.serial}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <label className="text-sm text-gray-300">Hospital Name</label>
                <div className="mb-8">
                  <RadioGroup
                    row
                    name="hospital_name"
                    value={formData.hospital_name}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={hospitalName}
                      control={<Radio />}
                      label={hospitalName}
                    />
                  </RadioGroup>

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

export default BookDoctor;
