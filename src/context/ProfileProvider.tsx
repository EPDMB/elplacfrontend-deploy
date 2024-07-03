"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ProfileImageContextType,
  ProfileImageProviderProps,
  UserDto,
} from "@/types";

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(
  undefined
);

export const ProfileImageProvider: React.FC<ProfileImageProviderProps> = ({
  children,
}) => {
  const [userDtos, setUserDtos] = useState<UserDto | null>(null);
  const [profileImageChanged, setProfileImageChanged] = useState(false);

  const updateUserDtos = (updatedUser: UserDto) => {
    setUserDtos(updatedUser);
  };

  return (
    <ProfileImageContext.Provider
      value={{
        userDtos,
        setUserDtos,
        profileImageChanged,
        setProfileImageChanged,
      }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error(
      "useProfileImageContext debe ser usado dentro de un Provider"
    );
  }
  return context;
};
