"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChooseRoleProps, UniqueData } from "@/types";
import { getUniqueData, putUser, changeRole } from "@/helpers/services";
import { useAuth } from "@/context/AuthProvider";


const ChooseRole = ({ email, userId }: ChooseRoleProps) => {
  const { token } = useAuth()
  console.log(email);
  const router = useRouter();

  const handleRoleChange = async (userId: string, role: string, token: string) => {
    try {
      const response = await changeRole(userId, role, token);
      console.log(response);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  return (
    <div className="h-[40vh] w-screen flex flex-col justify-center items-center gap-5">

      <div className="flex flex-row gap-5">
        <button
          onClick={() => handleRoleChange(userId, "seller", token)}
          className="text-primary-darker text-4xl font-bold"
        >
          ¿Querés vender?
        </button>
        <button
          onClick={() => handleRoleChange(userId, "user", token)}
          className="text-secondary-darker text-4xl  font-bold"
        >
          ¿Querés comprar?
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
