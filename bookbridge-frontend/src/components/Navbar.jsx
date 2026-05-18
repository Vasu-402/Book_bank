import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { BookOpen, LogOut, Upload } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">BookBridge</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/books" className="text-gray-600 hover:text-primary-600 font-medium">Browse</Link>
            <Link to={user ? '/sell' : '/login'} className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700 transition">
              <Upload className="w-4 h-4" /> Sell Book
            </Link>

            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-600 hover:text-red-600 font-medium">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
