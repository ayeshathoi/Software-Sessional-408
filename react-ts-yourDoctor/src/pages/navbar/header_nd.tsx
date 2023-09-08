/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import { Button, Tooltip } from '@mui/material';
import { logout } from '@/api/apiCalls';

function Navbar() {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <nav>
      <div className="flex items-center justify-between fixed top-0 z-30 w-full py-2 bg-green-300">
        <div className="flex items-center w-5/6 mx-auto">
          <div>
            <Link to="/">
              <span className="text-2xl font-semibold text-white">
                yourDoctor
              </span>
            </Link>
            <div className="flex-grow-0 flex-shrink-0 ml-auto mt-2" />
          </div>
          <div className="mr-24 font-bold ml-auto">
            <Tooltip title="Logout">
              <Button
                variant="contained"
                color="inherit"
                onClick={handleLogout}
              >
                <PersonRemoveSharpIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
