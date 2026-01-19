import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as supabaseLogin } from '@/lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setAdminData(parsed);
      } catch (error) {
        localStorage.removeItem('adminAuth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const result = await supabaseLogin(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        setAdminData(result.data);
        localStorage.setItem('adminAuth', JSON.stringify(result.data));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminData(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};