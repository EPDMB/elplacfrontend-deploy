"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";
import { PaymentsSellerProps, PaymentsUserProps } from "@/types";

export default function PaymentsUser({
  userId,
  fairId,
  registrationHour,
  registratonDay,
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
    registratonDay: string | undefined | null,
    transactionType: string | undefined
  ) => {
    try {
      console.log(
        "Body:",
        JSON.stringify({
          userId,
          fairId,
          registrationHour,
          registratonDay,
          transactionType,
        })
      );
      const response = await fetch(`${URL}/payments/createPreferenceBuyer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          fairId,
          registrationHour,
          registratonDay,
          transactionType,
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
      const preference = await handlePayment(
        userId,
        fairId,
        registrationHour,
        registratonDay,
        transactionType
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
