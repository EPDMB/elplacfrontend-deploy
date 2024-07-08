"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";
import { PaymentsSellerProps } from "@/types";

export default function PaymentWorking({
  sellerId,
  fairId,
  categoryId,
}: PaymentsSellerProps) {
  const [transactionType, setTransactionType] = useState("sale");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  
  useEffect(() => {
    initMercadoPago("TEST-e211a22c-ca94-477e-9d15-4fce28331fa5", {
      locale: "es-AR",
    });
  }, []);
  
  const handlePayment = async (
    sellerId: string | undefined,
    fairId: string | undefined,
    categoryId: string | undefined
  ) => {
    try {
        console.log("Body:", JSON.stringify({
            fairId,
            sellerId,
            transactionType,
            categoryId,
            }))
      const response = await fetch(`${URL}/payments/createPreferenceSeller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fairId,
          sellerId,
          transactionType,
          categoryId,
        }),

      });
      
      const text = await response.text();
      console.log("Response text:", text);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (!text) {
        throw new Error("Empty response");
      }
      
      try {
        const data = JSON.parse(text);
        return data;
      } catch (parseError) {
        throw new Error("Error parsing JSON: " + (parseError as Error).message);
      }
    } catch (error: any) {
      console.error("Error fetching payment preference:", error);
      throw error;
    }
  };
  
  const handleClick = async () => {
    try {
      const preference = await handlePayment();
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error(error.message);
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