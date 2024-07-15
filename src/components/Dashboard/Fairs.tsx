"use client";
import React, { useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import Dropdown from "../Dropdown";
import { Checkbox } from "flowbite-react";
import Ticket from "../Fair/Ticket";
import { Category, FairCategories, IFair, SelectedOption } from "@/types";

import { useFair } from "@/context/FairProvider";
import useFairSelection from "@/helpers/useFairSelection";
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import Navbar from "../Navbar";

const Fairs = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [salesChecked, setSalesChecked] = useState("Elige una opción"); 
  const { userDtos } = useProfile();
  const { fairs } = useFair();
  const {
    selectedOption,
    categoriesArray,
    selectedOptionCategory,
    openModal,
    setOpenModal,
    handleSelect,
    handleSelectCategory,
  } = useFairSelection();

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
        <div className="flex col-span-1 bg-secondary-lighter">
          <SidebarDashboard userRole={userDtos?.role} />
        </div>
        <div className="bg-secondary-lighter flex flex-col items-center lg:h-[100vh] col-span-8 sm:col-span-7">
          {(userDtos?.seller?.registrations?.length || 0) === 0 ? (
            <div className="p-5">
              <h1 className="text-primary-darker p-2 font-semibold text-4xl">
                Ferias
              </h1>
              <div className="p-16 pb-32 md:shadow w-[80vw] h-fit">
                <h2 className="text-primary-darker font-semibold mb-3 text-3xl">
                  Inscripción
                </h2>
                <div className="gap-5 flex flex-col lg:ml-32 h-full">
                  <Dropdown
                    value={selectedOption || "Ferias disponibles"}
                    options={fairs.map((f: IFair) => ({
                      id: "",
                      name: f.name,
                    }))}
                    onSelect={handleSelect}
                    className="lg:w-[40%] z-20"
                  />
                  <Dropdown
                    value={selectedOptionCategory || "Categorías disponibles"}
                    options={categoriesArray?.map((c) => ({
                      id: c.maxSellers.toString(),
                      name: c.category.name,
                    }))}
                    onSelect={handleSelectCategory}
                    className="lg:w-[40%]"
                  />

                  <div className="flex justify-center gap-2 flex-col">
                    <p>Participas de la liquidación</p>
                    <Dropdown
                      value={salesChecked || ""}
                      options={[
                        { id: "", name: "Sí" },
                        { id: "", name: "No" },
                      ]}
                      onSelect={handleDropdownChange}
                      className="lg:w-[40%]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={termsChecked}
                      onChange={handleCheckboxChangeTerms}
                    />
                    <p>Acepto Términos y Condiciones</p>
                  </div>
                  <div className="flex justify-center w-full mt-5">
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
          ) : (
            <div className="flex flex-col text-primary-dark">
              <h1 className="text-primary-darker p-2 pt-12 font-semibold text-3xl">
                ¡Ya te registraste para vender! 🎉
              </h1>
              <div className="bg-transparent border-b w-2/3 text-wrap text-sm sm:text-base border-primary-dark">
                {userDtos?.seller?.registrations?.map((fairRegistred) => (
                  <div
                    key={fairRegistred.fair?.id}
                    className="flex justify-between flex-col gap-4 text-lg p-2"
                  >
                    <p>Feria: {fairRegistred.fair?.name}</p>
                    <p className="text-sm mt-2">
                      * Ve a la pestaña de productos y comienza a cargar tus
                      artículos
                    </p>
                    <button className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light">
                      <Link href="/dashboard/products">Ir ahora</Link>
                    </button>
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

export default Fairs;
