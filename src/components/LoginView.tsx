"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import loginBanner from "@/assets/loginBanner.png";
import gmailLogo from "@/assets/gmailLogo.svg";
import Link from "next/link";
import { Login } from "./Login";
import GoogleLoginButton from "./GoogleLoginButton";

export const LoginView = () => {
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="py-6 px-14 bg-secondary-light">
      <div className="bg-white h-full formGrid rounded-xl ">
        <div className="loginBanner h-[300px] overflow-hidden" ref={titleRef}>
          <Image
            className=" rounded-t-xl object-cover w-full "
            src={loginBanner}
            alt="portada del login"></Image>
        </div>
        <div className="loginForm flex justify-center">
          <Login />
        </div>

        <div className="loginMessage lg:mt-10">
          <div className="text-center w-full flex h-[45vh] flex-col lg:justify-between">
            <div className="">
              <h1 className="text-primary-darker text-4xl mb-4 font-bold">
                Inicia Sesión
              </h1>
              <div className="flex justify-evenly lg:flex-col">
                <div className="flex items-center lg:flex-col">
                  <div>
                    <p className="text-primary-dark">¿No tenés cuenta?</p>
                    <Link
                      href="/register/buyer"
                      className="text-primary-darker font-bold">
                      ¡Registrate!
                    </Link>
                  </div>
                </div>
                <div className="text-primary-dark lg:my-5 flex flex-col items-center">
                  <p>O ingresa con:</p>

                  <GoogleLoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
