
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { loginUser } from '../utils/api';

interface AuthContextType extends AuthState {
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState & { isInitializing: boolean }>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth-token');
      const email = localStorage.getItem('auth-email');
      if (token && email) {
        setState({
          user: { token, email },
          isAuthenticated: true,
          isLoading: false,
          isInitializing: false,
        });
      } else {
        setState(prev => ({ ...prev, isInitializing: false }));
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('auth-token', token);
      localStorage.setItem('auth-email', email);
      setState({
        user: { token, email },
        isAuthenticated: true,
        isLoading: false,
        isInitializing: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-email');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
