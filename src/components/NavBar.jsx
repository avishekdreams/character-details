import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../contexts/userContext";

const navigation = [
  { name: 'Characters', href: '/', current: true },
  { name: 'Episodes', href: '/episodes', current: false },
  { name: 'Location', href: '/location', current: false },
]

export default function NavBar() {
  const { setSearch, updatePageNumber } = useContext(UserContext);
  const search = useRef("");
  const handleSearch = () => {
    updatePageNumber(1);
    setSearch(search.current.value);
  }

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
        <div>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-md mr-2"
            ref={search}
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </nav>
    </header>
  )
}