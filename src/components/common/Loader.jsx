import React from 'react';

const Loader = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-6 h-6 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Loader;
