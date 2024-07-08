"use client";
import { DashboardProps, UserDto, dashboardEnum } from "@/types";
import React, { useState } from "react";
import Welcome from "./Profile";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import DashboardCard from "./DashboardCard";

const MainDashboardSeller: React.FC = () => {
  const { userDtos } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-8 gap-0 relative place-content-center">
      <button className="sm:hidden absolute left-2 top-7" onClick={handleClick}>
        <FaBars style={{ color: "#2f8083" }} />
      </button>

      <div className="hidden sm:flex  sm:col-span-1 bg-secondary-lighter">
        <SidebarDashboard userRole={userDtos?.role} />
      </div>
      <div
        className={`bg-secondary-lighter p-16 flex flex-col h-[100vh]  ${
          isOpen ? "col-span-7" : "col-span-8"
        } sm:col-span-7`}
      >
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
            title="Mis ferias"
            description="Entérate de las próximas ferias, inscribite y se parte de nuestra comunidad"
            typeEnum={dashboardEnum.fairs}
          />
          <DashboardCard
            title="Mis productos"
            description="Vende tus productos, participa de las liquidaciones"
            typeEnum={dashboardEnum.products}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboardSeller;
