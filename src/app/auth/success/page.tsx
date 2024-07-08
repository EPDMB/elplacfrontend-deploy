"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChooseRole from "@/components/ChooseRole";
import { decodeJWT } from "@/helpers/decoder";
import { UniqueData } from "@/types";
import { getUniqueData } from "@/helpers/services";
import { useRouter } from "next/navigation";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [openChooseRole, setOpenChooseRole] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const importLdrs = async () => {
      const ldrsModule = await import("ldrs");
      ldrsModule.ring.register();
    };

    importLdrs();

    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);

      try {
        const decodedToken: any = decodeJWT(token);
        const userEmail = decodedToken.email;
        const userId = decodedToken.id;
        setUserId(userId);
        setEmail(userEmail);
        console.log("Email:", userEmail);
        console.log("User ID:", userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleRoleSelection = async () => {
      try {
        const response: UniqueData = await getUniqueData();
        console.log(response);

        const userToCheck = response.userInfo.find(
          (user) =>
            user.email === email &&
            user.email.toLowerCase().includes("gmail") &&
            user.dni.length === 0
        );

        console.log(userToCheck);

        if (userToCheck) {
          console.log("Usuario encontrado:", userToCheck);
          setOpenChooseRole(true);
        } else {
          console.log("No se encontró un usuario que cumpla las condiciones.");
        }
      } catch (error) {
        console.error("Error verificando la relación:", error);
        router.push("/dashboard");
      }
    };

    handleRoleSelection();
  }, [email, token, userId, router]);

  return (
    <div>
      <div className="relative flex items-center justify-center h-full w-full bg-secondary-light">
        <div>
          {openChooseRole && <ChooseRole email={email} userId={userId} />}

          {!openChooseRole && (
            <div className="h-full w-full">
              <l-ring size="80" color="white"></l-ring>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthSuccessWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccess />
    </Suspense>
  );
};

export default AuthSuccessWrapper;
