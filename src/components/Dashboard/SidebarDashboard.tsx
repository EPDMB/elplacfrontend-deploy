"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { ISidebarProps } from "@/types";

import {
  IoHomeSharp,
  IoHomeOutline,
  IoPersonOutline,
  IoPersonSharp,
  IoShirtOutline,
  IoShirtSharp,
} from "react-icons/io5";
import { PiHandCoinsFill } from "react-icons/pi";
import { PiCoatHanger } from "react-icons/pi";
import Link from "next/link";
import { useProfile } from "@/context/ProfileProvider";
import { useFair } from "@/context/FairProvider";
import { verifyUserDetails } from "@/helpers/verifyUserDetails";

const Sidebar: React.FC<ISidebarProps> = ({ userRole }) => {
  const { userDtos, sellerDtos } = useProfile();
  const [verificationMsg, setVerificationMsg] = useState<string | null>(null);

  const [isRegisteredAtFair, setIsRegisteredAtFair] = useState<boolean>(false);
  const { activeFair } = useFair();

  useEffect(() => {
    const checkRegister = async () => {
      if (sellerDtos?.registrations) {
        const isRegistered = sellerDtos.registrations.some(
          (registration) => registration.fair.name === activeFair?.name
        );

        setIsRegisteredAtFair(isRegistered);
      }
    };

    checkRegister();
  }, [sellerDtos, activeFair]);

  useEffect(() => {
    const checkingMail = async () => {
      if (userDtos) {
        const verificationMessage = verifyUserDetails(userDtos);
        if (verificationMessage) {
          setVerificationMsg(verificationMessage);
        }
      }
    };

    checkingMail();
  }, [userDtos]);

  return (
    <div
      className={`w-full h-full z-10 shadow-2xl flex flex-col items-center justify-start gap-8 pt-10 ${
        userRole === "seller"
          ? "bg-secondary-default"
          : userRole === "user"
          ? "bg-primary-default"
          : "bg-primary-darker"
      }`}>
      {userRole === "admin" && (
        <div className="flex flex-col items-start gap-10 text-primary-lighter font-medium">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/fairs">Ferias</Link>
          <Link href="/admin/products">Productos</Link>
          <Link href="/admin/profiles">Perfiles</Link>
          <Link href="/admin/postFair">Administración</Link>
        </div>
      )}
      {userRole === "seller" && (
        <div className="flex flex-col items-start gap-10">
          <button>
            <Link href="/dashboard">
              <IoHomeOutline
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/profile">
              <IoPersonOutline
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          {!verificationMsg ? (
            <button>
              <Link href="/dashboard/fairs">
                <PiCoatHanger
                  className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                  style={{ color: "#2f8083" }}
                  size={40}
                />
              </Link>
            </button>
          ) : (
            <button className="cursor-not-allowed">
              <PiCoatHanger
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </button>
          )}

          {isRegisteredAtFair ? (
            <button>
              <Link href="/dashboard/products">
                <IoShirtOutline
                  className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                  style={{ color: "#2f8083" }}
                  size={40}
                />
              </Link>
            </button>
          ) : (
            <button className="cursor-not-allowed">
              <IoShirtOutline
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </button>
          )}
        </div>
      )}
      {userRole === "user" && (
        <div className="flex flex-col items-start gap-10 ">
          <button>
            <Link href="/dashboard">
              <IoHomeOutline
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/profile">
              <IoPersonOutline
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/changeType">
              <PiHandCoinsFill
                className="w-8 h-8 md:w-14 md:h-14 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
