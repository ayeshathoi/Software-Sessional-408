/* eslint-disable import/extensions */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import User from '@/assets/user.webp';
import Footer from '../navbar/footer';
import Header from '../navbar/header_user';
import AppointmentImage from '@/assets/appointment.jpg';
import AmbulanceImage from '@/assets/ambulance.jpg';
import HealthCheckImage from '@/assets/healthcheckhome.jpg';
import Ambulances from './ambulance';
import Appointments from './appointments';
import Tests from './tests';
import { selectNotifications } from '@/store/notificationsSlice';
import { patient_profile } from '@/api/apiCalls';

type NotificationItem = {
  message: string;
};

function UserHome() {
  const [user, setUser] = useState({
    uname: '',
    email: '',
    uid: 0,
  });

  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    patient_profile().then((patient_profile_list) => {
      if (patient_profile_list) {
        setUser(patient_profile_list[0]);
        user.uname = patient_profile_list[0].uname;
        user.email = patient_profile_list[0].email;
        user.uid = patient_profile_list[0].uid;
      } else {
        console.log('No Profile Found');
      }
    });
  }, [user]);

  const notificationStorageKey = `notifications_${user.uid}`;

  const notifications = useSelector(
    selectNotifications
  ) as unknown as NotificationItem[];

  const initialNotificationList =
    JSON.parse(localStorage.getItem(notificationStorageKey)) || [];

  const [notificationlist, setNotificationlist] = useState<string[]>(
    initialNotificationList
  );
  const [showNotifications, setShowNotifications] = useState(false);

  const addNotificationToLocalStorage = (notification: string) => {
    // Check if the notification already exists in the list
    if (!notificationlist.includes(notification)) {
      const updatedNotifications = [...notificationlist, notification];
      localStorage.setItem(
        notificationStorageKey,
        JSON.stringify(updatedNotifications)
      );
      setNotificationlist(updatedNotifications);
    }
  };
  useEffect(() => {
    // Store notifications in local storage whenever 'notifications' prop changes
    notifications.forEach((notification) => {
      addNotificationToLocalStorage(notification.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, notificationStorageKey]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleToggleNotifications = () => {
    setShowNotifications((prevState) => !prevState); // Toggle the showNotifications state
  };

  const handleDeleteNotification = (indexToDelete: number) => {
    const updatedNotifications = [...notificationlist];
    updatedNotifications.splice(indexToDelete, 1); // Remove the notification at the specified index

    // Update the notificationlist state
    setNotificationlist(updatedNotifications);

    // Update the local storage to remove the deleted notification
    localStorage.setItem(
      notificationStorageKey,
      JSON.stringify(updatedNotifications)
    );
  };

  const handleClearNotifications = () => {
    // Clear notifications from local storage
    localStorage.removeItem(notificationStorageKey);

    // Clear the notificationlist state
    setNotificationlist([]);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex ml-24 mt-4">
        <Tooltip title="Notifications">
          <Button
            onClick={handleToggleNotifications} // Toggle notifications when the button is clicked
            color="success"
            variant="contained"
          >
            {showNotifications ? (
              <NotificationsOffIcon /> // Render the icon when showNotifications is true
            ) : (
              <NotificationsActiveTwoToneIcon /> // Otherwise, show the text
            )}
          </Button>
        </Tooltip>
        <div className="ml-4">
          <Paper elevation={1}>
            {showNotifications && (
              <div>
                {notificationlist.map((notification, index) => (
                  <div key={index} className="notification">
                    {notification}
                    <Tooltip title="Delete">
                      <Button
                        color="error"
                        onClick={() => handleDeleteNotification(index)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <ClearIcon />
                      </Button>
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}
          </Paper>
        </div>
        <div className="ml-6">
          <Tooltip title="Clear Notifications">
            <Button
              onClick={handleClearNotifications}
              color="error"
              variant="outlined"
            >
              <DeleteForeverTwoToneIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="flex mt-40 ml-24">
        <div className="w-1/4 p-4 bg-green-100 border-r border-gray-300">
          {/* User information */}
          <div className="text-center mb-10">
            <img
              src={User}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Name:{user.uname}</h2>
            <p className="text-gray-500">Email:{user.email}</p>
            <p>User</p>
          </div>

          {/* Tabs */}
          <Paper elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="vertical tabs example"
              className="bg-white rounded-lg shadow"
            >
              <Tab label="Appointments" />
              <Tab label="Ambulance" />
              <Tab label="Health Check" />
              <div className="flex justify-center mr-10">
                <Link to="PatientProfileUpdate">
                  <Tab label="Edit Profile" />
                </Link>
              </div>
            </Tabs>
          </Paper>
        </div>
        <Box flexGrow={3} className="p-8">
          {/* Tab content */}
          {value === 0 && (
            <div>
              <img
                src={AppointmentImage}
                alt="Appointments"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <Appointments />
              {/* Add content related to appointments */}
            </div>
          )}
          {value === 1 && (
            <div>
              <img
                src={AmbulanceImage}
                alt="Ambulance"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Ambulance Order</h2>
              {/* Add content related to ambulance */}
              <Ambulances />
            </div>
          )}
          {value === 2 && (
            <div>
              <img
                src={HealthCheckImage}
                alt="Health Check"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Health Check</h2>
              <Tests />
              {/* Add content related to health check */}
            </div>
          )}
        </Box>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
