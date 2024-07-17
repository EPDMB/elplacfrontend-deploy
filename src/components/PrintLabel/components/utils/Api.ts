import { URL } from "../../../../../envs";
import { ProductPrinter } from "./Product.type";

export const fetchProducts = async (
  sellerId: string | undefined,
  token: string
): Promise<ProductPrinter[]> => {
  const response = await fetch(`${URL}/products/seller/${sellerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  return response.json();
};
