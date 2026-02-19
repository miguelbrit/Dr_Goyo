import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  onBack, 
  showBack = true 
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        {showBack && onBack && (
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-12 pt-4 max-w-md mx-auto w-full flex flex-col">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="font-heading text-3xl font-bold text-secondary mb-2 leading-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-500 text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-6 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};