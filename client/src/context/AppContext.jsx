import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/http.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    return data.user;
  };

  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password });
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, categories, setCategories, login, register, logout }),
    [token, categories]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
