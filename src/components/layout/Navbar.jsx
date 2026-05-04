import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-primary-700">HR SaaS</Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <Link to="/profile" className="text-gray-700 dark:text-gray-200 font-medium">{user.name}</Link>
        ) : (
          <>
            <Link to="/login" className="text-primary-600 font-medium">Login</Link>
            <Link to="/register" className="text-primary-600 font-medium">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
