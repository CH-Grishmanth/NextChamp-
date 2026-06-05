import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AppHeader() {
  const location = useLocation();
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Learn', path: '/learn' },
    { name: 'Compete', path: '/compete' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              <img 
                src="https://image2url.com/images/1758694860003-16a86aef-655a-4faa-8932-86b50dd85484.png" 
                alt="NextChamp Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="text-white font-bold">NextChamp</span>
            </Link>
          </div>

          {/* Navigation & Profile aligned to right */}
          <div className="flex items-center space-x-6 ml-auto">
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-400 bg-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Profile Avatar / Google Login */}
            <div className="flex items-center">
              {isAuthenticated && user ? (
                /* Profile Dropdown */
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden focus:outline-none transition-transform transform hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20"
                  >
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                  </button>

                  {isDropdownOpen && (
                    <>
                      {/* Transparent overlay click-catcher to close dropdown */}
                      <div 
                        className="fixed inset-0 z-30 cursor-default" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2.5 w-52 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 py-2.5 z-40 transform origin-top-right transition-all">
                        <div className="px-4 py-2 border-b border-slate-700/80 mb-1.5">
                          <p className="text-xs text-slate-400 font-medium mb-0.5">Signed in as</p>
                          <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        </div>
                        <Link 
                          to="/profile" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          My Profile
                        </Link>
                        <button 
                          onClick={() => {
                            setIsDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Login Button */
                <button 
                  onClick={loginWithGoogle}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-md shadow-blue-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.415 0-6.19-2.77-6.19-6.19 0-3.42 2.777-6.19 6.19-6.19 1.463 0 2.8.51 3.85 1.353l3.057-3.057C18.91 2.378 15.82 1 12.24 1A10.99 10.99 0 0 0 1.25 12a10.99 10.99 0 0 0 10.99 11c6.105 0 11.1-4.426 11.1-11 0-.74-.08-1.42-.2-2.01H12.24z"/>
                  </svg>
                  <span>Login with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}