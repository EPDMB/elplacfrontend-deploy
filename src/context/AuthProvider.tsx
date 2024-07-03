"use client";
import { IAuthContext, IAuthProviderProps, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageToken: string | null = localStorage.getItem("token");
      if (storageToken) {
        setToken(storageToken);
      }
    }
  }, []);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
