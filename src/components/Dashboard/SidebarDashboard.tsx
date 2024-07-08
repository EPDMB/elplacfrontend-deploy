"use client";
import Image from "next/image";
import React, { useState } from "react";
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

const Sidebar: React.FC<ISidebarProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-full h-full z-10 shadow-2xl flex flex-col items-center justify-start gap-8 pt-10 ${
        userRole === "admin"
          ? "bg-secondary-default"
          : userRole === "user"
          ? "bg-primary-default"
          : "bg-primary-default"
      }`}>
      {userRole === "seller" && (
        <div className="flex flex-col items-start gap-4">
          <button>
            <Link href="/dashboard">
              <IoHomeOutline
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/profile">
              <IoPersonOutline
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/fairs">
              <PiCoatHanger
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/products">
              <IoShirtOutline
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
        </div>
      )}
      {userRole === "user" && (
        <div className="flex flex-col items-start gap-4 ">
          <button>
            <Link href="/dashboard">
              <IoHomeOutline
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button onClick={handleClick}>
            <Link href="/dashboard/profile">
              <IoPersonOutline
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
                style={{ color: "#2f8083" }}
                size={40}
              />
            </Link>
          </button>
          <button>
            <Link href="/dashboard/changeType">
              <PiHandCoinsFill
                className="w-12 h-12 p-2 rounded-md shadow-lg bg-secondary-light"
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
