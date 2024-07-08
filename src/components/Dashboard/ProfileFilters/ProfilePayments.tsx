import { useProfile } from "@/context/ProfileProvider";
import React from "react";

const ProfilePayments = () => {
  const { userDtos, setUserDtos } = useProfile();
  return (
    <div className=" py-4 text-primary-dark">
      <label className="text-sm font-bold sm:text-base">
        CBU / CVU / Alias
      </label>
      <div className="bg-transparent border-b border-primary-dark ">
        {userDtos?.bank_account || "No especificado"}
      </div>

      <label className="text-sm font-bold sm:text-base">
        Tarjeta de crédito
      </label>
      <div className="bg-transparent border-b border-primary-dark ">
        {userDtos?.credit_card || "No especificado"}
      </div>
    </div>
  );
};

export default ProfilePayments;
