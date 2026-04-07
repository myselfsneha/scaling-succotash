import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('sms_auth');
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });

  const saveAuth = (nextAuth) => {
    setAuth(nextAuth);
    localStorage.setItem('sms_auth', JSON.stringify(nextAuth));
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    saveAuth({ token: data.token, user: data.user });
  };

  const login = async (payload) => {
    const data = await authApi.login(payload);
    saveAuth({ token: data.token, user: data.user });
  };

  const logout = () => {
    saveAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      register,
      login,
      logout
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
