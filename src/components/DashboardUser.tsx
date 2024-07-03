"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dashboard1 from "../assets/dashboard1.png";
import dashboard3 from "../assets/dashboard3.png";
import dashboard4 from "../assets/dashboard4.png";
import profile from "../assets/profile.png";
import { useAuth } from "@/context/AuthProvider.tsx";
import { FaPencilAlt } from "react-icons/fa";
import {
  IDashboardUser,
  IPasswordChange,
  UserDto,
  formTypeEnum,
} from "@/types";
import { getUser, putChangePassword, putUser } from "@/helpers/services";
import { decodeJWT } from "@/helpers/decoder";
import { useProfile } from "@/context/ProfileProvider";
import Input from "./Input";

import { useFormik } from "formik";
import {
  dashboardUserValidations,
  passwordValidations,
  registerValidations,
} from "@/helpers/validations";
import { notify } from "./Notifications/Notifications";

export const DashboardUser = () => {
  const { token } = useAuth();
  const { userDtos, setUserDtos, setProfileImageChanged } = useProfile();
  const [dashBoardFilter, setDashBoardFilter] = useState<string>(
    "Mis datos de contacto"
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.id) {
        const userProfile = async () => {
          const res = await getUser(token, decoded.id);
          setUserDtos(res);
        };
        userProfile();
      }
    }
  }, [token, triggerReload, setUserDtos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDtos((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.id) {
        try {
          const res = await fetch(
            `http://localhost:3000/files/uploadImage/${decoded.id}`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!res.ok) {
            throw new Error("Error al subir la imagen");
          }

          const imageUrl = userDtos?.profile_picture || "";

          setUserDtos((prev) =>
            prev ? { ...prev, profileImageUrl: imageUrl } : prev
          );
          setProfileImageChanged((prev) => !prev);
          setTriggerReload((prev) => !prev);
        } catch (error) {
          console.error("Error al manejar la subida de la imagen:", error);
        }
      }
    }
  };

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateUser = async (user: IDashboardUser) => {
    try {
      console.log("Entre al submit");
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && decoded.id && user) {
          await putUser(token, decoded.id, user);
          setEdit(false);
          formik.resetForm();
          notify("ToastSuccess", "Datos actualizados correctamente");
        } else {
          console.error("Datos insuficientes para actualizar el usuario");
        }
      } else {
        console.error("Token no disponible");
      }
    } catch (error) {
      notify("ToastError", "Error al actualizar los datos");
      console.error("Error en handleUpdateUser:", error);
    }
  };

  const changePassword = async (pass: IPasswordChange) => {
    try {
      const decoded = decodeJWT(token);
      await putChangePassword(decoded.id, token, pass);
      formikPass.resetForm();
      notify("ToastSuccess", "¡Sesión iniciada!");
    } catch (error: any) {
      notify("ToastError", "Datos Incorrectos");
      console.error(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userDtos?.name || "",
      lastname: userDtos?.lastname || "",
      email: userDtos?.email || "",
      phone: userDtos?.phone || "",
      address: userDtos?.address || "",
    },
    onSubmit: (values) => {
      handleUpdateUser(values as IDashboardUser);
    },
    validate: dashboardUserValidations,
  });

  const formikPass = useFormik({
    initialValues: {
      current_password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: changePassword,
    validate: passwordValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.dashboard_user,
      onChange: formikPass.handleChange,
      onBlur: formikPass.handleBlur,
      value: formikPass.values[name as keyof IPasswordChange],
    };
  };

  const getPropsContact = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.dashboard_user,
      onChange: handleInputChange,
      disabled: !edit,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IDashboardUser],
    };
  };

  return (
    <div className="grid grid-cols-6 h-max place-content-center  bg-secondary-lighter">
      <div className="col-span-1  bg-primary-light">Icono</div>
      <div className="col-span-5 my-12 p-2 grid grid-cols-3 gap-4 m-auto place-content-center  ">
        <div className="text-primary-darker col-span-1  pl-2">
          <div className="border-r border-gray-600 pr-4">
            <div className="flex items-center">
              <h3 className="text-[1.4rem] sm:text-2xl lg:text-3xl font-semibold">
                Mi cuenta
              </h3>
            </div>
            <div className="flex flex-col gap-5 py-9">
              <div className="w-full flex  items-center gap-3">
                <div className="h-5 w-5">
                  <Image
                    src={dashboard1}
                    alt="user"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <button
                  className={`text-[12px] sm:text-base xl:text-2xl hover:text-secondary-darker w-fit hover:cursor-pointer ${
                    dashBoardFilter === "Mis datos de contacto" && "font-medium"
                  }`}
                  onClick={() => setDashBoardFilter("Mis datos de contacto")}>
                  Datos de contacto
                </button>
              </div>
              <div className="w-full h-auto flex flex-row items-center gap-3">
                <div className="h-5 w-5">
                  <Image
                    src={dashboard3}
                    alt="payments"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <button
                  className={`text-[12px] sm:text-base xl:text-2xl hover:text-secondary-dark w-fit hover:cursor-pointer ${
                    dashBoardFilter === "Historial de Ferias" && "font-medium"
                  }`}
                  onClick={() => setDashBoardFilter("Historial de Ferias")}>
                  Historial de Ferias
                </button>
              </div>
              <div className="w-full h-auto flex flex-row items-center gap-3">
                <div className="h-5 w-5">
                  <Image
                    src={dashboard4}
                    alt="config"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <button
                  className={`text-[12px] sm:text-base xl:text-2xl hover:text-secondary-darker w-fit hover:cursor-pointer ${
                    dashBoardFilter === "Ajustes de cuenta" && "font-medium"
                  }`}
                  onClick={() => setDashBoardFilter("Ajustes de cuenta")}>
                  Ajustes de cuenta
                </button>
              </div>
              <div className="flex flex-col text-center">
                <div className="mb-12 mt-4 relative group h-32 w-32 lg:h-44 lg:w-44 rounded-full border border-secondary-darker flex items-center justify-center bg-slate-100 overflow-hidden">
                  <Image
                    src={userDtos?.profile_picture || profile}
                    alt="user"
                    fill
                    style={{ objectFit: "cover" }}
                    objectPosition="0px 0px"
                    className="rounded-full overflow-hidden"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                  <button
                    className="absolute bottom-0 right-0 text-sm opacity-0 hover:opacity-100 bg-primary-darker bg-opacity-50 w-full justify-center p-1"
                    onClick={handleChangePhotoClick}>
                    Cambiar <br />
                    foto 🖌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2  w-fit pl-4">
          <div className="flex-1 ml-8">
            <div className="text-primary-darker">
              <div className="flex items-center">
                <div className="relative">
                  <h1 className="text-[1.4rem] sm:text-2xl text-nowrap font-semibold">
                    {dashBoardFilter === "Mis datos de contacto" &&
                      "Datos de contacto"}
                    {dashBoardFilter === "Historial de Ferias" &&
                      "Historial de Ferias"}
                    {dashBoardFilter === "Ajustes de cuenta" &&
                      "Ajustes de cuenta"}
                  </h1>
                  {dashBoardFilter === "Mis datos de contacto" && (
                    <div className="absolute left-0">
                      <button
                        onClick={() => setEdit(!edit)}
                        className={`flex gap-1 items-center hover:underline ${
                          edit ? "hidden" : "inline"
                        }`}>
                        <h4 className="text-sm">Editar</h4>
                        <FaPencilAlt />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex flex-col mt-2">
                {dashBoardFilter === "Mis datos de contacto" && (
                  <div className="py-4 text-primary-dark">
                    <form onSubmit={formik.handleSubmit}>
                      <Input
                        type="text"
                        label="Nombre"
                        {...getPropsContact("name")}
                      />
                      {formik.touched.name && formik.errors.name && edit && (
                        <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                          {formik.errors.name}
                        </p>
                      )}
                      <Input
                        type="text"
                        label="Apellido"
                        {...getPropsContact("lastname")}
                      />
                      {formik.touched.lastname &&
                        formik.errors.lastname &&
                        edit && (
                          <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                            {formik.errors.lastname}
                          </p>
                        )}
                      <Input
                        type="email"
                        label="Email"
                        {...getPropsContact("email")}
                      />
                      {formik.touched.email && formik.errors.email && edit && (
                        <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                          {formik.errors.email}
                        </p>
                      )}
                      <Input
                        type="text"
                        label="Teléfono"
                        {...getPropsContact("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone && edit && (
                        <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                          {formik.errors.phone}
                        </p>
                      )}
                      <Input
                        type="text"
                        label="Dirección"
                        {...getPropsContact("address")}
                      />
                      {formik.touched.address &&
                        formik.errors.address &&
                        edit && (
                          <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                            {formik.errors.address}
                          </p>
                        )}
                      {edit && (
                        <button
                          type="submit"
                          disabled={!formikPass.isValid}
                          className="bg-primary-darker absolute text-white p-2 rounded">
                          Guardar Cambios
                        </button>
                      )}
                    </form>
                  </div>
                )}

                {dashBoardFilter === "Mis medios de pago" && (
                  <div className="flex flex-col py-4 text-primary-dark">
                    <label className="text-sm font-bold sm:text-base">
                      CBU / CVU / Alias
                    </label>
                    <div className="bg-transparent border-b border-primary-dark mb-2">
                      {userDtos?.bank_account || "No especificado"}
                    </div>

                    <label className="text-sm font-bold sm:text-base">
                      Tarjeta de crédito
                    </label>
                    <div className="bg-transparent border-b border-primary-dark mb-2">
                      {userDtos?.credit_card || "No especificado"}
                    </div>
                  </div>
                )}

                {dashBoardFilter === "Historial de Ferias" && (
                  <div className="flex flex-col w-fit py-4 text-primary-dark">
                    <label className="text-sm font-semibold sm:text-base">
                      Ferias realizadas
                    </label>
                    <div className="bg-transparent border-b text-wrap border-primary-dark mb-2">
                      {userDtos?.ferias ||
                        "¡No has participado en ninguna feria todavía!"}
                    </div>
                  </div>
                )}

                {dashBoardFilter === "Ajustes de cuenta" && (
                  <div className="flex flex-col py-4 text-primary-dark">
                    <form onSubmit={formikPass.handleSubmit}>
                      <div>
                        <Input
                          type="password"
                          label="Contraseña actual"
                          placeholder="********"
                          {...getProps("current_password")}
                        />
                        {formikPass.touched.current_password &&
                          formikPass.errors.current_password && (
                            <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                              {formikPass.errors.current_password}
                            </p>
                          )}

                        <Input
                          type="password"
                          label="Nueva contraseña"
                          placeholder="********"
                          {...getProps("new_password")}
                        />
                        {formikPass.touched.newPassword &&
                          formikPass.errors.newPassword && (
                            <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                              {formikPass.errors.newPassword}
                            </p>
                          )}
                        <Input
                          type="password"
                          label="Confirmar contraseña"
                          placeholder="********"
                          {...getProps("confirm_password")}
                        />
                        {formikPass.touched.confirmNewPassword &&
                          formikPass.errors.confirmNewPassword && (
                            <p className="text-red-600 absolute -translate-y-[120%] font-medium text-center text-sm">
                              {formikPass.errors.confirmNewPassword}
                            </p>
                          )}
                      </div>
                      <button
                        type="submit"
                        disabled={!formikPass.isValid}
                        className="bg-primary-darker absolute text-white p-2 rounded">
                        Guardar Cambios
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardUser;
