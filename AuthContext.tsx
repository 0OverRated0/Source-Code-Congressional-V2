// app/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type User = {
  name: string;
  age: number;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      setIsAuthenticated(true);
      const userData = await SecureStore.getItemAsync('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  };

  const login = async (email: string, password: string) => {
    await SecureStore.setItemAsync('userToken', 'dummyToken');
    const dummyUser = { name: 'John Doe', age: 30, email: email };
    await SecureStore.setItemAsync('userData', JSON.stringify(dummyUser));
    setIsAuthenticated(true);
    setUser(dummyUser);
  };

  const signup = async (email: string, password: string) => {
    await SecureStore.setItemAsync('userToken', 'dummyToken');
    const newUser = { name: 'New User', age: 25, email: email };
    await SecureStore.setItemAsync('userData', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const deleteAccount = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, deleteAccount }}>
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