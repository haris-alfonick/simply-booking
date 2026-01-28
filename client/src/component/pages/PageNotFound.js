import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-gradient-to-r from-cyan-400 to-green-600 opacity-20 blur-3xl"></div>
          </div>
        </div>

        <div className="my-8">
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="60" fill="#e0ffff" />
            <ellipse cx="100" cy="100" rx="60" ry="15" fill="#c7fafe" opacity="0.6" />
            
            <circle cx="30" cy="30" r="2" fill="#8bf3fa" />
            <circle cx="170" cy="40" r="2" fill="#8bdafa" />
            <circle cx="160" cy="160" r="2" fill="#8be9fa" />
            <circle cx="40" cy="170" r="2" fill="#8bfaeb" />
            <circle cx="180" cy="100" r="1.5" fill="#8bfae7" />
            <circle cx="20" cy="100" r="1.5" fill="#8be9fa" />
            
            <g transform="translate(85, 70)">
              <rect x="8" y="20" width="14" height="18" rx="2" fill="white" />
              <circle cx="15" cy="12" r="9" fill="white" />
              <ellipse cx="15" cy="12" rx="6" ry="5" fill="#5cf6d5" opacity="0.7" />
              <rect x="3" y="24" width="4" height="10" rx="2" fill="white" />
              <rect x="23" y="24" width="4" height="10" rx="2" fill="white" />
              <rect x="9" y="38" width="5" height="8" rx="2" fill="white" />
              <rect x="16" y="38" width="5" height="8" rx="2" fill="white" />
            </g>
          </svg>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Lost in Space
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for has drifted off into the cosmic void. 
            Let's get you back on track.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            <span className="relative z-10">Take Me Home</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
          
          <button
            onClick={handleGoBack}
            className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-cyan-300 transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link className="text-sm text-gray-500 mb-4">
            Need help finding something?
          </Link>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="text-cyan-600 hover:text-cyan-700 hover:underline">
              Home
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="text-cyan-600 hover:text-cyan-700 hover:underline">
              About
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-cyan-600 hover:text-cyan-700 hover:underline">
              Contact
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}