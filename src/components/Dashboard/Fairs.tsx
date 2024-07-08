"use client";
import React, { useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { FaBars } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import Dropdown from "../Dropdown";
import { Checkbox } from "flowbite-react";
import Ticket from "../Fair/Ticket";
import { Category, FairCategories, IFair } from "@/types";

import { useFair } from "@/context/FairProvider";
import useFairSelection from "@/helpers/useFairSelection";

const Fairs = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [salesChecked, setSalesChecked] = useState(false);
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

  console.log(categoriesArray)
  console.log(selectedOptionCategory)

  const handleCheckboxChangeTerms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsChecked(event.target.checked);
  };

  const handleCheckboxChangeSales = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSalesChecked(event.target.checked);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };



  return (
    <div className="grid grid-cols-8 gap-0 relative place-content-center">
      <div className="flex col-span-1 bg-secondary-lighter">
        <SidebarDashboard userRole={userDtos?.role} />
      </div>
      <div
        className={`bg-secondary-lighter flex flex-col items-center lg:h-[100vh] col-span-8 sm:col-span-7`}
      >
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
                label={selectedOption || "Ferias disponibles"}
                options={fairs.map((f: IFair) => ({
                  id: "",
                  name: f.name,
                }))}
                onSelect={handleSelect}
                className="lg:w-[40%] z-20"
              />
              <Dropdown
                label={selectedOptionCategory || "Categorías disponibles"}
                options={categoriesArray?.map((c) => ({
                  id: "",
                  name: c.category.name,
                }))}
                onSelect={handleSelectCategory}
                className="lg:w-[40%]"
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  checked={salesChecked}
                  onChange={handleCheckboxChangeSales}
                />{" "}
                <p>Participas de la liquidación</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  checked={termsChecked}
                  onChange={handleCheckboxChangeTerms}
                />
                <p>Acepto Términos y Condiciones</p>
              </div>
              <div className="flex justify-center w-full mt-5">
                <Ticket
                  name={selectedOption || null}
                  salesChecked={salesChecked}
                  category={selectedOptionCategory}
                  termsChecked={termsChecked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fairs;
