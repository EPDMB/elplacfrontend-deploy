// components/MainDashboardUser.tsx

import React, { useState } from "react";
import Welcome from "./Profile";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import DropdownNew from "../Dropdown";
import { useFair } from "@/context/FairProvider";
import Image from "next/image";
import clouds from "@/assets/Cloud2.svg";
import { useProfile } from "@/context/ProfileProvider";
import DashboardCard from "./DashboardCard";
import { dashboardEnum } from "@/types";

const MainDashboardUser: React.FC = () => {
  const { userDtos } = useProfile();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-8 gap-0 relative place-content-center">
      <div className="hidden sm:flex  sm:col-span-1 bg-secondary-lighter">
        <SidebarDashboard userRole={userDtos?.role} />
      </div>
      <div className="bg-secondary-lighter p-16 flex flex-col h-[100vh] sm:col-span-7">
        <h1 className="pb-10 text-primary-darker text-4xl">
          Bienvenid@ <span className="font-bold">{userDtos?.name}!</span>
        </h1>
        <div className="flex gap-4 flex-wrap">
          <DashboardCard
            title="Mi perfil"
            description="Configura tus datos de contacto y medios de pago y claves"
            typeEnum={dashboardEnum.profile}
          />
          <DashboardCard
            title="Vendé tus productos"
            description="Forma parte de nuestra ferias, y vendé tus productos de una manera muy fácil"
            typeEnum={dashboardEnum.changeType}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboardUser;
