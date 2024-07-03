"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";

export default function Payments() {
  const [userId, setUserId] = useState(
    "fbb60972-6f89-4f72-bf5f-0653d01f2aee"
  ); // Reemplaza con un ID válido
  const [fairId, setFairId] = useState("2c27d46e-64c8-4f77-9c45-e34b0f6ad2b4"); // Reemplaza con un ID válido
  const [transactionType, setTransactionType] = useState("ticket");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago("TEST-e211a22c-ca94-477e-9d15-4fce28331fa5", {
      locale: "es-AR",
    });
  }, []);

  const handlePayment = async () => {
    const response = await fetch(`${URL}/payments/createPreference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fairId,
        userId,
        transactionType,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };
  const handleClick = async () => {
    try {
      const preference = await handlePayment();
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error("Error handling click:", error.message);
    }
  };

  return (
    <div>
      <h1>Generar Pago</h1>
      <button onClick={handleClick}>Crear Preferencia</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
