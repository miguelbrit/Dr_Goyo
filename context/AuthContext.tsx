import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'patient' | 'doctor' | 'pharmacy' | 'lab' | 'admin' | null;

interface AuthContextType {
  userRole: Role;
  setUserRole: (role: Role) => void;
  adminSession: { role: 'master' | 'editor'; email: string } | null;
  setAdminSession: (session: { role: 'master' | 'editor'; email: string } | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<Role>(null);
  const [adminSession, setAdminSession] = useState<{ role: 'master' | 'editor'; email: string } | null>(null);

  const logout = () => {
    setUserRole(null);
    setAdminSession(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, adminSession, setAdminSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
