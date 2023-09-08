/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import { Button, Tooltip } from '@mui/material';
import { logout } from '@/api/apiCalls';

function HeaderDoctor() {
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
        <div className="flex items-center w-5/6 mx-auto h-14">
          <div>
            <Link to="/">
              <span className="text-2xl font-semibold text-white">
                yourDoctor
              </span>
            </Link>
          </div>
          <div className="font-bold ml-auto mr-60">
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

export default HeaderDoctor;
