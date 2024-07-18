import { decodeJWT } from "./decoder";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = decodeJWT(token);
    if (!decodedToken || !decodedToken.exp) {

      return true;
    }
    const expirationTime = decodedToken.exp * 1000; //convierto a milisegundos
    return Date.now() > expirationTime; // comparo fecha actual con la de expiracion
  } catch (error) {

    console.error("Failed to decode token:", error);
    return true; //si hay error asume que esta expirado
  }
};
