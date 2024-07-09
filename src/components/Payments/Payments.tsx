"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";

export default function Payments() {
  const [sellerId, setSellerId] = useState(
    "3bf2e0c7-3225-4541-84b3-fc4c8b628976"
  ); // Reemplaza con un ID válido
  const [fairId, setFairId] = useState("925a0c03-f4e9-424d-a964-f75fda984c6b"); // Reemplaza con un ID válido
  const [transactionType, setTransactionType] = useState("sale");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(MERCADOPAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, []);

  const handlePayment = async () => {
    const response = await fetch(`${URL}payments/createPreference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fairId,
        sellerId,
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
