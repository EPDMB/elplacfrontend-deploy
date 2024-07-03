import dotenv from "dotenv";
dotenv.config();

export const URL: string = process.env.API_URL || "http://localhost:3000";
export const MERCADOPAGO_PUBLIC_KEY: string =
  process.env.MERCADOPAGO_PUBLIC_KEY || " ";
