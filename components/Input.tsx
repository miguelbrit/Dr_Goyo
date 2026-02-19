import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className={`
            w-full px-4 py-3 rounded-2xl border border-gray-100 bg-white text-gray-700 text-sm
            placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-300 group-hover:border-gray-200
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-500 focus:ring-red-200' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};