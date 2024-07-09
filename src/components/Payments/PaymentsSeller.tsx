"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { MERCADOPAGO_PUBLIC_KEY, URL } from "../../../envs";
import { PaymentsSellerProps } from "@/types";

export default function PaymentsSeller({
  userId,
  fairId,
  categoryId,
  handleBuy,
  disabled,
  className,
}: PaymentsSellerProps) {
  const [transactionType, setTransactionType] = useState("sale");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago("TEST-e211a22c-ca94-477e-9d15-4fce28331fa5", {
      locale: "es-AR",
    });
  }, []);

  console.log(categoryId);

  const handlePayment = async (
    userId: string | undefined,
    fairId: string | undefined,
    categoryId: string | undefined,
    transactionType: string
  ) => {
    try {
      if (!userId || !fairId || !categoryId || !transactionType) {
        console.error("Missing parameters:", {
          userId,
          fairId,
          categoryId,
          transactionType,
        });
        throw new Error("Missing parameters");
      }

      console.log("Parameters:", {
        userId,
        fairId,
        categoryId,
        transactionType,
      });

      const response = await fetch(`${URL}payments/createPreferenceSeller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          fairId,
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
      console.log("Calling handlePayment with parameters:", {
        userId,
        fairId,
        categoryId,
        transactionType,
      });
      const preference = await handlePayment(
        userId,
        fairId,
        categoryId,
        transactionType
      );
      console.log("Preference:", preference);
      if (preference && preference.preferenceId) {
        setPreferenceId(preference.preferenceId);
        if (preferenceId) {
          handleBuy();
        }
      } else {
        throw new Error("Invalid preference response");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleClick} className={className} disabled={disabled}>
        Generar Pago
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
