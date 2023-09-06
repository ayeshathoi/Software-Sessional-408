import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { color } from 'framer-motion';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

interface FormData {
  weekday: string;
  slot: number;
  end_time: string;
  start_time: string;
}

function EditSchedule() {
  const [formData, setFormData] = useState<FormData>({
    start_time: '',
    end_time: '',
    slot: 0,
    weekday: '',
  });

  const location = useLocation();

  const { userid, timelineId } = useParams();
  console.log('heerrrrr', userid, timelineId);

  const queryParams = new URLSearchParams(location.search);
  const weekdayParam = queryParams.get('weekday');
  const hospitalNameParam = queryParams.get('hospital_name');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the JSON request body
    const requestData = {
      weekday: formData.weekday,
      slot: parseInt(formData.slot.toString(), 10),
      start_time: formData.start_time,
      end_time: formData.end_time,
    };

    console.log('request data', requestData);

    try {
      // Send a POST request to update the timeline
      await axios.post(
        `http://localhost:3000/doctor/update-Schedule/${timelineId}`,
        requestData
      );

      // Navigate or show a success message as needed
      navigate(`/doctorHome/${userid}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <HeaderDoctor />
      </div>
      <div className="flex flex-col items-center justify-center mt-36">
        <p className="mb-4 text-gray-500">
          Edit the schedule of {weekdayParam} of hospital {hospitalNameParam}
        </p>

        <Paper elevation={3} className="p-4">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="primary"
            gutterBottom
          >
            Update Schedule
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="w-full items-center justify-center mt-8"
          >
            {/* Form fields for updating timeline data */}
            <div className="flex justify-between mt-4">
              <TextField
                label="Weekday"
                name="weekday"
                type="text"
                value={formData.weekday}
                onChange={(e) =>
                  setFormData({ ...formData, weekday: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>
            <div className="flex justify-between mt-4">
              <TextField
                label="Slot"
                name="slot"
                type="number"
                value={formData.slot}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slot: parseInt(e.target.value, 10),
                  })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>
            <div className="flex justify-between mt-4">
              <TextField
                label="Start Time"
                name="start_time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>
            <div className="flex justify-between mt-4">
              <TextField
                label="End Time"
                name="end_time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-between mt-8">
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="mt-4 ml-10"
              >
                Update Schedule
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default EditSchedule;
