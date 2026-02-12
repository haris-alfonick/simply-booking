import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate()


  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));


  return (

    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-[#11A4D4] outfit"><Link to="/">SimplyBooking</Link></div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-[#11A4D4] focus:outline-none"
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

        <nav className="hidden md:flex space-x-10 items-center">
          <Link to="/about" className="text-[#627084] font-arial">About Us</Link>
          <Link to="/contact" className="text-[#627084] font-arial">Contact Us</Link>
          {token ?
            <Link to="/clientdashboard" className="text-[#627084] font-arial">Dashboard</Link>
            : <>
              <Link to="/signup" className="text-[#627084] font-arial">Join</Link>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-4 py-2 text-center text-white rounded bg-[linear-gradient(135deg,#11A4D4_0%,#25AFF4_50%,#5ACCF2_100%)]"
              >
                Log In
                <ArrowRight className="w-4 h-4 mt-1" />
              </button>              </>

          }


        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden flex flex-col space-y-4 pb-4 absolute top-16 pt-5 left-0 w-full bg-[#F8FAFC] shadow-md z-10 px-4">
          <Link to="/about" className="text-[#627084] font-arial">About Us</Link>
          <Link to="/contact" className="text-[#627084] font-arial">Contact Us</Link>
          {
            token ? (
              user && user.role === 1 ? (
                <Link to="/maindashboard" className="text-[#627084] font-arial">Admin Panel</Link>
              ) : (
                user && user.role === 0 ? (
                  <Link to="/clientdashboard" className="text-[#627084] font-arial">Dashboard</Link>
                ) : null
              )
            ) : (
              <>
                <Link to="/signup" className="text-[#627084] font-arial">Join</Link>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-center text-white rounded bg-[linear-gradient(135deg,#11A4D4_0%,#25AFF4_50%,#5ACCF2_100%)]"
                >
                  Log In
                  <ArrowRight className="w-4 h-4 mt-1" />
                </button>

              </>
            )
          }
        </nav>
      )}
    </div>
  );
};

export default Navbar;







