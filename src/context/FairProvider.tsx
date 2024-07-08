"use client";
import { getFair } from "@/helpers/services";
import {
  IAuthContext,
  IAuthProviderProps,
  IFair,
  IFairContext,
  IFairProviderProps,
  IUser,
} from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const FairContext = createContext<IFairContext | undefined>(undefined);

export const FairProvider: React.FC<IFairProviderProps> = ({ children }) => {
const [fairs, setFairs] = useState<IFair[]>([]);
  const [fairSelected, setFairSelected] = useState<any>(null);
  const [dateSelect, setDateSelect] = useState<Date | null>(null);
  const [timeSelect, setTimeSelect] = useState<string>("");
  console.log(fairs);
  console.log(timeSelect);
  console.log(dateSelect);
  console.log(fairSelected);

  useEffect(() => {
    const fetchFair = async () => {
      const res = await getFair();
      setFairs(res);
     
    };
    fetchFair();
  }, []);

  return (
    <FairContext.Provider
      value={{
        fairs,
        setDateSelect,
        setTimeSelect,
        timeSelect,
        dateSelect,
        fairSelected,
        setFairSelected
      }}
    >
      {children}
    </FairContext.Provider>
  );
};

export const useFair = () => {
  const context = useContext(FairContext);
  if (!context) {
    throw new Error("useAuth must be used within an FairContext");
  }
  return context;
};
