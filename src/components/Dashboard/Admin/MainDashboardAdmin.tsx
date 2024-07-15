"use client";

import Sidebar from "../SidebarDashboard";
import { useProfile } from "@/context/ProfileProvider";
import AdminProfiles from "./AdminProfiles";
import AdminProducts from "./AdminProducts";
import AdminHome from "./AdminHome";

const MainDashboardAdmin = () => {
  const { userDtos } = useProfile();

  return (
    <div>
      <main className="grid grid-cols-8 shadow-md gap-0 relative place-content-center">
        <div className="col-span-1">
          <Sidebar userRole={userDtos?.role} />
        </div>
        <div className="col-span-7 bg-primary-lighter">
          {/* <AdminProfiles /> */}
          {/* <AdminProducts /> */}
          <AdminHome />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </main>
    </div>
  );
};

export default MainDashboardAdmin;
