/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFair } from "@/context/FairProvider";
import React, { use, useEffect, useState } from "react";

const Ticket = () => {
  const [monto, setMonto] = useState<number | string>("");
  const [entidadBenefica, setEntidadBenefica] = useState("");
  const { fair, idFair, timeSelect, dateSelect } = useFair();

  const fairSelected = {
    idFair,
    timeSelect,
    dateSelect,
  };

  useEffect(() => {
    if (fair && fair.entryPrice !== undefined) {
      if (fair.entryPrice > 0) {
        setMonto(fair.entryPrice); // Ejemplo (esto debe parametrizarlo el ADM)
        setEntidadBenefica(fair.entryDescription); // Ejemplo (esto debe parametrizarlo el ADM)
      } else {
        setMonto("");
        setEntidadBenefica("");
      }
    }
  }, [fair]);

  const handlePagar = () => {
    alert(`Pagar ${monto} a ${entidadBenefica}`);
  };

  // La lógica de si "TIENE COSTO?" La puse para ver cómo renderizaba. Por defecto debe aparecer SIN COSTO
  return (
    <div className="mt-5">
      <div className="flex items-center"></div>
      {fair?.entryPrice === 0 ? (
        <input
          type="text"
          value="Sin costo"
          readOnly
          className="mt-1 block w-80 px-3 py-2 border rounded-md shadow-sm bg-primary-lighter text-primary-darker"
        />
      ) : (
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-primary-darker">
              Precio:
            </label>
            <input
              type="text"
              value={monto}
              readOnly
              className="mt-1 block w-80 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-primary-default"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darker">
              Descripción
            </label>
            <input
              type="text"
              value={entidadBenefica}
              readOnly
              className="mt-1 block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-primary-default"
            />
          </div>

          {/* Debe redirigir a la pasarela de pago */}
          <button
            onClick={handlePagar}
            className="mt-4 px-4 py-2 bg-primary-default text-white rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-darker"
          >
            Pagar
          </button>
        </div>
      )}
    </div>
  );
};

export default Ticket;
