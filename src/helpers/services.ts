import {
  IPasswordChange,
  IProduct,
  ISeller,
  IUser,
  IUserLogin,
  ProductProps,
  UniqueData,
  UserDto,
} from "@/types";
import { URL } from "../../envs";
import { time } from "console";
import Product from "./products";
import { get } from "http";

//REGISTRO DE USUARIO
export const postUserRegister = async (user: Partial<UserDto>) => {
  try {
    const checkUnique = await getUniqueData();

    const existUserInfo = checkUnique.userInfo.some(
      (unique: Partial<IUser>) =>
        unique.dni === user.dni || unique.email === user.email
    );

    const existSellerInfo = checkUnique.sellerInfo.some(
      (unique: Partial<ISeller>) => unique.bank_account === user.bank_account
    );

    if (existUserInfo || existSellerInfo) {
      throw new Error(
        "Este formulario contiene información que ya está registrada en nuestra base de datos. Dirígete a la sección de Inicio de Sesión e ingresa a tu cuenta"
      );
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
    throw error;
  }
};


//REGISTRO DE VENDEDOR
export const postSellerRegister = async (
  seller: Partial<ISeller>
): Promise<Response> => {
  try {
    const checkUnique = await getUniqueData();

    const existUserInfo = checkUnique.userInfo.some(
      (unique: Partial<IUser>) =>
        unique.dni === seller.dni || unique.email === seller.email
    );

    const existSellerInfo = checkUnique.sellerInfo.some(
      (unique: Partial<ISeller>) => unique.bank_account === seller.bank_account
    );

    if (existUserInfo || existSellerInfo) {
      throw new Error(
        "Este formulario contiene información que ya está registrada en nuestra base de datos. Dirígete a la sección de Inicio de Sesión e ingresa a tu cuenta"
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
    throw new Error("Error al registrar el vendedor");
  }
};

//LOGIN
export const postUserLogin = async (user: IUserLogin) => {
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
    console.error(error);
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
    const res = await fetch(`${URL}/seller/${id}`, {
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
  console.log(token);
  console.log(id);
  console.log(user);
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
    console.log(res);

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
  } catch (error) {
    console.error(
      "Error al enviar la solicitud de restablecimiento de contraseña:",
      error
    );
    throw error;
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
// NO PUDE PROBARLA!!!!
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

// ADMIN DA DE BAJA UN USER
// NO PUDE PROBARLA!!!!
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

export const postInscription = async (
  fairId: string | undefined,
  userId: string | undefined,
  categoryId: string | undefined,
  liquidation: boolean
) => {
  try {
    const res = await fetch(
      `${URL}/sellers/${userId}/register/${fairId}/${categoryId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  console.log(dateSelect);
  console.log(timeSelect);
  console.log(fairId);
  console.log(userId);
  console.log(token);

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
      throw new Error("Error en la petición");
    }

    const data: UniqueData = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener datos únicos");
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

    console.log(data);

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

export const getProducts = async () => {
  try {
    const res = await fetch(`${URL}/products`, {
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

export const createProductRequest = async (
  token: string,
  sellerId: string,
  products: ProductProps[],
  fairId: string,
  category: string
) => {
  console.log(products);
  console.log(fairId);
  console.log(category);
  console.log(sellerId);
  console.log(token);
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
      throw new Error("Error en la petición");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductStatus = async (
  productid: string,
  status: string,
  productReqId: string
) => {
  try {
    const res = await fetch(`${URL}/product-request/${productReqId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productid, status: status }),
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

export const getAllProductRequest = async () => {
  try {
    const res = await fetch(`${URL}/product-request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const blockUser = async (token: string, id: string) => {
  try {
    console.log("id: ", id, "token: ", token);

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
    console.log("id: ", id, "token: ", token);

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

export const getProductRequestById = async (productReqId: string) => {
  try {
    const res = await fetch(`${URL}/product-request/${productReqId}`);
    if (!res.ok) {
      throw new Error("Res was not found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
