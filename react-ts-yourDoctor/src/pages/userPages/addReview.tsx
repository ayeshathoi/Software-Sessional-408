/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import HeaderDoctor from '../navbar/headerdoctor';
import Footer from '../navbar/footer';

import { addreview } from '@/api/apiCalls';

interface FormData {
  complaint_text: string;
  rating: number;
}

function AddReview() {
  const [formData, setFormData] = useState<FormData>({
    complaint_text: '',
    rating: 0,
  });

  const location = useLocation();
  const { receiverName, bookingId, serialNumber } = location.state;

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the JSON request body
    const requestData = {
      complaint_text: formData.complaint_text,
      rating: parseInt(formData.rating.toString(), 10),
    };

    console.log('request data', requestData);

    try {
      addreview(bookingId, requestData)
        .then(() => {
          alert('Review Added Successfully');
          navigate(`/userHome`);
        })
        .catch((error) => {
          console.error('Error adding review:', error);
        });
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
        <Paper elevation={3} className="p-4">
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Add Review for {receiverName}
          </Typography>
          <p>{serialNumber}</p>
          <form
            onSubmit={handleSubmit}
            className="w-full items-center justify-center mt-8"
          >
            {/* Form fields for updating timeline data */}
            <div className="flex justify-between mt-4">
              <TextField
                label="Complaint Text"
                name="complaint_text"
                type="text"
                value={formData.complaint_text}
                onChange={(e) =>
                  setFormData({ ...formData, complaint_text: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>
            <div className="flex justify-between mt-4">
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseInt(e.target.value, 10),
                  })
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
                Add Review
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

export default AddReview;
