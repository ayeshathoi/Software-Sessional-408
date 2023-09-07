/* eslint-disable import/extensions */
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Toolbar } from '@mui/material';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import Header from '@/pages/navbar/header.tsx';
import { logout } from '@/api/apiCalls';

function HeaderUser() {
  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Header />
      <p>&</p>
      <div className="mt-14 bg-green-100">
        <Toolbar disableGutters className="flex items-center justify-between ml-24">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="DoctorSearch" className="mx-4 text-magenta-900 font-bold text-lg mr-4 hover:underline">
              <Button variant="contained" color="inherit">
                Book New Appointment
              </Button>
            </Link>
            <Link to="CheckupSearch" className="text-magenta-900 font-bold text-lg mr-4 hover:underline">
              <Button variant="contained" color="inherit">
                New HealthCheck Service
              </Button>
            </Link>
            <Link to="AmbulanceSearch" className="text-magenta-900 font-bold text-lg mr-4 hover:underline">
              <Button variant="contained" color="inherit">
                New Ambulance Service
              </Button>
            </Link>
          </Box>
          <div className="mr-24 font-bold">
            <Button variant="contained" color="inherit" onClick={handleLogout}>
              <PersonRemoveSharpIcon />
            </Button>
          </div>
        </Toolbar>
      </div>
    </div>
  );
}

export default HeaderUser;
