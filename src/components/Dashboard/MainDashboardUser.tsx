import { DashboardProps, UserDto } from "@/types";
import React from "react";
import Welcome from "./Welcome";
import SidebarDashboard from "./SidebarDashboard";

const MainDashboardUser: React.FC = () => {
 


  return (
    <div className="grid grid-cols-5 gap-0">
      <div className="col-span-1 bg-slate-500">
        <SidebarDashboard />
      </div>
      <div className="col-span-4 sm:col-span-3 bg-orange-700">
        <Welcome/>
      </div>
      <div className="hidden sm:col-span-1 sm:flex justify-end items-end bg-green-500">
        <h1>Nubes</h1>
      </div>
    </div>
  );
};

export default MainDashboardUser;
