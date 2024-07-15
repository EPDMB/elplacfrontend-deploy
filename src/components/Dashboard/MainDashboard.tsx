"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { decodeJWT } from "@/helpers/decoder";
import MainDashboardSeller from "./MainDashboardSeller";
import MainDashboardUser from "./MainDashboardUser";
import { useProfile } from "@/context/ProfileProvider";
import { getUser } from "@/helpers/services";
import Navbar from "../Navbar";
import MainDashboardAdmin from "./Admin/MainDashboardAdmin";
import NavbarAdmin from "../NavbarAdmin";

const MainDashboard: React.FC = () => {
  const { token } = useAuth();
  const { userDtos, setUserDtos } = useProfile();

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

  if (!userDtos) {
    return;
  }

  console.log(userDtos);

  if (userDtos.role === "seller") {
    return (
      <div>
        <div className="w-full h-32 flex items-center">
          <Navbar />
        </div>
        <MainDashboardSeller />
      </div>
    );
  }

  if (userDtos.role === "user") {
    return (
      <div>
        <div className="w-full h-32 flex items-center ">
          <Navbar />
        </div>
        <MainDashboardUser />
      </div>
    );
  }

  if (userDtos.role === "admin") {
    return (
      <div>
        <div className="w-full h-32 flex items-center ">
          <NavbarAdmin />
        </div>
        <MainDashboardAdmin />
      </div>
    );
  }
};

export default MainDashboard;
