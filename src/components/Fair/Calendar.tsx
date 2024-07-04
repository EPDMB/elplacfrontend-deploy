"use client"

import React, { useState, useRef, useEffect } from 'react'
import  Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import { useFair } from '@/context/FairProvider'


export const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { fair, setDateSelect } = useFair();

  

  const dateStartFair = fair.dateStartFair.split("T")[0];
  const dateEndFair = fair.dateEndFair.split("T")[0];

  //Días de feria. Ver si el ADM lo puede parametrizar
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([
    new Date (dateStartFair),
    new Date (dateEndFair),
  ]);

  const onChange = (date: Date) => {
    if (date) {
      setStartDate(date);
      setDateSelect(date);
    }
  };

  const minDate = new Date();

  return (
    <div className="flex flex-col mt-5">
      {/* <div className="flex flex-col items-center justify-center p-8 bg-secondary-light rounded-lg shadow-md max-w-md mx-auto"> */}

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
