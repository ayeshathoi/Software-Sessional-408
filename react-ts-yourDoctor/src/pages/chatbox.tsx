import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
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
  const sender_id = userId;

  const [comments, setComments] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    axios
      .post(`http://localhost:3000/comment/get/${userId}`, {
        booking_id: bookingId,
      })
      .then((res) => {
        setComments(res.data.result);
        scrollToBottom(); // Scroll to the bottom when comments load
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, bookingId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/comment/add/${userId}`, formData);
      setFormData({ ...formData, message: '' }); // Clear the input field after sending
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll to the bottom of the chat container

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when new messages arrive
  }, [comments]);
  console.log('userId', userId);

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

      <div
        className="flex px-20 pt-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: '60vh',
          overflowY: 'scroll',
        }}
        ref={chatContainerRef}
      >
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`mb-4 ${
              comment.sender_id === userId ? 'text-right' : 'text-left'
            }`}
          >
            <span
              style={{
                backgroundColor:
                  comment.sender_id === userId ? '#007bff' : '#f0f0f0',
                color: comment.sender_id === userId ? '#fff' : '#333',
                borderRadius: '5px',
                padding: '5px 10px',
                display: 'inline-block',
                maxWidth: '70%',
              }}
            >
              {comment.message} (Sender ID: {comment.sender_id})
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', marginTop: '10px' }}
      >
        <TextField
          type="text"
          id="message"
          name="message"
          placeholder="Type a message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-md rounded-lg"
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Chatbox;

