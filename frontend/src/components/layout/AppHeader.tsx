import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Upload, User, X, CreditCard } from 'lucide-react';

export function AppHeader() {
  const location = useLocation();
  const isAuthenticated = false; // TODO: Replace with actual auth state
  const [isAadharModalOpen, setIsAadharModalOpen] = useState(false);
  const [aadharNumber, setAadharNumber] = useState('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Learn', path: '/learn' },
    { name: 'Compete', path: '/compete' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleAadharSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadharNumber.length === 12) {
      // Handle Aadhar authentication here
      console.log('Aadhar Number:', aadharNumber);
      setIsAadharModalOpen(false);
      setAadharNumber('');
    } else {
      alert('Please enter a valid 12-digit Aadhar number');
    }
  };

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

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
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

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="btn-primary flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
                <button className="p-2 text-slate-300 hover:text-white">
                  <Bell className="w-5 h-5" />
                </button>
                <Link to="/profile" className="p-2 text-slate-300 hover:text-white">
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <button 
                onClick={() => setIsAadharModalOpen(true)}
                className="button-aadhar flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Login with Aadhar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Aadhar Login Modal */}
      {isAadharModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Login with Aadhar</h2>
              <button 
                onClick={() => setIsAadharModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAadharSubmit} className="space-y-4">
              <div>
                <label htmlFor="aadhar" className="block text-sm font-medium text-slate-300 mb-2">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  id="aadhar"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="Enter your 12-digit Aadhar number"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={12}
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  {aadharNumber.length}/12 digits
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAadharModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 button"
                  disabled={aadharNumber.length !== 12}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}