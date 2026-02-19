import React from 'react';
import { Bell, Moon, Shield, Globe, ChevronRight, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AppSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-2">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-6 transition-colors">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Suscripción Actual</h4>
        <div className="flex justify-between items-center">
          <span className="text-primary font-heading font-semibold">Plan Gratuito</span>
          <button className="text-xs bg-secondary text-white px-3 py-1.5 rounded-lg hover:bg-secondary/90 transition-colors">Mejorar Plan</button>
        </div>
      </div>

      <SettingItem icon={Bell} title="Notificaciones" toggle />
      <SettingItem 
        icon={theme === 'dark' ? Sun : Moon} 
        title={theme === 'dark' ? "Modo Claro" : "Modo Oscuro"} 
        toggle 
        active={theme === 'dark'}
        onClick={toggleTheme}
      />
      <SettingItem icon={Globe} title="Idioma" value="Español" />
      <SettingItem icon={Shield} title="Privacidad y Seguridad" />
      
      <div className="pt-8 text-center">
        <p className="text-xs text-gray-400">Dr. Goyo App v1.0.5</p>
      </div>
    </div>
  );
};

interface SettingItemProps {
    icon: any;
    title: string;
    toggle?: boolean;
    value?: string;
    active?: boolean;
    onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, title, toggle, value, active, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="text-gray-500 dark:text-gray-400">
        <Icon size={20} />
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-300">{title}</span>
    </div>
    
    {toggle ? (
      <div className={`w-10 h-6 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-all ${active ? 'left-5' : 'left-1'}`}></div>
      </div>
    ) : (
      <div className="flex items-center gap-2 text-gray-400">
        {value && <span className="text-sm">{value}</span>}
        <ChevronRight size={18} />
      </div>
    )}
  </button>
);