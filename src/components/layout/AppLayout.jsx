import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const AppLayout = ({ children, onLogout }) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar onLogout={logout} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
