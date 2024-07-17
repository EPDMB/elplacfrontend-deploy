"use client";

import React, { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFair } from "@/context/FairProvider";
import { CalendarProps } from "@/types";


export const Calendar: React.FC<CalendarProps> = ({ fairDays = [] }) => {
  const [dateSelect, setDate] = useState<Date | null>(null);
  const { fairs, setDateSelect } = useFair();
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);


  useEffect(() => {
    if (fairDays.length > 0) {
      const datesMapping = fairDays.map((day) => {
        const date = new Date(day.day);

        date.setHours(date.getHours() + 3);

        return date;
      });

      setHighlightedDates(datesMapping);
    }
  }, [fairDays]);


  const onChange = (date: Date | null) => {
    if (date) {
      setDate(date);
      setDateSelect(date);
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <label className="font-bold">Fecha</label>
      <Datepicker
        selected={dateSelect}
        onChange={onChange}
        minDate={new Date()}
        className="flex items-center justify-between w-48 p-2 rounded-md bg-secondary-lighter placeholder:text-primary-dark text-primary-dark shadow-md cursor-pointer"
        calendarClassName="rounded-lg shadow-md relative z-20 cursor-pointer"
        dateFormat="dd/MM/yyyy"
        highlightDates={highlightedDates}
        shouldCloseOnSelect={true}
        focusSelectedMonth={true}
        placeholderText="Selecciona una fecha 🗓"
      />
    </div>
  );
};

export default Calendar;
