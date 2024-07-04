"use client";
import { getFair } from "@/helpers/services";
import {
  IAuthContext,
  IAuthProviderProps,
  IFairContext,
  IFairProviderProps,
  IUser,
} from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { fairPreloaded } from "@/helpers/preloadFair";

const FairContext = createContext<IFairContext | undefined>(undefined);

export const FairProvider: React.FC<IFairProviderProps> = ({ children }) => {
  const { token } = useAuth();
  const [idFair, setIdFair] = useState<string>(
    "dc80c6e8-32eb-4450-b830-87e324e4917b"
  );
  const [fair, setFair] = useState<any>(null);
  const [dateSelect, setDateSelect] = useState<Date>(new Date());
  const [timeSelect, setTimeSelect] = useState<string>("");

console.log(timeSelect);
  console.log(dateSelect); // solo queremos la fecha

  useEffect(() => {
    const fetchFair = async () => {
      const res = fairPreloaded;
      // await getFair(token, idFair);
      setFair(res);
    };
    fetchFair();
  }, [token, idFair]);

  return (
    <FairContext.Provider
      value={{ fair, setDateSelect, setTimeSelect, idFair, timeSelect, dateSelect }}
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
