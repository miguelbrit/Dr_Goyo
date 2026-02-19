import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onForgotPassword?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess, onForgotPassword }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <AuthLayout 
      title="¡Hola de nuevo!" 
      subtitle="Ingresa tus credenciales para acceder a tu cuenta."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Correo Electrónico" 
          type="email" 
          placeholder="ejemplo@correo.com" 
          icon={<Mail size={18} />}
          required
        />
        
        <div className="space-y-2">
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
            icon={<Lock size={18} />}
            required
          />
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-medium text-primary hover:text-teal-700 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <Button 
          label={loading ? "Ingresando..." : "Ingresar"} 
          variant="primary" 
          fullWidth 
          type="submit"
          disabled={loading}
        />
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Google</span>
        </button>
        <button type="button" className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <span className="font-medium text-gray-700 text-sm">Apple</span>
        </button>
      </div>
    </AuthLayout>
  );
};