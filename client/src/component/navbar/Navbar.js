import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 bg-cyan-50 py-2">
      <div className="flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-cyan-500"><Link to="/">SimplyBooking</Link></div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-cyan-500 focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
            </div>
          )}
        </button>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
          <Link to="/join" className="text-gray-600 hover:text-gray-900">Join</Link>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">Log In →</button>
        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden flex flex-col space-y-4 pb-4">
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
          <Link to="/join" className="text-gray-600 hover:text-gray-900">Join</Link>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">Log In →</button>
        </nav>
      )}
    </div>
  );
};

export default Navbar;









