import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const users = {
      'sheraz': { password: 'admin123', role: 'admin' as const },
      'haris': { password: 'user123', role: 'user' as const },
    };

    const userData = users[username as keyof typeof users];
    if (userData && userData.password === password) {
      setUser({ username, role: userData.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};