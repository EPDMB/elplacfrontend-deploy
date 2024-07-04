"use client";
import { DashboardProps, UserDto } from "@/types";
import React, { useState } from "react";
import Welcome from "./Welcome";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";

const MainDashboardUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-8 gap-0 relative">
      <button className="sm:hidden absolute left-2 top-7" onClick={handleClick}>
        <FaBars style={{ color: "#2f8083" }} />
      </button>

      {isOpen && (
        <div className="sm:hidden col-span-1 bg-secondary-lighter">
          <SidebarDashboard />
        </div>
      )}
      <div className="hidden sm:flex  sm:col-span-1 bg-secondary-lighter">
        <SidebarDashboard />
      </div>

      <div
        className={`bg-secondary-lighter ${
          isOpen ? "col-span-7" : "col-span-8"
        } sm:col-span-6`}
      >
        <Welcome />
      </div>

      <div className="hidden sm:col-span-1 sm:flex justify-end items-end  bg-secondary-dark">
        <h1>Nubes</h1>
      </div>
    </div>
  );
};

export default MainDashboardUser;
