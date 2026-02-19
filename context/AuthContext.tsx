import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

type Role = 'paciente' | 'medico' | 'farmacia' | 'laboratorio' | 'admin' | null;

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  userRole: Role; // Keeping for compatibility
  adminSession: { role: 'master' | 'editor'; email: string } | null;
  setAdminSession: (session: { role: 'master' | 'editor'; email: string } | null) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminSession, setAdminSession] = useState<{ role: 'master' | 'editor'; email: string } | null>(null);

  const fetchProfile = async (userId: string, userEmail?: string, userFullName?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, check for pending_role
        const pendingRole = localStorage.getItem('pending_role') as Role;
        if (pendingRole && (userEmail || userFullName)) {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                email: userEmail || '',
                full_name: userFullName || '',
                role: pendingRole
              }
            ])
            .select()
            .single();

          if (!insertError) {
            setProfile(newProfile);
            localStorage.removeItem('pending_role');
            
            // Create role-specific record if needed (e.g. for doctors)
            if (pendingRole === 'medico') {
              await supabase.from('doctors').insert([{ id: userId }]);
            }
            return;
          } else {
            console.error('Error creating profile after OAuth:', insertError);
          }
        }
        setProfile(null);
      } else if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata?.full_name);
        }
      } catch (err) {
        console.error('Error in initAuth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // If we are already loading from initAuth, avoid duplicate work
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        setLoading(true); // Ensure loading is true while we fetch
        await fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata?.full_name);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setAdminSession(null);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      userRole: profile?.role || null, 
      adminSession, 
      setAdminSession, 
      signOut,
      refreshProfile
    }}>
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

