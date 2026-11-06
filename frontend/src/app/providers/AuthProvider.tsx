import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/entities/user/model/types';

interface TokenPair {
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, tokens: TokenPair) => void;
  logout: () => Promise<void>;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User, tokens: TokenPair) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch {
      }
    }

    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
  };

  const isTeacher = user?.role === 'teacher';

  return (
    <AuthContext.Provider value={{ user, login, logout, isTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};