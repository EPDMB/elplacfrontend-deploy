import Dropdown from "@/components/Dropdown";
import Calendar from "@/components/Fair/Calendar";
import Ticket from "@/components/Fair/Ticket";
import TimeRange from "@/components/Fair/TimeRange";
import { useProfile } from "@/context/ProfileProvider";
import { IFair, ProfileFairsProps } from "@/types";
import React from "react";

const ProfileFairs: React.FC<ProfileFairsProps> = ({
  selectedOption,
  fairs,
  handleSelect,
  fairFilter,
}) => {
  const { userDtos } = useProfile();
  return (
    <div className=" text-primary-dark mt-3 h-full w-fit">
      <label className="font-bold">Ferias Disponibles</label>

      <div className="flex">
        <Dropdown
          label={selectedOption || "Selecciona una feria"}
          options={fairs.map((f: IFair) => ({
            id: "",
            name: f.name,
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
      <br />
      <label className="font-bold"> Historial de Ferias</label>
      <div className="bg-transparent border-b text-wrap text-sm sm:text-base border-primary-dark">
        {userDtos?.userFairs || "¡No has participado en ninguna feria todavía!"}
      </div>
    </div>
  );
};

export default ProfileFairs;
