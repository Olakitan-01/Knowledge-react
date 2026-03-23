import { Link, useLocation } from 'react-router-dom'

function BottomNavbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="bg-gray-900 border-t border-gray-800 fixed bottom-0 w-full flex justify-around items-center py-3 px-2 z-10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link to="/" className={`flex flex-col items-center transition ${isActive('/') ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
        <span className="material-icons text-3xl">home</span>
      </Link>

      <Link to="/" className={`flex flex-col items-center transition ${isActive('/videos') ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
        <span className="material-icons text-3xl">movie</span>
      </Link>

      <Link to="/" className={`flex flex-col items-center transition ${isActive('/message') ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
        <span className="material-icons text-3xl">send</span>
      </Link>

      <Link to="/" className={`flex flex-col items-center transition ${isActive('/search') ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
        <span className="material-icons text-3xl">search</span>
      </Link>

      <Link to="/profile" className={`flex flex-col items-center transition ${isActive('/profile') ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>
        <span className="material-icons text-3xl">account_circle</span>
      </Link>
    </nav>
  )
}

export default BottomNavbar