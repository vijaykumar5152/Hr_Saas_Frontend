import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Briefcase, Users, User, Settings, CreditCard, LogOut, Calendar } from 'lucide-react';

const menuConfig = {
  admin: [
    { label: 'Dashboard', icon: <Home size={18} />, to: '/dashboard' },
    { label: 'Jobs', icon: <Briefcase size={18} />, to: '/jobs' },
    { label: 'Candidates', icon: <Users size={18} />, to: '/candidates' },
    { label: 'Interviews', icon: <Calendar size={18} />, to: '/interviews' },
    { label: 'Team', icon: <User size={18} />, to: '/team' },
    { label: 'Billing', icon: <CreditCard size={18} />, to: '/billing' },
    { label: 'Settings', icon: <Settings size={18} />, to: '/settings' },
    { label: 'Profile', icon: <User size={18} />, to: '/profile' },
  ],
  hr: [
    { label: 'Dashboard', icon: <Home size={18} />, to: '/dashboard' },
    { label: 'Jobs', icon: <Briefcase size={18} />, to: '/jobs' },
    { label: 'Candidates', icon: <Users size={18} />, to: '/candidates' },
    { label: 'Interviews', icon: <Calendar size={18} />, to: '/interviews' },
    { label: 'Profile', icon: <User size={18} />, to: '/profile' },
  ],
  recruiter: [
    { label: 'Dashboard', icon: <Home size={18} />, to: '/dashboard' },
    { label: 'Candidates', icon: <Users size={18} />, to: '/candidates' },
    { label: 'Profile', icon: <User size={18} />, to: '/profile' },
  ],
};

const Sidebar = ({ onLogout }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return null;
  const menu = menuConfig[user.role] || [];

  return (
    <aside className="h-full w-64 bg-white dark:bg-slate-900 border-r flex flex-col">
      <div className="p-6 text-2xl font-bold text-primary-700">HR SaaS</div>
      <nav className="flex-1">
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-slate-800 transition ${location.pathname === item.to ? 'bg-primary-100 dark:bg-slate-800 font-semibold' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        className="flex items-center gap-2 px-6 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition border-t"
        onClick={onLogout}
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
