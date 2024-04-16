import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { UserContext } from "./../contexts/userContext";
import { debounce } from '../utility/utils';

const navigation = [
  { name: 'Characters', href: '/', current: true },
  { name: 'Episodes', href: '/episodes', current: false },
  { name: 'Location', href: '/location', current: false },
]

NavBar.propTypes = {
  pathname: PropTypes.string.isRequired
};

export default function NavBar({ pathname }) {
  const { setSearch, updatePageNumber } = useContext(UserContext);
  const handleChange = debounce((value) => {
    updatePageNumber(1);
    setSearch(value);
  }, 1000);

  const handleInputChange = (event) => {
    const { value } = event.target;
    handleChange(value);
  };

  return (
    <header className="relative bg-white">
      <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Rick & Morty
      </p>

      <nav className="mx-auto max-w-7xl bg-gray-600 p-4 flex mt-4 justify-between items-center">
        <div className="flex items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className="mr-4"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {!(pathname.startsWith('/characters') || pathname.startsWith('/episodes') || pathname.startsWith('/location')) && (
          <div>
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md mr-2"
              onChange={handleInputChange}
            />
          </div>
        )}

      </nav>
    </header>
  )
}