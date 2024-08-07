"use client";
import React, { useEffect, useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import Dropdown from "../Dropdown";
import { Checkbox } from "flowbite-react";
import Ticket from "../Fair/Ticket";
import { IFair } from "@/types";
import { useFair } from "@/context/FairProvider";
import useFairSelection from "@/helpers/useFairSelection";
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import Navbar from "../Navbar";
import WithAuthProtect from "@/helpers/WithAuth";

const Fairs = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [salesChecked, setSalesChecked] = useState("Elegí una opcion");
  const { userDtos } = useProfile();
  const { activeFair } = useFair();
  const {
    selectedOption,
    categoriesArray,
    selectedOptionCategory,
    openModal,
    setOpenModal,
    handleSelect,
    handleSelectCategory,
    fairDescription,
  } = useFairSelection();

  const activeArray = [activeFair] || [];



  const handleCheckboxChangeTerms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsChecked(event.target.checked);
  };

  const handleDropdownChange = (selectedOption: { name: string }) => {
    setSalesChecked(selectedOption.name);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const fairDates = userDtos?.registrations
    ?.filter((registration) => registration.registrationDay)
    .map((registration) =>
      formatDate(new Date(registration.registrationDay as string))
    );

  return (
    <div className=" bg-secondary-lighter  h-full">
      <div className="w-full h-32 flex items-center bg-primary-lighter">
        <Navbar />
      </div>
      <div className="grid grid-cols-8 gap-0 relative place-content-center">
        <div className="flex col-span-2 sm:col-span-1 bg-secondary-lighter">
          <SidebarDashboard userRole={userDtos?.role} />
        </div>
        <div className="bg-secondary-lighter flex flex-col items-center lg:h-[100vh] col-span-6  sm:col-span-7 ">
          {(userDtos?.seller?.registrations?.length || 0) === 0 ? (
            <div className="flex flex-col justify-center items-center p-5">
              <h1 className="text-primary-darker p-2 font-semibold text-4xl">
                Ferias
              </h1>
              <div className="p-16 pb-32 md:shadow sm:w-[80vw] h-fit flex flex-col text-nowrap">
                <h2 className="text-primary-darker font-semibold mb-3 text-3xl">
                  Inscripción
                </h2>
                <div className="gap-4 flex flex-col lg:flex-row  w-full h-full justify-around">
                  <div className="flex flex-col w-fit sm:w-1/3 gap-5 items-center  text-nowrap">
                    <h2 className="font-semibold text-primary-darker mb-2">
                      Ferias disponibles
                    </h2>
                    <Dropdown
                      value={selectedOption || "Elegí una opcion"}
                      options={activeArray?.map((f: IFair | undefined) => ({
                        id: "",
                        name: f ? f.name : "No hay Feria disponible",
                      }))}
                      onSelect={handleSelect}
                      className="lg:w-full z-20"
                    />
                    <h2 className="font-semibold text-primary-darker mb-2">
                      Categorias disponibles
                    </h2>
                    <Dropdown
                      value={selectedOptionCategory || "Elegí una opcion"}
                      options={categoriesArray?.map((c) => ({
                        id: c.maxSellers.toString(),
                        name: c.category.name,
                      }))}
                      onSelect={handleSelectCategory}
                      className="lg:w-full"
                    />

                    <p className="text-primary-darker mt-5 font-semibold">
                      ¿Participas de la liquidación?
                    </p>
                    <Dropdown
                      value={salesChecked || ""}
                      options={[
                        { id: "", name: "Sí" },
                        { id: "", name: "No" },
                      ]}
                      onSelect={handleDropdownChange}
                      className="lg:w-full"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-1/3 gap-6">
                    <div className="w-full h-32">
                      <h2 className="font-semibold text-primary-darker mb-2">
                        Términos y Condiciones
                      </h2>
                      <p className="text-primary-darker p-5 shadow-md rounded-lg overflow-auto w-full h-full">
                        {fairDescription || "Selecciona una feria"}
                      </p>
                    </div>
                    <div className="text-primary-darker flex items-center gap-2 mt-5">
                      <Checkbox
                        id="acceptTerms"
                        checked={termsChecked}
                        onChange={handleCheckboxChangeTerms}
                      />
                      <p className="">Acepto Términos y Condiciones</p>
                    </div>
                    <div className="flex w-fit ">
                      <Ticket
                        name={selectedOption || ""}
                        salesChecked={salesChecked}
                        category={selectedOptionCategory}
                        termsChecked={termsChecked}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full items-center justify-center pb-16 flex flex-col text-primary-dark gap-16">
              <h1 className="text-primary-darker pt-12 font-semibold text-3xl">
                ¡Ya te registraste para vender! 🎉
              </h1>
              <div className="bg-transparent w-1/3 text-wrap text-sm sm:text-base shadow-lg rounded-lg">
                {userDtos?.seller?.registrations?.map((fairRegistred) => (
                  <div
                    key={fairRegistred.fair?.id}
                    className="flex justify-between flex-col gap-4 text-lg p-2">
                    <p>
                      <strong>Feria:</strong> {fairRegistred.fair?.name}
                    </p>
                    <p className="text-sm mt-2">
                      * Ve a la pestaña de productos y comienza a cargar tus
                      artículos
                    </p>
                    <a
                      href="/dashboard/products"
                      className="mt-4 px-4 py-2 w-fit m-auto text-white rounded-md hover:bg-primary-dark bg-primary-darker text-center">
                      Ir ahora
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithAuthProtect({ Component: Fairs, role: "seller" });
