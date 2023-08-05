/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';

function HeaderDoctor() {
  return (
    <nav>
      <div className="flex items-center justify-between fixed top-0 z-30 w-full py-2 bg-indigo-300">
        <div className="flex items-center w-5/6 mx-auto">
          <div>
            <Link to="/">
              <img alt="logo" src={Logo} className="h-10" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderDoctor;
