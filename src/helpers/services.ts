import { IPasswordChange, ISeller, IUser, IUserLogin, UserDto } from "@/types";
import { URL } from "../../envs";

//REGISTRO DE USUARIO
export const postUserRegister = async (user: Partial<IUser>) => {
  try {
    const res = await fetch(`${URL}/auth/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

//REGISTRO DE VENDEDOR
export const postSellerRegister = async (user: ISeller) => {
  try {
    const res = await fetch(`${URL}/auth/register/seller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return res;
  } catch (error: any) {
    console.error(error);
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
    const res = await fetch(`https://myapp-backend-latest.onrender.com/users/${id}`, {
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
    const res = await fetch(`https://myapp-backend-latest.onrender.com/users/${id}`, {
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

//CAMBIAR CONTRASEÑA DESDE EL PERFIL
export const putChangePassword = async (
  id: string,
  token: string,
  pass: Partial<IPasswordChange>
) => {
  try {
    const res = await fetch(
      `https://myapp-backend-latest.onrender.com/users/update-password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pass),
      }
    );
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
    console.error("Error al enviar la solicitud de restablecimiento de contraseña:", error);
    throw error;
  }
};

// FORMULARIO PARA RESTABLECER CONTRASEÑA DONDE ESCRIBE SU NUEVA CONTRASEÑA Y LA CONFIRMA
// NO PUDE PROBARLA!!!!
export const resetPassword = async (token: string, newPassword: string, confirmPassword: string) => {
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const res = await fetch(`${URL}/auth/reset-password/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
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
    console.error("Error al enviar la solicitud de restablecimiento de contraseña:", error);
    throw error;
  }
};


//OBTENER TODOS LOS USUARIOS
// NO PUDE PROBARLA!!!!
export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`https://myapp-backend-latest.onrender.com/users`, {
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

export const getFair = async (token:string, idFair:string) => {
  try {
    const res = await fetch(`https://myapp-backend-latest.onrender.com/fairs/${idFair}`, {
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







