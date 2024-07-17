"use client";

import Sidebar from "../SidebarDashboard";
import { useProfile } from "@/context/ProfileProvider";

import { IMainDashboardAdmin, WithAuthProtectProps } from "@/types";
import NavbarAdmin from "@/components/NavbarAdmin";

import WithAuthProtect from "@/helpers/WithAuth";

const MainDashboardAdmin: React.FC<IMainDashboardAdmin> = ({ children }) => {
  const { userDtos } = useProfile();

  return (
    <div>
      <div className="w-full h-32 flex items-center ">
        <NavbarAdmin />
      </div>
      <div>
        <main className="grid grid-cols-8 shadow-md gap-0 relative place-content-center">
          <div className="col-span-1">
            <Sidebar userRole={userDtos?.role} />
          </div>
          <div className="col-span-7 bg-primary-lighter">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboardAdmin;
