import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockUsers, mockCompany } from '@/data/mockData';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  company: typeof mockCompany;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS: Record<string, { password: string; user: User }> = {
  'admin@fashionflow.com': { password: 'admin123', user: mockUsers[0] },
  'manager@fashionflow.com': { password: 'manager123', user: mockUsers[1] },
  'worker@fashionflow.com': { password: 'worker123', user: mockUsers[2] },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fashionflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('fashionflow_user');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const creds = DEMO_CREDENTIALS[email];
    if (creds && creds.password === password) {
      setUser(creds.user);
      localStorage.setItem('fashionflow_user', JSON.stringify(creds.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fashionflow_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        company: mockCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}