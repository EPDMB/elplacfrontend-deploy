"use client";
import { FaPencilAlt } from "react-icons/fa";

import {
  DashboardProps,
  IDashboardUser,
  IPasswordChange,
  formTypeEnum,
  userDashboardProps,
} from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dashboard1 from "../../assets/dashboard1.png";
import dashboard3 from "../../assets/dashboard3.png";
import dashboard4 from "../../assets/dashboard4.png";
import profile from "../../assets/profile.png";

import { useFormik } from "formik";
import Input from "../Input";
import { decodeJWT } from "@/helpers/decoder";
import { getUser, putChangePassword, putUser } from "@/helpers/services";
import { notify } from "../Notifications/Notifications";
import { useAuth } from "@/context/AuthProvider";
import {
  dashboardUserValidations,
  passwordValidations,
} from "@/helpers/validations";
import { useProfile } from "@/context/ProfileProvider";
import { Calendar } from "../Fair/Calendar";
import Ticket from "../Fair/Ticket";
import TimeRange from "../Fair/TimeRange";
import { useFair } from "@/context/FairProvider";

function Welcome() {
  const [dashBoardFilter, setDashBoardFilter] = useState<string>(
    "Mis datos de contacto"
  );

  const { token } = useAuth();
  const { userDtos, setUserDtos, setProfileImageChanged } = useProfile();
  const [edit, setEdit] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fair } = useFair();
  console.log(fair);

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
            `https://myapp-backend-latest.onrender.com/files/uploadImage/${decoded.id}`,
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
      touched: formikPass.touched[name as keyof IPasswordChange],
      errors: formikPass.errors[name as keyof IPasswordChange],
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
      touched: formik.touched[name as keyof IDashboardUser],
      errors: formik.errors[name as keyof IDashboardUser],
      edit: edit,
    };
  };

  return (
    <div>
      <div className="grid grid-cols-3  md:grid-rows-12 bg-secondary-lighter gap-0  h-fit md:h-screen w-full pl-4">
        <div className="col-span-3 row-span-1 md:row-span-1 bg-secondary-lighter ">
          <h1 className="text-[1.4rem] sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl  font-semibold text-primary-darker p-5">
            Bienvenid@ {userDtos?.name}!
          </h1>
        </div>
        <div className="col-span-1 gap-3 row-span-3  md:row-span-8 text-primary-darker flex flex-col bg-secondary-lighter text-start md:pt-6 border-r border-[#918484] mr-2 sm:mr-4">
          <div className="w-full flex  items-center gap-1 pl-1 sm:gap-3 sm:pl-4">
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
              className={`text-[10px] text-start sm:text-base xl:text-2xl hover:text-secondary-darker w-fit hover:cursor-pointer ${
                dashBoardFilter === "Mis datos de contacto" && "font-bold"
              }`}
              onClick={() => setDashBoardFilter("Mis datos de contacto")}
            >
              Datos de contacto
            </button>
          </div>
          <div className="w-full h-auto flex flex-row items-center gap-1 pl-1 sm:gap-3 sm:pl-4">
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
              className={`text-[10px] text-start sm:text-base xl:text-2xl hover:text-secondary-dark w-fit hover:cursor-pointer ${
                dashBoardFilter === "Ferias" && "font-bold"
              }`}
              onClick={() => setDashBoardFilter("Ferias")}
            >
              Ferias
            </button>
          </div>
          <div className="w-full h-auto flex flex-row items-center gap-1 pl-1 sm:gap-3 sm:pl-4">
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
              className={`text-[10px] text-start sm:text-base xl:text-2xl hover:text-secondary-darker w-fit hover:cursor-pointer ${
                dashBoardFilter === "Ajustes de cuenta" && "font-bold"
              }`}
              onClick={() => setDashBoardFilter("Ajustes de cuenta")}
            >
              Ajustes de cuenta
            </button>
          </div>
          <div className="mb-12 sm:ml-5 mt-4 relative group h-16 w-16 sm:h-20 sm:w-20 lg:h-44 lg:w-44 rounded-full border border-secondary-darker flex items-center justify-center bg-slate-100 overflow-hidden">
            <Image
              src={userDtos?.profile_picture || profile}
              alt="user"
              width={150}
              height={150}
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
              onClick={handleChangePhotoClick}
            >
              Cambiar <br />
              foto 🖌
            </button>
          </div>
        </div>
        <div className="col-span-2 row-span-1 md:p-5">
          <div className="flex items-center text-primary-dark">
            <div className="relative sm:flex items-center justify-center">
              <h1 className="text-[1rem] sm:text-2xl text-nowrap font-semibold">
                {dashBoardFilter === "Mis datos de contacto" &&
                  "Datos de contacto"}
                {dashBoardFilter === "Ferias" && "Ferias"}
                {dashBoardFilter === "Ajustes de cuenta" && "Ajustes de cuenta"}
              </h1>
              {dashBoardFilter === "Mis datos de contacto" && (
                <div className="absolute left-0 sm:relative sm:ml-2">
                  <button
                    onClick={() => setEdit(!edit)}
                    className={`flex gap-1 items-center hover:underline ${
                      edit ? "hidden" : "inline"
                    }`}
                  >
                    <h4 className="text-xs">Editar</h4>
                    <FaPencilAlt size={8} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 row-span-1 mt-2 ">
            {dashBoardFilter === "Mis datos de contacto" && (
              <div className="py-4 text-primary-dark">
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    type="text"
                    label="Nombre"
                    {...getPropsContact("name")}
                  />

                  <Input
                    type="text"
                    label="Apellido"
                    {...getPropsContact("lastname")}
                  />

                  <Input
                    type="email"
                    label="Email"
                    {...getPropsContact("email")}
                  />

                  <Input
                    type="text"
                    label="Teléfono"
                    {...getPropsContact("phone")}
                  />

                  <Input
                    type="text"
                    label="Dirección"
                    {...getPropsContact("address")}
                  />

                  {edit && (
                    <button
                      type="submit"
                      disabled={!formikPass.isValid}
                      className="bg-primary-darker absolute text-white p-2 rounded"
                    >
                      Guardar Cambios
                    </button>
                  )}
                </form>
              </div>
            )}

            {dashBoardFilter === "Mis medios de pago" && (
              <div className="col-span-2 row-span-1 mt-2 py-4 text-primary-dark">
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

            {dashBoardFilter === "Ferias" && (
              <div className="col-span-2 row-span-1 mt-2 py-4 text-primary-dark">
                <label className="text-sm font-semibold sm:text-base">
                  Ferias realizadas
                </label>
                <div className="bg-transparent border-b text-wrap border-primary-dark mb-2">
                  {userDtos?.ferias ||
                    "¡No has participado en ninguna feria todavía!"}
                </div>
                <label className="text-sm font-semibold sm:text-base">
                  Ferias Disponibles
                </label>
                <button>{fair?.name || "No hay ferias disponibles"}</button>
                <Calendar />
                <TimeRange />
                <Ticket />
              </div>
            )}

            {dashBoardFilter === "Ajustes de cuenta" && (
              <div className="col-span-2 row-span-1 mt-2 py-4 mb-12 md:mb-0 text-primary-dark">
                <form onSubmit={formikPass.handleSubmit}>
                  <div>
                    <Input
                      type="password"
                      label="Contraseña actual"
                      placeholder="********"
                      {...getProps("current_password")}
                    />

                    <Input
                      type="password"
                      label="Nueva contraseña"
                      placeholder="********"
                      {...getProps("newPassword")}
                    />

                    <Input
                      type="password"
                      label="Confirmar contraseña"
                      placeholder="********"
                      {...getProps("confirmNewPassword")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!formikPass.isValid}
                    className="bg-primary-darker absolute text-white p-2 rounded hover:bg-primary-dark md:h-8 flex items-center justify-center md:w-36 md:text-base text-xs sm:text-sm "
                  >
                    Guardar Cambios
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
