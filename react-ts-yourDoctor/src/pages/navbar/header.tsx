/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';

function Navbar() {
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
            <Link to="ProfileOptions">
              <span className="text-sm font-semibold text-white">
                join or login into your account
              </span>
            </Link>
          </div>

          {/* Search bar on the right */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
