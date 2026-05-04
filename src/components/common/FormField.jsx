import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  rows = 4,
  options = [],
  ...props 
}) => {
  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-danger-600">*</span>}
        </label>
      )}
      
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            error 
              ? 'border-danger-500 focus:ring-danger-500' 
              : 'border-gray-300 focus:ring-primary-500'
          }`}
          {...props}
        />
      ) : isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            error 
              ? 'border-danger-500 focus:ring-danger-500' 
              : 'border-gray-300 focus:ring-primary-500'
          }`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            error 
              ? 'border-danger-500 focus:ring-danger-500' 
              : 'border-gray-300 focus:ring-primary-500'
          }`}
          {...props}
        />
      )}
      
      {error && (
        <div className="flex items-center gap-1 mt-2 text-danger-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
