import React from 'react';

const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full max-w-md p-6 animate-slide-up relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-primary-600"
          onClick={onClose}
        >
          ×
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
