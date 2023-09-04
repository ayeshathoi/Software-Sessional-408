import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import Navbar from '../navbar/header';
import Footer from '../navbar/footer';

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

  const navigate = useNavigate();
  const { userid } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospitalNames = searchParams.get('hospitals');

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
        slot: parseInt(entry.slot, 10),
        start_time: entry.start_time,
        end_time: entry.end_time,
        hospital_name: entry.hospital_name,
      })),
    };
    console.log(`${userid}`, requestData);

    try {
      // Send a POST request with the updated formData in JSON format
      await axios.post(
        `http://localhost:3000/doctor/addschedule/${userid}`,
        requestData
      );

      // Navigate to the desired page on successful submission
      navigate('/LogIn');
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTimeline = () => {
    // Construct the timeline entry based on user input
    const timelineEntry = {
      weekday: formData.weekday,
      slot: formData.slot,
      start_time: formData.start_time,
      end_time: formData.end_time,
      hospital_name: formData.hospital_name,
    };

    // Add the timeline entry to the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeline: [...prevFormData.timeline, timelineEntry],
    }));

    // Clear the input fields
    setFormData((prevFormData) => ({
      ...prevFormData,
      weekday: '',
      slot: 0,
      start_time: '',
      end_time: '',
      hospital_name: '',
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
            className="w-full items-center justify-center"
          >
            <Grid container spacing={2}>
              {formData.hospital_names.map((hospitalName, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="h6">{`Timeline for ${hospitalName}`}</Typography>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="Weekday"
                      name={`weekday-${index}`}
                      value={formData.timeline[index]?.weekday || ''}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="Slot"
                      name={`slot-${index}`}
                      type="number"
                      value={formData.timeline[index]?.slot.toString() || ''}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="Start Time"
                      name={`start_time-${index}`}
                      value={formData.timeline[index]?.start_time || ''}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="End Time"
                      name={`end_time-${index}`}
                      value={formData.timeline[index]?.end_time || ''}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <TextField
                      label="Hospital Name"
                      name={`hospital_name-${index}`}
                      value={formData.timeline[index]?.hospital_name || ''}
                      onChange={(e) => handleTimelineChange(e, index)}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className="flex justify-between mt-4">
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
