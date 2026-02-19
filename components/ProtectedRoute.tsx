import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles
}) => {
  const { userRole, user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white font-bold text-primary animate-pulse">Cargando perfil...</div>;
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/role-selection" replace />;
  }

  return <>{children}</>;
};