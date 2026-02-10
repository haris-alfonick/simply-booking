import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = ({ isOpen, toggleMenu, token, user }) => {
  const navigate = useNavigate();

  const navTextClass = "text-[#627084] font-arial";

  const renderAuthLinks = (isMobile = false) => {
    if (token) {
      if (user?.role === 1) {
        return <Link to="/maindashboard" className={navTextClass}>Admin Panel</Link>;
      }
      if (user?.role === 0) {
        return <Link to="/clientdashboard" className={navTextClass}>Dashboard</Link>;
      }
      return null;
    }

    return (
      <>
        <Link to="/signup" className={navTextClass}>Join</Link>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded bg-gradient-to-br from-[#11A4D4] via-[#25AFF4] to-[#5ACCF2]"
        >
          Log In
          <ArrowRight className="w-4 h-4 mt-1" />
        </button>
      </>
    );
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#11A4D4] outfit">
          SimplyBooking
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden text-[#11A4D4]"
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className={navTextClass}>About Us</Link>
          <Link to="/contact" className={navTextClass}>Contact Us</Link>
          {renderAuthLinks()}
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-10 px-4 py-5 flex flex-col space-y-4">
          <Link to="/about" onClick={toggleMenu} className={navTextClass}>About Us</Link>
          <Link to="/contact" onClick={toggleMenu} className={navTextClass}>Contact Us</Link>
          {renderAuthLinks(true)}
        </nav>
      )}
    </div>
  );
};

export default Navbar;

//  <div className="bg-[linear-gradient(90deg, rgba(17, 164, 212, 0.5) 0%, rgba(0, 0, 0, 0) 100%)] w-[264px] h-[2px] absolute top-[64px] left-[248px] opacity-100 transform rotate-0 bg-black">

//  </div>


// export default function GradientBackground() {
//   return (
//     <div className="
//   absolute 
// bg-[#11A4D4]
//   top-[-115.5px]
//   left-[1800px]
//   w-[320px]
//   h-[320px]
//   bg-primary/20
//   rounded-full
//   blur-3xl
//   opacity-100
//   rotate-0
//   animate-float
// "> content</div>


    // {/* <div className="min-h-screen bg-gradient-to-bl from-sky-300 via-sky-100 from-0% via-5% to-white">
    //   content 
    //     </div> */}
//   );
// }



{/* <div className="min-h-screen bg-gradient-to-br from-blue-50 from-0% via-blue-60 via-5% to-blue-200"> */ }






// import React from 'react'
// import PayPalForm from '../paypal/Paypal'

// const Form = () => {
//   return (
//     <div>
//       <PayPalForm />
//     </div>
//   )
// }

// export default Form