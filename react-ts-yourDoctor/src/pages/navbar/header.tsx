/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, useState } from 'react';
import Logo from '@/assets/Logo.png';

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
      <div className="flex items-center justify-between fixed top-0 z-30 w-full py-2 bg-indigo-300">
        <div className="flex items-center w-5/6 mx-auto">
          <div>
            <Link to="/">
              <img alt="logo" src={Logo} className="h-10" />
            </Link>
          </div>
          {/* Search bar on the right */}
          <form className="flex-grow-0 flex-shrink-0 ml-auto mt-2">
            <div className="max-w-m">
              <div className="flex space-x-4">
                <div className="flex-grow flex flex-row w-full">
                  <input
                    type="text"
                    placeholder="Search by Specialization.."
                    value={searchValue}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md rounded-r-none bg-fuchsia-300 px-10 py-2 h-15"
                  />
                  <button
                    type="submit"
                    onClick={handleSearchIconClick}
                    className=" text-white px-2.5 text-lg font-semibold bg-pink-600 py-2 h-15"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
