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
  const [activeFair, setActiveFair] = useState<IFair | undefined>(undefined);



  useEffect(() => {
    const fetchFair = async () => {
      const res: IFair[] = await getFair();
      setFairs(res);
      setActiveFair(res.find((fair: IFair) => fair.isActive === true));
    };
    fetchFair();
  }, []);

  return (
    <FairContext.Provider
      value={{
        fairs,
        activeFair,
        setDateSelect,
        setTimeSelect,
        timeSelect,
        dateSelect,
        fairSelected,
        setFairSelected,
      }}>
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
