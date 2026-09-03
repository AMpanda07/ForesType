import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const res = await apiService.verifyAuth(token);
        if (res.success) {
          setProfile(res.user);
          setCurrentUser({ displayName: res.user.displayName, email: res.user.email });
        } else {
          localStorage.removeItem('jwtToken');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    if (res.success) {
      localStorage.setItem('jwtToken', res.token);
      setProfile(res.user);
      setCurrentUser({ displayName: res.user.displayName, email: res.user.email });
    }
    return res;
  };

  const register = async (email, password, displayName) => {
    const res = await apiService.register(email, password, displayName);
    if (res.success) {
      localStorage.setItem('jwtToken', res.token);
      setProfile(res.user);
      setCurrentUser({ displayName: res.user.displayName, email: res.user.email });
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setProfile(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    profile,
    setProfile,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
