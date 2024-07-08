import { URL } from "../../../envs";

export const handlePayment = async (
  sellerId: string | undefined,
  fairId: string | undefined,
  categoryId: string | undefined,
  transactionType: string
) => {
  try {
    const response = await fetch(`${URL}payments/createPreferenceSeller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId: sellerId,
        fairId: fairId,
        transactionType: transactionType,
        categoryId: categoryId
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
