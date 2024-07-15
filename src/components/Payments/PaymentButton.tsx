import React from "react";
import { handlePayment } from "./paymentUtils";

interface PaymentButtonProps {
  userId: string | undefined;
  fairId: string | undefined;
  categoryId: string | undefined;
  setPreferenceId: React.Dispatch<React.SetStateAction<string | null>>;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  userId,
  fairId,
  categoryId,
  
  setPreferenceId,
}) => {
  const handleClick = async () => {
    try {
      const preference = await handlePayment(
        userId,
        fairId,
        categoryId,
      );
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return <button onClick={handleClick}>Crear Preferencia</button>;
};

export default PaymentButton;
