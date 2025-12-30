import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing when backend is unavailable
const DEMO_USER: User = {
  id: 1,
  name: 'Demo Admin',
  email: 'admin@example.com',
  role: 'admin',
};

const DEMO_TOKEN = 'demo-token-for-testing';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin-token'));
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        // Check if it's demo mode
        if (token === DEMO_TOKEN) {
          setUser(DEMO_USER);
          setIsDemoMode(true);
          setIsLoading(false);
          return;
        }

        try {
          const userData = await api.getMe(token);
          setUser(userData);
          setIsDemoMode(false);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('admin-token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.login(email, password);
      if (response.token) {
        localStorage.setItem('admin-token', response.token);
        setToken(response.token);
        setUser(response.user);
        setIsDemoMode(false);
        return { success: true };
      }
      return { success: false, error: 'Invalid response from server' };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // If the API is unreachable, offer demo mode
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        // Enable demo mode login
        if (email && password) {
          localStorage.setItem('admin-token', DEMO_TOKEN);
          setToken(DEMO_TOKEN);
          setUser({ ...DEMO_USER, email });
          setIsDemoMode(true);
          return { success: true };
        }
      }
      
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      if (token && token !== DEMO_TOKEN) {
        await api.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin-token');
      setToken(null);
      setUser(null);
      setIsDemoMode(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        isDemoMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
