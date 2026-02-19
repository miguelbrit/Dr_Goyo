<<<<<<< HEAD
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
=======
import React, { useEffect } from 'react';
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
<<<<<<< HEAD
=======
  currentRole: string;
  onRedirect: () => void;
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
<<<<<<< HEAD
  allowedRoles
}) => {
  const { userRole } = useAuth();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
=======
  allowedRoles, 
  currentRole,
  onRedirect
}) => {
  useEffect(() => {
    if (!allowedRoles.includes(currentRole)) {
      onRedirect();
    }
  }, [currentRole, allowedRoles, onRedirect]);

  if (!allowedRoles.includes(currentRole)) {
    return null; // Or a loading spinner while redirecting
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  }

  return <>{children}</>;
};