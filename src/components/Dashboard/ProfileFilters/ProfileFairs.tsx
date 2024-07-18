"use client";
import Dropdown from "@/components/Dropdown";
import Calendar from "@/components/Fair/Calendar";
import Ticket from "@/components/Fair/Ticket";
import TimeRange from "@/components/Fair/TimeRange";
import { useProfile } from "@/context/ProfileProvider";
import { formatDate } from "@/helpers/formatDate";
import { IFair, ProfileFairsProps } from "@/types";
import React, { useEffect, useState } from "react";

const ProfileFairs: React.FC<ProfileFairsProps> = ({
  selectedOption,
  fairs,
  handleSelect,
  fairFilter,
}) => {
  const { userDtos } = useProfile();

  const fairDates = userDtos?.registrations
    ?.filter((registration) => registration.registrationDay)
    .map((registration) =>
      formatDate(new Date(registration.registrationDay as string))
    );

  return (
    <div className="text-primary-dark mt-3 h-full w-fit">
      {(userDtos?.registrations?.length || 0) === 0 ? (
        <>
          <label className="font-bold">Ferias Disponibles</label>
          <div className="flex">
            <Dropdown
              value={selectedOption || "Selecciona una feria"}
              options={fairs?.map((f: IFair | undefined   ) => ({
                id: "",
                name: f ? f.name : "No hay Feria disponible",
              }))}
              onSelect={handleSelect}
              className="w-48 z-10"
            />
          </div>
          {userDtos?.role === "user" && (
            <>
              <Calendar fairDays={fairFilter?.fairDays || []} />
              <TimeRange />
            </>
          )}
          <Ticket name={selectedOption || null} />
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <label className="font-bold">¡Ya tenés tu turno reservado!</label>
            <div className="bg-transparent border-b w-2/3 text-wrap text-sm sm:text-base border-primary-dark">
              {userDtos?.registrations?.map((fairRegistred) => (
                <div
                  key={fairRegistred.id}
                  className="flex justify-between flex-col gap-4"
                >
                  <p>Feria: {fairRegistred.fair?.name}</p>
                  <p>Fecha: {fairDates}</p>
                  <p>Hora: {fairRegistred.registrationHour}</p>
                  <p className="text-sm mt-2">
                    * Revisa tu casilla de correo para obtener el QR que te
                    permitirá ingresar al Showroom
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileFairs;
