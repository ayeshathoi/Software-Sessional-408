/* eslint-disable react/no-array-index-key */
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Select,
} from '@mui/material';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';
import { addSchedule_Doctor } from '@/api/apiCalls';


const generateTimeOptions = () => {
  const options = [];
  // eslint-disable-next-line no-plusplus
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const hh = hour.toString().padStart(2, '0');
      const mm = minute.toString().padStart(2, '0');
      options.push(`${hh}:${mm}:00`);
    }
  }
  return options;
};

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];


interface FormData {
  weekday: string;
  slot: number;
  end_time: string;
  hospital_name: string;
  start_time: string;
  hospital_names: string[];
  timeline: {
    weekday: string;
    slot: number;
    start_time: string;
    end_time: string;
    hospital_name: string;
  }[];
}

function AddSchedule() {
  const [formData, setFormData] = useState<FormData>({
    start_time: '',
    end_time: '',
    slot: 0,
    weekday: '',
    hospital_name: '',
    hospital_names: [],
    timeline: [], // Initialize an empty timeline array
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospitalNames = searchParams.get('hospitals');
  // const hospitals = hospitalNames ? JSON.parse(hospitalNames) : [];

  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [numberOfDays, setNumberOfDays] = useState<number | string>('');
  const navigator = useNavigate();

  useEffect(() => {
    if (hospitalNames) {
      const hospitalNamesArray = JSON.parse(hospitalNames);
      setFormData((prevFormData) => ({
        ...prevFormData,
        hospital_names: hospitalNamesArray,
      }));
    }
  }, [hospitalNames]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the desired JSON structure
    const requestData = {
      timeline: formData.timeline.map((entry) => ({
        weekday: entry.weekday,
        slot: parseInt(entry.slot.toString(), 10),
        start_time: entry.start_time,
        end_time: entry.end_time,
        hospital_name: entry.hospital_name,
      })),
    };

    try {
      const ret = await addSchedule_Doctor(requestData); // Use the api call from apiCalls.tsx
      navigator('/doctorHome');
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTimeline = () => {
    // Check if the selectedHospital and numberOfDays are valid
    if (!selectedHospital || !numberOfDays) {
      return;
    }

    // Construct the timeline entries based on the selected number of days
    const generatedTimeline = [...Array(Number(numberOfDays))].map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_, index) => ({
        weekday: formData.weekday,
        slot: parseInt(formData.slot.toString(), 10),
        start_time: formData.start_time,
        end_time: formData.end_time,
        hospital_name: selectedHospital,
      })
    );

    // Add the generated timeline entries to the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeline: [...prevFormData.timeline, ...generatedTimeline],
    }));

    // Clear the input fields
    setFormData((prevFormData) => ({
      ...prevFormData,
      weekday: '',
      slot: 0,
      start_time: '',
      end_time: '',
    }));
  };

  const handleTimelineChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedTimeline = [...formData.timeline];

    // Make sure the timeline entry exists at the specified index
    if (!updatedTimeline[index]) {
      updatedTimeline[index] = {
        weekday: '',
        slot: 0,
        start_time: '',
        end_time: '',
        hospital_name: '', // Add this line to initialize hospital_name
      };
    }

    // Update the corresponding property in the timeline entry
    updatedTimeline[index][name.split('-')[0]] = value;

    // Set the updated timeline in the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeline: updatedTimeline,
    }));
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-36">
        <Paper elevation={3} className="p-4">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="primary"
            gutterBottom
          >
            Add Schedule
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="w-full items-center justify-center mt-8"
          >
            <div className="flex justify-between mt-8 text-gray-300">
              <label htmlFor="weekday">Select Hospital </label>
              </div>
            <div className="flex justify-between mt-4">
              <Select
                label="Select Hospital"
                name="hospital_name"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value as string)}
                variant="outlined"
                required
                fullWidth
              >
                {formData.hospital_names.map((hospitalName, index) => (
                  <MenuItem key={index} value={hospitalName}>
                    {hospitalName}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-between mt-8 text-gray-300">
              <label htmlFor="weekday">Number of days</label>
              </div>
            <div className="flex justify-between text-black">
              <Select
                label="Number of Days"
                name="number_of_days"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value as string)}
                variant="outlined"
                required
                fullWidth
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <MenuItem key={index} value={String(index + 1)}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Grid container spacing={2}>
              {formData.timeline.map((entry, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="h6">{`Timeline for Day ${
                    index + 1
                  }`}</Typography>
                  <div className="flex justify-between mt-4">
                    <Select
                      label="Weekday"
                      name={`weekday-${index}`}
                      value={entry.weekday}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {weekdays.map((day, dayIndex) => (
                        <MenuItem key={dayIndex} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="Slot"
                      name={`slot-${index}`}
                      type="number"
                      value={entry.slot}
                      variant="outlined"
                      onChange={(e) => handleTimelineChange(e, index)}
                      required
                      fullWidth
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Select
                      label="Start Time"
                      name={`start_time-${index}`}
                      value={entry.start_time}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {generateTimeOptions().map((timeOption, timeIndex) => (
                        <MenuItem key={timeIndex} value={timeOption}>
                          {timeOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Select
                      label="End Time"
                      name={`end_time-${index}`}
                      value={entry.end_time}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {generateTimeOptions().map((timeOption, timeIndex) => (
                        <MenuItem key={timeIndex} value={timeOption}>
                          {timeOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="contained"
                color="success"
                onClick={handleAddTimeline}
                className="mt-16 ml-4"
              >
                Add Timeline
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="mt-4 ml-10"
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default AddSchedule;
