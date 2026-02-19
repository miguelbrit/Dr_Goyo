import React from 'react';
import { Button } from '../components/Button';
import { Activity } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onAdminAccess?: () => void; // New prop for admin simulation
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onRegister, onAdminAccess }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Premium background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[100px] animate-pulse transition-all duration-1000"></div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-8 text-center z-10 pt-10">
        <div className="w-28 h-28 bg-white rounded-[2.5rem] shadow-2xl shadow-primary/20 flex items-center justify-center mb-10 text-primary transform rotate-6 border border-primary/10">
          <Activity size={56} />
        </div>
        
        <h1 className="font-heading text-4xl font-bold text-secondary mb-6 leading-[1.1]">
          Tu salud, <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent italic">simplificada.</span>
        </h1>
        
        <p className="text-gray-500 text-base font-medium leading-relaxed max-w-[280px]">
          Conecta con médicos, farmacias y laboratorios en una sola plataforma.
        </p>
      </div>

      <div className="p-8 pb-12 space-y-4 z-10 bg-white/80 backdrop-blur-xl rounded-t-[3rem] border-t border-white shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-3">
          <Button 
            label="Comenzar Ahora" 
            variant="primary" 
            fullWidth 
            onClick={onRegister} // This leads to Role Selection
          />
          <button 
            onClick={onLogin}
            className="w-full py-4 text-sm font-bold text-secondary hover:text-primary transition-all uppercase tracking-widest"
          >
            Ya tengo una cuenta
          </button>
        </div>
        
        <div className="text-center pt-4 flex flex-col items-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Dr. Goyo &copy; 2026 • Salud Digital
          </p>
          
          <button 
            onClick={onAdminAccess}
            className="mt-8 text-[9px] text-gray-200 hover:text-gray-400 transition-colors uppercase tracking-[0.3em] font-bold"
          >
            Acceso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
};