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

  const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout 
      title={config.title}
      subtitle={config.subtitle}
      onBack={onBack}
    >
      <div className="flex flex-col gap-6">
          {/* Social Register Options */}
          <div className="grid grid-cols-1 gap-3">
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
              <span className="bg-white px-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] absolute">o vía email</span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Account Info */}
            <div className="space-y-4">
              <Input 
                label="Correo Electrónico" 
                type="email" 
                placeholder="correo@ejemplo.com" 
                icon={<Mail size={18} className="text-primary" />} 
                required 
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Contraseña" 
                  type="password" 
                  placeholder="••••••••" 
                  icon={<Lock size={18} className="text-primary" />} 
                  required 
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                />
                <Input 
                  label="Teléfono" 
                  type="tel" 
                  placeholder="Teléfono" 
                  icon={<Phone size={18} className="text-primary" />} 
                  required 
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Personal Info */}
            {(role === 'patient' || role === 'doctor' || role === 'admin') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <Input 
                    label="Nombre" 
                    placeholder="Tu nombre" 
                    icon={<User size={18} className="text-primary" />} 
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

            {/* Professional/Business Info */}
            {role === 'doctor' && (
              <div className="space-y-4 pt-2">
                <Input 
                  label="Especialidad" 
                  placeholder="Ej. Cardiología" 
                  icon={<Briefcase size={18} className="text-primary" />} 
                  required 
                  value={formData.specialty}
                  onChange={(e) => updateField('specialty', e.target.value)}
                />
                <Input 
                  label="Cédula Profesional" 
                  placeholder="Número de cédula" 
                  icon={<FileText size={18} className="text-primary" />} 
                  required 
                  value={formData.license}
                  onChange={(e) => updateField('license', e.target.value)}
                />
              </div>
            )}

            {(role === 'pharmacy' || role === 'lab') && (
              <div className="space-y-4 pt-2">
                <Input 
                  label={role === 'pharmacy' ? "Nombre de Farmacia" : "Nombre de Laboratorio"} 
                  placeholder="Nombre comercial" 
                  icon={<Building size={18} className="text-primary" />} 
                  required 
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                />
                <Input 
                  label="Dirección" 
                  placeholder="Ubicación completa" 
                  icon={<MapPin size={18} className="text-primary" />} 
                  required 
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
                {role === 'lab' && (
                  <div className="w-full">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                        Tipo de Exámenes
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Sangre, Rayos X, etc."
                      value={formData.examTypes}
                      onChange={(e) => updateField('examTypes', e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="pt-6">
              <Button 
                label={loading ? "Creando cuenta..." : "Crear Mi Cuenta"} 
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