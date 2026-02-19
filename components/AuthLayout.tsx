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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          {showBack && onBack && (
            <button 
              onClick={onBack}
              className="p-2.5 -ml-2.5 rounded-xl hover:bg-gray-50 text-gray-500 transition-all border border-transparent hover:border-gray-100"
            >
              <ChevronLeft size={22} />
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && (
                <h1 className="font-heading text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2 leading-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-500 text-sm md:text-base font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};