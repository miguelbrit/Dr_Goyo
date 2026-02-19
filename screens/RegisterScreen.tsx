import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Mail, Lock, User, Phone, Briefcase, FileText, MapPin, Building } from 'lucide-react';

type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'lab' | 'admin';

interface RegisterScreenProps {
  role: UserRole;
  onBack: () => void;
  onSubmit: (role: UserRole) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ role, onBack, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const getRoleConfig = () => {
    switch (role) {
      case 'doctor': return { title: 'Registro Médico', subtitle: 'Únete a nuestra red de especialistas.' };
      case 'pharmacy': return { title: 'Registro Farmacia', subtitle: 'Registra tu sucursal para vender productos.' };
      case 'lab': return { title: 'Registro Laboratorio', subtitle: 'Ofrece tus servicios de análisis clínicos.' };
      case 'admin': return { title: 'Registro Administrador', subtitle: 'Acceso administrativo al sistema.' };
      default: return { title: 'Crear Cuenta', subtitle: 'Empieza a cuidar tu salud hoy mismo.' };
    }
  };

  const config = getRoleConfig();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API logic
    setTimeout(() => {
      setLoading(false);
      onSubmit(role);
    }, 1500);
  };

  return (
    <AuthLayout 
      title={config.title}
      subtitle={config.subtitle}
      onBack={onBack}
    >
      <form onSubmit={handleRegister} className="space-y-4">
        
        {/* Common Fields */}
        <Input 
          label="Correo Electrónico" 
          type="email" 
          placeholder="correo@ejemplo.com" 
          icon={<Mail size={18} />} 
          required 
        />
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="Min. 8 caracteres" 
            icon={<Lock size={18} />} 
            required 
          />
           <Input 
            label="Teléfono" 
            type="tel" 
            placeholder="55 1234 5678" 
            icon={<Phone size={18} />} 
            required 
          />
        </div>

        {/* Patient, Doctor & Admin Fields */}
        {(role === 'patient' || role === 'doctor' || role === 'admin') && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nombre" placeholder="Tu nombre" icon={<User size={18} />} required />
            <Input label="Apellido" placeholder="Tus apellidos" required />
          </div>
        )}

        {/* Doctor Specific Fields */}
        {role === 'doctor' && (
          <>
            <Input 
              label="Especialidad" 
              placeholder="Ej. Cardiología, Pediatría" 
              icon={<Briefcase size={18} />} 
              required 
            />
            <Input 
              label="Cédula Profesional" 
              placeholder="Número de registro médico" 
              icon={<FileText size={18} />} 
              required 
            />
          </>
        )}

        {/* Pharmacy Specific Fields */}
        {role === 'pharmacy' && (
          <>
            <Input 
              label="Nombre del Negocio" 
              placeholder="Ej. Farmacia Central" 
              icon={<Building size={18} />} 
              required 
            />
            <Input 
              label="Dirección Completa" 
              placeholder="Calle, Número, Colonia, CP" 
              icon={<MapPin size={18} />} 
              required 
            />
          </>
        )}

        {/* Lab Specific Fields */}
        {role === 'lab' && (
          <>
            <Input 
              label="Nombre del Laboratorio" 
              placeholder="Ej. LabCare Diagnósticos" 
              icon={<Building size={18} />} 
              required 
            />
            <Input 
              label="Dirección Completa" 
              placeholder="Calle, Número, Colonia, CP" 
              icon={<MapPin size={18} />} 
              required 
            />
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1.5 font-sans">
                  Tipo de Exámenes (Separados por coma)
               </label>
               <input 
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                 placeholder="Sangre, Orina, Rayos X..."
               />
            </div>
          </>
        )}

        <div className="pt-4">
          <Button 
            label={loading ? "Creando cuenta..." : "Registrarse"} 
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