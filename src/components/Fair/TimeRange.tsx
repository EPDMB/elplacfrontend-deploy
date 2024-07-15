"use client";
import { useFair } from "@/context/FairProvider";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { IFair, FairDay, BuyerCapacity } from "@/types";

function TimeRange() {
  const { fairs, setTimeSelect, dateSelect } = useFair();

  const [schedulesTurns, setSchedulesTurns] = useState<BuyerCapacity[]>([]);
  console.log(schedulesTurns);
  console.log(dateSelect);

  useEffect(() => {
    if (fairs && dateSelect) {
      const selectedFair = fairs.find((f: IFair) =>
        f.fairDays.some(
          (day: FairDay) =>
            new Date(day.day).toDateString() === dateSelect.toDateString()
        )
      );
      console.log(selectedFair);
      if (selectedFair) {
        const fairDay = selectedFair.fairDays.find(
          (day: FairDay) =>
            new Date(day.day).toDateString() === dateSelect.toDateString()
        );
        if (fairDay) {
          setSchedulesTurns(fairDay.buyerCapacities);
        }
      }
    }
  }, [fairs, dateSelect]);

  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>("");

  const options = [...schedulesTurns].reverse().map((hc) => ({
    id: hc.hour,
    name: `${
      hc.capacity === 0 ? "Agotado" : `Turnos disponibles (${hc.capacity})`
    }`,
  }));

  console.log(options);

  const handleHorarioSelect = (option: { id: string; name: string }) => {
    const selectedHorario = schedulesTurns.find((hc) => hc.hour === option.id);
    if (selectedHorario && selectedHorario.capacity > 0) {
      setHorarioSeleccionado(option.id);
      setTimeSelect(option.id);
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <label className="font-bold">Horario</label>
      <Dropdown
        options={options}
        onSelect={handleHorarioSelect}
        value={horarioSeleccionado || "Selecciona Horario"}
        className="w-48"
      />
    </div>
  );
}

export default TimeRange;
