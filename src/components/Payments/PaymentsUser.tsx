"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";
import { PaymentsUserProps } from "@/types";

export default function PaymentsUser({
  userId,
  fairId,
  registrationHour,
  registrationDay,
  handleBuy,
  className,
  disabled,
}: PaymentsUserProps) {
  const [transactionType, setTransactionType] = useState("ticket");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago("TEST-e211a22c-ca94-477e-9d15-4fce28331fa5", {
      locale: "es-AR",
    });
  }, []);

  const handlePayment = async (
    userId: string | undefined,
    fairId: string | undefined,
    registrationHour: string | undefined | null,
    registrationDay: string | undefined | null,
  ) => {
    try {

      const response = await fetch(`${URL}/payments/createPreferenceBuyer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          fairId,
          registrationHour,
          registrationDay,
          transactionType,
        }),
      });

      const text = await response.text();

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
      const preference = await handlePayment(
        userId,
        fairId,
        registrationHour,
        registrationDay,

      );
      setPreferenceId(preference.preferenceId);
      if (preferenceId) {
        handleBuy();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={className}
        disabled={disabled}
      >
        Confirmar inscripción
      </button>

      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
