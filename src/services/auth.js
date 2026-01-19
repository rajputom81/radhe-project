import { createContext, useContext, useEffect, useState } from "react";
import { loginAdmin, getSettings } from "@/lib/supabase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load admin on refresh
  useEffect(() => {
    const loadUser = async () => {
      const res = await getSettings();
      if (res.success) {
        setUser(res.data);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    const res = await loginAdmin(username, password);

    if (res.success) {
      setUser(res.data);
      return { success: true };
    }

    return { success: false, error: res.error };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
