import React from 'react';

const Card = ({ children, className = '', variant = 'default', hover = false }) => {
  const baseClasses = 'bg-white dark:bg-slate-900 rounded-lg p-6';
  const shadowClasses = variant === 'elevated' ? 'shadow-lg' : 'shadow';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow' : '';
  
  return (
    <div className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
