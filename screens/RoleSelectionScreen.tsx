import React from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { User, Stethoscope, Store, FlaskConical, ChevronRight } from 'lucide-react';

interface RoleSelectionScreenProps {
  onBack: () => void;
  onSelectRole: (role: 'paciente' | 'medico' | 'farmacia' | 'laboratorio') => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onBack, onSelectRole }) => {
  
  const roles = [
    {
      id: 'paciente',
      title: 'Soy Paciente',
      desc: 'Busco atención médica y control de salud',
      icon: User,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      id: 'medico',
      title: 'Soy Médico',
      desc: 'Quiero ofrecer consultas y gestionar pacientes',
      icon: Stethoscope,
      color: 'bg-primary/10 text-primary'
    },
    {
      id: 'farmacia',
      title: 'Soy Farmacia',
      desc: 'Venta y gestión de stock de medicamentos',
      icon: Store,
      color: 'bg-purple-50 text-purple-500'
    },
    {
      id: 'laboratorio',
      title: 'Soy Laboratorio',
      desc: 'Ofrezco análisis y resultados clínicos',
      icon: FlaskConical,
      color: 'bg-orange-50 text-orange-500'
    }
  ] as const;

  return (
    <AuthLayout 
      title="¿Qué tipo de usuario eres?" 
      subtitle="Personalizaremos tu experiencia según tu perfil."
      onBack={onBack}
    >
      <div className="grid gap-4 py-2">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelectRole(role.id as any)}
            className="flex items-center p-5 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/50 transition-all text-left group relative overflow-hidden active:scale-[0.98]"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${role.color} mr-5 transition-transform group-hover:scale-110 duration-500`}>
              <role.icon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-secondary group-hover:text-primary transition-colors">{role.title}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{role.desc}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ChevronRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </AuthLayout>
  );
};