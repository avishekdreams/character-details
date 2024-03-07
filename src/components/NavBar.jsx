import { Link } from "react-router-dom";

const navigation = [
  { name: 'Characters', href: '/', current: true },
  { name: 'Episodes', href: '/episodes', current: false },
  { name: 'Location', href: '/location', current: false },
]

export default function NavBar() {
  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Rick & Morty
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-center py-3 sm:items-stretch sm:justify-start text-black">

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className="hover:text-red-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}