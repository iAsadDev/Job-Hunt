// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      axios
        .get("http://localhost:4000/api/auth/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setIsAuthenticated(true);
          setUser(res.data.user); // assuming backend sends user info in res.data.user
          setIsLoading(false);
        })
        .catch(() => {
          removeToken();
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  // 👇 manual function to call after login success
  const loginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        isLoading,
        loginSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
