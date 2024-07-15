"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  ISeller,
  ProfileImageContextType,
  ProfileImageProviderProps,
  UserDto,
} from "@/types";
import { useAuth } from "./AuthProvider";
import { decodeJWT } from "@/helpers/decoder";
import { getSeller, getUser } from "@/helpers/services";

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(
  undefined
);

export const ProfileImageProvider: React.FC<ProfileImageProviderProps> = ({
  children,
}) => {
  const { token } = useAuth();
  const [userDtos, setUserDtos] = useState<UserDto | null>(null);
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const [sellerDtos, setSellerDtos] = useState<ISeller | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.id) {
        const userProfile = async () => {
          const res = await getUser(token, decoded.id);
          setUserDtos(res);
        };
        userProfile();
      }
    }
  }, [token, setUserDtos]);

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      const sellerId = userDtos?.seller?.id;
      if (decoded && sellerId) {
        const userProfile = async () => {
          const res = await getSeller(token, sellerId);
          setSellerDtos(res);
        };
        userProfile();
      }
    }
  }, [userDtos?.seller?.id, token, setSellerDtos]);

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
        sellerDtos,
        setSellerDtos,
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
