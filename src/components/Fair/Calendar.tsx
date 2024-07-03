"use client"

import React, { useState, useRef, useEffect } from 'react'
import  Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'


export const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  //Días de feria. Ver si el ADM lo puede parametrizar
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([
    new Date("2024-07-20"), // Día 1 de la feria
    new Date("2024-07-21"), // Día 2 de la feria
  ]);

  const onChange = (date: Date | null) => {
    setStartDate(date);
  };

  const minDate = new Date();

  return (
    <div className="flex flex-col mt-5">
      {/* <div className="flex flex-col items-center justify-center p-8 bg-secondary-light rounded-lg shadow-md max-w-md mx-auto"> */}
      <label className="text-sm font-semibold sm:text-base">
        Ferias Disponibles
      </label>
      <Datepicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        minDate={new Date()}
        className="w-fit p-2 border border-secondary-default rounded-md shadow-sm cursor-pointer"
        calendarClassName="rounded-lg shadow-md"
        dateFormat="dd/MM/yyyy"
        highlightDates={highlightedDates}
        value="Selecciona una fecha"
      />

      <p className="mt-2 text-md text-primary-darker">
        Día de la feria: {startDate ? startDate.toDateString() : "____"}
      </p>
    </div>
  );
};

export default Calendar
