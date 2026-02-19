import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Mail, Lock, User, Phone, Briefcase, FileText, MapPin, Building, Apple, Facebook } from 'lucide-react';
import { supabase } from '../services/supabase';

type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'lab' | 'admin';

interface RegisterScreenProps {
  role: UserRole;
  onBack: () => void;
  onSubmit: (role: UserRole) => void;
}

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335"/>
    </svg>
);

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ role, onBack, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    name: '',
    lastName: '',
    specialty: '',
    license: '',
    businessName: '',
    address: '',
    examTypes: ''
  });

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: `${formData.name} ${formData.lastName}`.trim(),
                    role: role,
                    phone: formData.phone,
                    ...(role === 'doctor' && { specialty: formData.specialty, license: formData.license }),
                    ...(role === 'pharmacy' && { businessName: formData.businessName, address: formData.address }),
                    ...(role === 'lab' && { businessName: formData.businessName, address: formData.address, examTypes: formData.examTypes })
                }
            }
        });

        if (error) throw error;
        
        console.log("Registered:", data);
        onSubmit(role);
    } catch (error: any) {
        alert(error.message || "Error al registrarse");
    } finally {
        setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
      console.log(`Iniciando registro con ${provider}`);
      // Supabase logic: supabase.auth.signInWithOAuth({ provider })
  };

  const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout 
      title={config.title}
      subtitle={config.subtitle}
      onBack={onBack}
    >
      <div className="flex flex-col gap-6 py-2">
          {/* Social Register Options */}
          <div className="flex flex-col gap-3">
              <button 
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all font-medium text-gray-700 shadow-sm"
              >
                  <GoogleIcon />
                  Continuar con Google
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                  <button 
                      onClick={() => handleSocialLogin('apple')}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all font-medium text-gray-700 shadow-sm"
                  >
                      <Apple size={18} />
                      Apple
                  </button>
                  <button 
                      onClick={() => handleSocialLogin('facebook')}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] transition-all font-medium text-white shadow-sm"
                  >
                      <Facebook size={18} fill="white" />
                      Facebook
                  </button>
              </div>
          </div>

          <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-4 text-xs text-gray-400 uppercase tracking-widest absolute">o regístrate con correo</span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Common Fields */}
            <Input 
              label="Correo Electrónico" 
              type="email" 
              placeholder="correo@ejemplo.com" 
              icon={<Mail size={18} />} 
              required 
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Contraseña" 
                type="password" 
                placeholder="Min. 8 caracteres" 
                icon={<Lock size={18} />} 
                required 
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
              />
               <Input 
                label="Teléfono" 
                type="tel" 
                placeholder="55 1234 5678" 
                icon={<Phone size={18} />} 
                required 
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>

            {/* Patient, Doctor & Admin Fields */}
            {(role === 'patient' || role === 'doctor' || role === 'admin') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Nombre" 
                    placeholder="Tu nombre" 
                    icon={<User size={18} />} 
                    required 
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                />
                <Input 
                    label="Apellido" 
                    placeholder="Tus apellidos" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                />
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
                  value={formData.specialty}
                  onChange={(e) => updateField('specialty', e.target.value)}
                />
                <Input 
                  label="Cédula Profesional" 
                  placeholder="Número de registro médico" 
                  icon={<FileText size={18} />} 
                  required 
                  value={formData.license}
                  onChange={(e) => updateField('license', e.target.value)}
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
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                />
                <Input 
                  label="Dirección Completa" 
                  placeholder="Calle, Número, Colonia, CP" 
                  icon={<MapPin size={18} />} 
                  required 
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
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
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                />
                <Input 
                  label="Dirección Completa" 
                  placeholder="Calle, Número, Colonia, CP" 
                  icon={<MapPin size={18} />} 
                  required 
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
                <div className="w-full">
                   <label className="block text-sm font-medium text-gray-700 mb-1.5 font-sans">
                      Tipo de Exámenes
                   </label>
                   <input 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                     placeholder="Sangre, Orina, Rayos X..."
                     value={formData.examTypes}
                     onChange={(e) => updateField('examTypes', e.target.value)}
                   />
                </div>
              </>
            )}

            <div className="pt-6">
              <Button 
                label={loading ? "Creando cuenta..." : "Registrarse"} 
                variant="primary" 
                fullWidth 
                type="submit"
                disabled={loading}
              />
            </div>
          </form>
      </div>
    </AuthLayout>
  );
};