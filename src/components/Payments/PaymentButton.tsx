import React from "react";
import { handlePayment } from "./paymentUtils";

interface PaymentButtonProps {
  sellerId: string | undefined;
  fairId: string | undefined;
  categoryId: string | undefined;
  transactionType: string;
  setPreferenceId: React.Dispatch<React.SetStateAction<string | null>>;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  sellerId,
  fairId,
  categoryId,
  transactionType,
  setPreferenceId,
}) => {
  const handleClick = async () => {
    try {
      const preference = await handlePayment(
        sellerId,
        fairId,
        categoryId,
        transactionType
      );
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return <button onClick={handleClick}>Crear Preferencia</button>;
};

export default PaymentButton;
