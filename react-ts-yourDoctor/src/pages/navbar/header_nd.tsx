/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchIconClick = () => {
    // Implement the logic to handle the search icon click if needed
    // console.log('Search icon clicked');
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

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
