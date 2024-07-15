"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeJWT } from "@/helpers/decoder";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const AuthSuccess = () => {
  const searchParams = useSearchParams();
  const { setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const tokenGoogle = searchParams.get("token");

    if (tokenGoogle) {
      localStorage.setItem("token", tokenGoogle);
      setToken(tokenGoogle);

      try {
        const decodedToken: any = decodeJWT(tokenGoogle);
        const userEmail = decodedToken.email;
        const userId = decodedToken.id;
        console.log("Email:", userEmail);
        console.log("User ID:", userId);

        router.push("/dashboard");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="120px"
        height="120px"
        viewBox="0 0 50 50"
        xmlSpace="preserve"
        className="animate-spin"
      >
        <path
          fill="#FFD47B"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        />
      </svg>
    </div>
  );
};

export default AuthSuccess;
