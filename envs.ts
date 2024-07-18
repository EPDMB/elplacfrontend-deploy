import dotenv from "dotenv";
dotenv.config();

export const URL: string = process.env.API_URL || "https://myapp-backend-latest.onrender.com";
export const MERCADOPAGO_PUBLIC_KEY: string =
  process.env.MERCADOPAGO_PUBLIC_KEY || "TEST-e211a22c-ca94-477e-9d15-4fce28331fa5";
