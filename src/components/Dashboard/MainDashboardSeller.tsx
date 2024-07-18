"use client";
import { DashboardProps, UserDto, dashboardEnum } from "@/types";
import React, { useEffect, useState } from "react";
import Welcome from "./Profile";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import DashboardCard from "./DashboardCard";
import { verifyUserDetails } from "@/helpers/verifyUserDetails";
import WithAuthProtect from "@/helpers/WithAuth";
import { useFair } from "@/context/FairProvider";
import fairs from "@/assets/dashboard3.svg";
import Image from "next/image";
import { IoShirtOutline } from "react-icons/io5";

const MainDashboardSeller: React.FC = () => {
  const { userDtos, sellerDtos } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
            message={verificationMsg}
            classname="p-5 relative bg-secondary-light text-wrap w-80 rounded-[2.5rem] h-48 shadow-xl"
          />
          <DashboardCard
            title={
              verificationMsg ? (
                <span className="flex gap-2">
                  {verificationMsg && (
                    <Image
                      src={fairs}
                      alt="Icono de ferias"
                      style={{ color: "#2f8083" }}
                      width={30}
                      height={30}
                    />
                  )}
                  Mis Ferias
                </span>
              ) : (
                "Mis Ferias"
              )
            }
            description={
              verificationMsg ? (
                "Completá los datos faltantes y recarga la página para poder inscribirte a las ferias "
              ) : isRegisteredAtFair ? (
                "Enterate de las próximas ferias, inscribite y sé parte de nuestra comunidad"
              ) : (
                <>
                  Entérate de las próximas ferias, <strong>inscribite</strong> y{" "}
                  <strong>sé parte de nuestra comunidad</strong>
                </>
              )
            }
            typeEnum={!verificationMsg ? dashboardEnum.fairs : ""}
            classname={`p-5 relative bg-secondary-light text-wrap w-80 rounded-[2.5rem] h-48 shadow-xl ${
              verificationMsg ? "cursor-not-allowed" : ""
            }`}
          />
          <DashboardCard
            title={
              verificationMsg || !isRegisteredAtFair ? (
                <span className="flex gap-2">
                  {(
                    <IoShirtOutline style={{ color: "#2f8083" }} size={30} />
                  )}
                  Mis Productos
                </span>
              ) : (
                "Mis Productos"
              )
            }
            description={
              verificationMsg || !isRegisteredAtFair ? (
                <span className="flex gap-2">
                  ¡Inscribite para empezar a vender!
                </span>
              ) : (
                "Vende tus productos, participa de las liquidaciones"
              )
            }
            typeEnum={isRegisteredAtFair ? dashboardEnum.products : ""}
            classname={`p-5 relative bg-secondary-light text-wrap w-80 rounded-[2.5rem] h-48 shadow-xl ${
              !isRegisteredAtFair ? "cursor-not-allowed bg-slate-200" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default WithAuthProtect({
  Component: MainDashboardSeller,
  role: "seller",
});
