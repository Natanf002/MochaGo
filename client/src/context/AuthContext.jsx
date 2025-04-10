
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('mochago_token'));
  const [user, setUser] = useState(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem('mochago_token', token);
    setToken(token);
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    localStorage.removeItem('mochago_token');
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
