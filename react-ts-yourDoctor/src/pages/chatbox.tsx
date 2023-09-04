import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Header from './navbar/header_user';
import Footer from './navbar/footer';

function Chatbox() {
  const location = useLocation();
  const { receiverName, bookingId, userId, serialNumber } = location.state;

  const [formData, setFormData] = useState<{
    message: string;
    booking_id: number;
  }>({
    message: '',
    booking_id: bookingId,
  });

  const [comments, setComments] = useState([]); // State to store previous comments

  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch previous comments for booking ID 2
    axios
      .post(`http://localhost:3000/comment/get/${userId}`, {
        booking_id: bookingId,
      })
      .then((res) => {
        setComments(res.data.result); // Store comments in state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, bookingId]); // Empty dependency array to fetch comments when the component mounts

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add a new comment for booking ID 2
      await axios
        .post(`http://localhost:3000/comment/add/${userId}`, formData)
        .then((res) => {
          console.log('Comment added successfully:', res.data);

          // Clear the comment input field
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log('Serial No: ', serialNumber);

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="fit-content p-20 ">
        <p className="text-gray-400">{receiverName}</p>
        <p className="text-gray-400 justify-right">{serialNumber}</p>
        <hr className="line-below-text my-4 border-t-2 border-red-300" />
      </div>

      <div className="flex px-20 pt-10">
        <div className="w-full rounded-md rounded-lg bg-gray-200 px-3 py-2 ">
          <div className="mb-8 mt-4">
            <p className="text-sm font-bold text-indigo-500">Comments:</p>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment.message}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 mt-4">
              <TextField
                type="text"
                id="message"
                name="message"
                placeholder="Add a new comment"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-md rounded-lg"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Chatbox;

