/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notify } from "./Notifications/Notifications";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import gmailLogo from "@/assets/gmailLogo.svg";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.token && !alertShown) {
        const { token } = event.data;
        localStorage.setItem("token", token);
        setToken(token);
        notify("ToastSuccess", "¡Sesión iniciada!");
        setAlertShown(true);
        router.push("/dashboard");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setToken, alertShown]);

  const handleLoginSuccess = () => {
    const width = 500;
    const height = 500;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      "http://localhost:3000/auth/googleLogin",
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <button onClick={handleLoginSuccess}>
      <div className="mt-1 lg:mt-6 w-15 h-15 bg-white border p-2 border-white shadow-[1px_4px_4px_rgba(0,0,0,0.25)] rounded-lg">
        <Image src={gmailLogo} alt="logo de Gmail" className=""></Image>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
