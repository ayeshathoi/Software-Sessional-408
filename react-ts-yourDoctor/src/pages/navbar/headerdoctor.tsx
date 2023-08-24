/* eslint-disable import/extensions */
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { Box, Button, Toolbar } from '@mui/material';
import Header from '@/pages/navbar/loginHeader.tsx';

function HeaderUser() {
  return (
    <div>
      <Header />
      <p>&</p>
      <div className="mt-14 bg-green-100">
        <Toolbar
          disableGutters
          className="flex items-center justify-between ml-24"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to="DoctorSearch"
              className="mx-4 text-magenta-900 font-bold text-lg mr-4 hover:underline"
            >
              <Button variant="contained" color="inherit">
                Add your weekly schedule
              </Button>
            </Link>
            <Link
              to="CheckupSearch"
              className="text-magenta-900 font-bold text-lg mr-4 hover:underline"
            >
              <Button variant="contained" color="inherit">
                Edit your schedule
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </div>
    </div>
  );
}
export default HeaderUser;
