import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api.js';
import { auth, googleProvider } from '../config/firebase.js';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem('jwtToken', token);
        
        // Sync with backend
        const res = await apiService.syncFirebaseUser(token);
        if (res.success) {
          setProfile(res.user);
          setCurrentUser(user);
        } else {
          // If backend sync fails, log out
          await signOut(auth);
          localStorage.removeItem('jwtToken');
          setProfile(null);
          setCurrentUser(null);
        }
      } else {
        localStorage.removeItem('jwtToken');
        setProfile(null);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(true);
      localStorage.setItem('jwtToken', token);
      
      const res = await apiService.syncFirebaseUser(token);
      if (res.success) {
        setProfile(res.user);
        setCurrentUser(result.user);
        return { success: true };
      } else {
        await signOut(auth);
        return { success: false, message: 'Backend sync failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('jwtToken');
    setProfile(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    profile,
    setProfile,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
