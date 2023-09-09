import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { TextField, Button, Typography } from '@mui/material';
import Header from '../navbar/loginHeader';
import Footer from '../navbar/footer';
import { getComments_Chatbox, addComment_Chatbox } from '@/api/apiCalls';

interface Comments {
  msg_id: number;
  booking_id: number;
  sender_id: number;
  message: string;
  timestamp: string;
  viewer_id: number;
}

// user_id anar bebostha korte hobe user api diye select uid from users mere deya jay

function Chatbox() {
  const location = useLocation();
  const { receiverName, bookingId, serialNumber } = location.state;
  if (!serialNumber) {
    console.log('Chat with nurse');
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    message: string;
    booking_id: number;
  }>({
    message: '',
    booking_id: bookingId,
  });

  const [comments, setComments] = useState<Comments[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    getComments_Chatbox(bookingId).then((res) => {
      if (res) {
        const sortedComments = res.result.sort(
          (a: Comments, b: Comments) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setComments(sortedComments);
        scrollToBottom();
        navigate('/chatbox', {
          state: { receiverName, bookingId, serialNumber },
        });
      } else {
        console.log('No Comments Found');
      }
    });
  }, [bookingId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addComment_Chatbox(formData);
      if (res) {
        getComments_Chatbox(bookingId).then((res) => {
          if (res) {
            const sortedComments = res.result.sort(
              (a: Comments, b: Comments) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            setComments(sortedComments);
            scrollToBottom();
          } else {
            console.log('No Comments Found');
          }
        });
      }
      
      setFormData({ ...formData, message: '' });
      //back korle navigate to homepage

    } catch (err) {
      console.log(err);
    }
  };


  // Scroll to the bottom of the chat container
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="fit-content p-40 mx-auto px-20  ">
        <div className="header-container bg-green-400 p-4 flex justify-between items-center">
          <Typography className="receiver-name text-white text-2xl">
            Chat with {receiverName}
          </Typography>
          <Typography
            className={`mb-4 ${
              serialNumber ? 'text-white text-2xl' : 'hidden'
            }`}
          >
            Serial number : {serialNumber}
          </Typography>
        </div>
      </div>

      <div
        className="px-20 h-96 overflow-y-auto border-gray-300"
        ref={chatContainerRef}
      >
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`mb-4 ${
              comment.sender_id === comment.viewer_id
                ? 'text-right'
                : 'text-left'
            }`}
          >
            <Box
              style={{
                backgroundColor:
                  comment.sender_id === comment.viewer_id
                    ? '#89CFF0'
                    : '#008000',
                borderRadius: '5px',
                padding: '5px 10px',
                display: 'inline-block',
                maxWidth: '70%',
                color: 'white',
              }}
            >
              {comment.message}
              <Typography variant="body2">
                {comment.timestamp.split('T')[1].split('.')[0]},
                {comment.timestamp.split('T')[0]}
              </Typography>
            </Box>
          </div>
        ))}
      </div>

      <div className="flex px-20 pb-10 justify-between items-center">
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', marginTop: '2px' }}
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
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default Chatbox;
