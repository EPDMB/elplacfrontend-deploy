import {
  IPasswordChange,
  IProduct,
  ISeller,
  IUser,
  IUserLogin,
  ProductProps,
  UniqueData,
  UserDto,
  FairDto,
} from "@/types";
import { URL } from "../../envs";
import { time } from "console";
import Product from "./products";
import { get } from "http";
import { isTokenExpired } from "./auth";

//REGISTRO DE USUARIO
export const postUserRegister = async (user: Partial<UserDto>) => {
  try {
    const checkUnique = await getUniqueData();

    const existUserDni = checkUnique.userInfo.some(
      (unique: Partial<IUser>) => unique.dni === user.dni
    );

    const existUserEmail = checkUnique.userInfo.some(
      (unique: Partial<IUser>) => unique.email === user.email
    );

    if (existUserDni) {
      throw new Error("Este dni ya está registrada en nuestra base de datos");
    }

    if (existUserEmail) {
      throw new Error("Este email ya está registrado en nuestra base de datos");
    } else {
      const res = await fetch(`${URL}/auth/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Error en el registro");
      }

      return res;
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Error en el registro");
  }
};

//REGISTRO DE VENDEDOR
export const postSellerRegister = async (
  seller: Partial<ISeller>
): Promise<Response> => {
  try {
    const checkUnique = await getUniqueData();

    const existUserDni = checkUnique.userInfo.some(
      (unique: Partial<IUser>) => unique.dni === seller.dni
    );

    const existUserEmail = checkUnique.userInfo.some(
      (unique: Partial<IUser>) => unique.email === seller.email
    );

    const existSellerInfo = checkUnique.sellerInfo.some(
      (unique: Partial<ISeller>) => unique.bank_account === seller.bank_account
    );

    if (existUserDni) {
      throw new Error("Este dni ya está registrada en nuestra base de datos");
    }

    if (existUserEmail) {
      throw new Error("Este email ya está registrado en nuestra base de datos");
    }

    if (existSellerInfo) {
      throw new Error(
        "Este CBU/CBU/Alias ya está registrado en nuestra base de datos"
      );
    }

    const res = await fetch(`${URL}/auth/register/seller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller),
    });


    if (!res.ok) {
      throw new Error("Error en el registro");
    }

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Error en el registro");
  }
};

//LOGIN
export const postUserLogin = async (
  user: IUserLogin & { rememberMe: boolean }
) => {
  try {
    const res = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }
    const data = await res.json();

    return data;
  } catch (error: any) {
    throw error;
  }
};

//OBTENER USUARIO POR ID
export const getUser = async (token: string, id: string) => {
  try {
    const res = await fetch(`${URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//OBTENER SELLER POR ID
export const getSeller = async (token: string, id: string) => {
  try {
    const res = await fetch(`${URL}/sellers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error en la petición", errorData);
      throw new Error(
        `Error ${res.status}: ${errorData.message || res.statusText}`
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//ACTUALIZAR USUARIO
export const putUser = async (
  token: string,
  id: string,
  user: Partial<UserDto>
) => {
  try {
    const res = await fetch(`${URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

export const putSeller = async (
  token: string,
  id: string,
  user: Partial<UserDto>
) => {

  try {
    const res = await fetch(`${URL}/sellers/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

//ACTUALIZAR ROL DE USUARIO
export const changeRole = async (
  userId: string,
  role: string,
  token: string
) => {
  try {
    const res = await fetch(`${URL}/users/changeRole/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: role }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

//CAMBIAR CONTRASEÑA DESDE EL PERFIL
export const putChangePassword = async (
  id: string,
  token: string,
  pass: Partial<IPasswordChange>
) => {
  try {
    const res = await fetch(`${URL}/users/update-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pass),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

// RECUPERO DE CONTRASEÑA "OLVIDE MI CONTRASEÑA"
// TIENE QUE SOLICITAR AL USUARIO QUE ESCRIBA SU CORREO Y LE
// LLEGA UN MAIL CON UN BOTON "REESTABLECER CONTRASEÑA" QUE LO
// DEBE REDIRIGIR AL FORMULARIO - FUNCIONA (SE SUPONE)
export const postForgotPassword = async (email: string) => {
  try {
    const checkUnique = await getUniqueData();

    const existUserEmail = checkUnique.userInfo.some(
      (unique: Partial<IUser>) => unique.email === email
    );

    if (!existUserEmail) {
      throw new Error("Este email no está registrado en nuestra base de datos");
    }

    const res = await fetch(`${URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error(errorText || "Error en la petición");
    }
    const responseText = await res.text();
    if (responseText) {
      return JSON.parse(responseText);
    } else {
      return {};
    }
  } catch (error: any) {
    console.error(
      "Error al enviar la solicitud de restablecimiento de contraseña:",
      error
    );
    throw new Error(error.message || "Error en el registro");
  }
};

// FORMULARIO PARA RESTABLECER CONTRASEÑA DONDE ESCRIBE SU NUEVA CONTRASEÑA Y LA CONFIRMA
// NO PUDE PROBARLA!!!!
export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const res = await fetch(`${URL}/auth/reset-password/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error(errorText || "Error en la petición");
    }

    const responseText = await res.text();
    if (responseText) {
      return JSON.parse(responseText);
    } else {
      return {};
    }
  } catch (error) {
    console.error(
      "Error al enviar la solicitud de restablecimiento de contraseña:",
      error
    );
    throw error;
  }
};

//OBTENER TODOS LOS USUARIOS
export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusUser = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(`${URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error: ${errorText}`);
      throw new Error(errorText || "Error en la petición");
    }
    const responseText = await res.text();
    try {
      const responseData = JSON.parse(responseText);
      return responseData;
    } catch (error) {
      console.error("Error al parsear respuesta JSON:", error);
      throw new Error("Respuesta del servidor no es un JSON válido");
    }
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    throw error;
  }
};

export const getFair = async () => {
  try {
    const res = await fetch(`${URL}/fairs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFairStatus = async (token:string, fairId:string | undefined) => {
  try {
    const res = await fetch(`${URL}/fairs/close/${fairId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postInscription = async (
  fairId: string | undefined,
  userId: string | undefined,
  categoryId: string | undefined,
  liquidation: string,
  token: string
) => {
  try {
    const res = await fetch(
      `${URL}/sellers/${userId}/register/${fairId}/${categoryId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(liquidation),
      }
    );
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postTicket = async (
  fairId: string | undefined,
  userId: string,
  token: string,
  dateSelect: string | null,
  timeSelect: string
) => {


  try {
    const res = await fetch(`${URL}/users/${userId}/register/fair/${fairId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectedHour: timeSelect,
        selectedDay: dateSelect,
      }),
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUniqueData = async (): Promise<UniqueData> => {
  try {
    const res = await fetch(`${URL}/users/uniquedata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error en unique data");
    }

    const data: UniqueData = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error en el unique data");
  }
};

export const checkIsGmailfirstTime = async (email: string) => {
  try {
    const res = await fetch(`${URL}/users/uniquedata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error en la petición");
    }

    const data = await res.json();


    if (data.dni === "" && data.bankAccount === "") {
      return "Por favor, completa tu DNI y tu cuenta bancaria.";
    } else if (data.dni === "") {
      return "Por favor, completa tu DNI.";
    } else if (data.bankAccount === "") {
      return "Por favor, completa tu cuenta bancaria.";
    } else {
      return "Datos completos.";
    }
  } catch (error) {
    console.error(error);
    return "Ha ocurrido un error al verificar los datos.";
  }
};

//PRODUCTOS

export const getProducts = async (token: string) => {
  try {
    const res = await fetch(`${URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createProductRequest = async (
  token: string,
  sellerId: string,
  products: ProductProps[],
  fairId: string,
  category: string
) => {

  try {
    const res = await fetch(`${URL}/product-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        sellerId: sellerId,
        products: products,
        fairId: fairId,
        category: category,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error en la petición", errorData);
      throw new Error(
        `Error ${res.status}: ${errorData.message || res.statusText}`
      );
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductStatus = async (
  productId: string,
  status: string,
  productReqId: string,
  token: string
) => {
  try {
    const res = await fetch(`${URL}/product-request/${productReqId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //ADMIN TOKEN
      },

      body: JSON.stringify({ productId: productId, status: status }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error en la petición", errorData);
      throw new Error(
        `Error ${res.status}: ${errorData.message || res.statusText}`
      );
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error en la función updateProductStatus:", error);
  }
};

export const putProductStatus = async (
  id: string,
  status: string,
  token: string
) => {
  try {
    const res = await fetch(`${URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //ADMIN TOKEN
      },
      body: JSON.stringify({ status: status }),
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const checkedProductRequest = async (id: string, token: string) => {
  try {
    const res = await fetch(`${URL}/product-request/check/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProductRequest = async (token: string) => {
  try {
    const res = await fetch(`${URL}/product-request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //ADMIN TOKEN
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async (token: string) => {
  try {
    const res = await fetch(`${URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //ADMIN TOKEN
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const blockUser = async (token: string, id: string) => {
  try {

    const res = await fetch(`${URL}/users/block/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

export const unblockUser = async (token: string, id: string) => {
  try {

    const res = await fetch(`${URL}/users/unblock/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductRequestById = async (
  productReqId: string,
  token: string
) => {
  try {
    const res = await fetch(`${URL}/product-request/${productReqId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Res was not found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

//CREAR FERIA
export const postCreateFair = async (fairData: FairDto, token: string) => {

  try {
    const res = await fetch(`${URL}/fairs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fairData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error en la petición", errorData);
      throw new Error(
        `Error ${res.status}: ${errorData.message || res.statusText}`
      );
    }

    return res.json();
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al crear la feria SERVICES");
  }
};

export const getProductsBySeller = async (
  sellerId: string | undefined,
  token: string
) => {
  try {
    const res = await fetch(`${URL}/products/seller/${sellerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //SELLER TOKEN
      },
    });
    if (!res.ok) {
      throw new Error("Res was not found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
