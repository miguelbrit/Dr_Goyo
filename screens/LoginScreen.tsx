import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Mail, Lock, Apple, Facebook } from 'lucide-react';
import { supabase } from '../services/supabase';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onForgotPassword?: () => void;
}

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335"/>
    </svg>
);

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess, onForgotPassword }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        onLoginSuccess();
    } catch (error: any) {
        alert(error.message || "Error al iniciar sesión");
    } finally {
        setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
      try {
          setLoading(true);
          const { error } = await supabase.auth.signInWithOAuth({
              provider,
              options: {
                  redirectTo: window.location.origin
              }
          });
          if (error) throw error;
      } catch (error: any) {
          alert(`Error con ${provider}: ` + error.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <AuthLayout 
      title="¡Hola de nuevo!" 
      subtitle="Ingresa tus credenciales para acceder a tu cuenta."
      onBack={onBack}
    >
      {/* Social Login Options */}
      <div className="flex flex-col gap-3 mb-2">
          <button 
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-100 rounded-2xl bg-white hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm disabled:opacity-50"
          >
              <GoogleIcon />
              <span className="text-sm">Continuar con Google</span>
          </button>
          
          <div className="grid grid-cols-2 gap-3">
              <button 
                  onClick={() => handleSocialLogin('apple')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-100 rounded-2xl bg-white hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm disabled:opacity-50"
              >
                  <Apple size={18} />
                  <span className="text-sm">Apple</span>
              </button>
              <button 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] transition-all font-semibold text-white shadow-md shadow-blue-200/50 disabled:opacity-50"
              >
                  <Facebook size={18} fill="currentColor" />
                  <span className="text-sm">Facebook</span>
              </button>
          </div>
      </div>

      <div className="relative flex items-center justify-center py-2">
          <div className="border-t border-gray-100 w-full"></div>
          <span className="bg-white px-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] absolute">o con tu contraseña</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Correo Electrónico" 
          type="email" 
          placeholder="ejemplo@correo.com" 
          icon={<Mail size={18} className="text-primary" />}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="space-y-2">
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
            icon={<Lock size={18} className="text-primary" />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end pr-1">
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-[11px] font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            label={loading ? "Ingresando..." : "Entrar Ahora"} 
            variant="primary" 
            fullWidth 
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </AuthLayout>
  );
};