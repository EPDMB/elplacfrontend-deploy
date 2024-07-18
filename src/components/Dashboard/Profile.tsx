"use client";
import { FaPencilAlt } from "react-icons/fa";

import {
  DashboardProps,
  IDashboardSeller,
  IDashboardSellerPayments,
  IDashboardUser,
  IFair,
  IPasswordChange,
  formTypeEnum,
  userDashboardProps,
} from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import profile from "../../assets/profile.png";

import { useFormik } from "formik";
import Input from "../Input";
import { decodeJWT } from "@/helpers/decoder";
import {
  getUser,
  putChangePassword,
  putSeller,
  putUser,
} from "@/helpers/services";
import { notify } from "../Notifications/Notifications";
import { useAuth } from "@/context/AuthProvider";
import {
  dashboardSellerPaymentsValidations,
  dashboardSellerValidations,
  dashboardUserValidations,
  passwordValidations,
} from "@/helpers/validations";
import { useProfile } from "@/context/ProfileProvider";
import { Calendar } from "../Fair/Calendar";
import Ticket from "../Fair/Ticket";
import TimeRange from "../Fair/TimeRange";
import { useFair } from "@/context/FairProvider";
import Dropdown from "../Dropdown";
import SidebarDashboard from "./SidebarDashboard";
import ProfileFairs from "./ProfileFilters/ProfileFairs";
import Navbar from "../Navbar";
import ProfileContact from "./ProfileFilters/ProfileContact";
import ProfileSettings from "./ProfileFilters/ProfileSettings";
import ProfilePayments from "./ProfileFilters/ProfilePayments";
import ProfileImage from "./ProfileFilters/ProfileImage";
import ProfileLeftFilters from "./ProfileFilters/ProfileLeftFilters";
import { URL } from "../../../envs";
import { useRouter } from "next/navigation";
import WithAuthProtect from "@/helpers/WithAuth";
import ProfileContactSeller from "./ProfileFilters/ProfileContactSeller";

function Welcome() {
  const [dashBoardFilter, setDashBoardFilter] = useState<string>(
    "Mis datos de contacto"
  );
  const router = useRouter();
  const { token } = useAuth();
  const { userDtos, setUserDtos, setProfileImageChanged } = useProfile();
  const [edit, setEdit] = useState(false);
  const [editSeller, setEditSeller] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFairSelected, activeFair } = useFair();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fairFilter, setFairFilter] = useState<IFair>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeArray = [activeFair] || [];

  const handleSelect = (option: { id: string; name: string }) => {
    setSelectedOption(option.name);
    const fairSelectedPerUser = activeArray.find(
      (f) => f?.name === option.name
    );

    setFairFilter(fairSelectedPerUser);
  };

  const formikUser = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userDtos?.name || "",
      lastname: userDtos?.lastname || "",
      email: userDtos?.email || "",
      dni: userDtos?.dni || "",
    },
    onSubmit: (values) => {
      handleUpdateUser(values as IDashboardUser);
    },
    validate: dashboardUserValidations,
  });
  const formikSeller = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userDtos?.name || "",
      lastname: userDtos?.lastname || "",
      email: userDtos?.email || "",
      dni: userDtos?.dni || "",
    },
    onSubmit: (values) => {
      handleUpdateUser(values as IDashboardUser);
    },
    validate: dashboardSellerValidations,
  });

  const formikSellerPayments = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: userDtos?.seller?.phone || null,
      address: userDtos?.seller?.address || null,
      bank_account: userDtos?.seller?.bank_account || null,
      social_media: userDtos?.seller?.social_media || null,
    },
    onSubmit: (values) => {
      handleUpdateSellerPayments(values as IDashboardSeller);
    },
    validate: dashboardSellerPaymentsValidations,
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
          const res = await fetch(`${URL}/files/uploadImage/${decoded.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
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
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && decoded.id && user) {
          await putUser(token, decoded.id, user);
          setEdit(false);
          formikUser.resetForm();
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

  const handleUpdateSellerPayments = async (user: IDashboardUser) => {
    try {


      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && userDtos?.seller?.id && user) {
          await putSeller(token, userDtos?.seller?.id, user);
          setEdit(false);
          formikUser.resetForm();
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
      label: name,
    };
  };

  const getPropsUser = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.dashboard_user,
      onChange: handleInputChange,
      disabled: !edit,
      onBlur: formikUser.handleBlur,
      value: formikUser.values[name as keyof IDashboardUser],
      touched: formikUser.touched[name as keyof IDashboardUser],
      errors: formikUser.errors[name as keyof IDashboardUser],
      edit: edit,
      label: name,
    };
  };
  const getPropsSeller = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.dashboard_user,
      onChange: handleInputChange,
      disabled: !edit,
      onBlur: formikSeller.handleBlur,
      value: formikSeller.values[name as keyof IDashboardUser],
      touched: formikSeller.touched[name as keyof IDashboardUser],
      errors: formikSeller.errors[name as keyof IDashboardUser],
      edit: edit,
      label: name,
    };
  };

  const getPropsSellerPayments = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.dashboard_user,
      onChange: handleInputChange,
      disabled: !editSeller,
      onBlur: formikSellerPayments.handleBlur,
      value:
        formikSellerPayments.values[name as keyof IDashboardSellerPayments],
      touched:
        formikSellerPayments.touched[name as keyof IDashboardSellerPayments],
      errors:
        formikSellerPayments.errors[name as keyof IDashboardSellerPayments],
      editSeller: editSeller,
      label: name,
    };
  };

  return (
    <div className="bg-secondary-lighter h-full">
      <div className="w-full h-32 flex items-center bg-primary-lighter">
        <Navbar />
      </div>

      <main className="grid grid-cols-4 sm:grid-cols-8 gap-0 relative place-content-center">
        <div className="bg-secondary-lighter h-full col-span-1 flex">
          <SidebarDashboard userRole={userDtos?.role} />
        </div>
        <div className="flex flex-col sm:flex-row col-span-3 items-center place-content-center sm:gap-20 sm:col-span-7 w-full">
          <div className="col-span-1 sm:col-span-3 p-5 md:py-8 xl:py-20">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 md:w-2/4"></div>
              <div className="sm:w-3/4 lg:w-2/3">
                <h1 className="text-primary-darker font-bold sm:text-xl lg:text-2xl xl:text-4xl">
                  Mi Perfil
                </h1>
                <ProfileLeftFilters
                  dashBoardFilter={dashBoardFilter}
                  setDashBoardFilter={setDashBoardFilter}
                  handleImageUpload={handleImageUpload}
                  fileInputRef={fileInputRef}
                  handleChangePhotoClick={handleChangePhotoClick}
                  userRole={userDtos?.role}
                />
              </div>
            </div>
          </div>

          <div className="ml-6 col-span-1 sm:col-span-4 p-5 md:py-8 xl:py-20">
            <div className="relative w-fit">
              <h1 className="text-primary-darker text-nowrap font-bold sm:text-2xl lg:text-2xl xl:text-4xl">
                {dashBoardFilter === "Mis datos de contacto" &&
                  "Datos de contacto"}
                {userDtos?.role === "user" &&
                  dashBoardFilter === "Ferias" &&
                  "Ferias"}
                {userDtos?.role === "seller" &&
                  dashBoardFilter === "Datos de vendedor" &&
                  "Datos de vendedor"}
                {dashBoardFilter === "Ajustes de cuenta" && "Ajustes de cuenta"}
              </h1>
              {dashBoardFilter === "Mis datos de contacto" && (
                <div className="absolute right-0 text-primary-dark w-fit h-fit">
                  <button
                    onClick={() => setEdit(!edit)}
                    className={`flex gap-1 items-center hover:underline ${
                      edit ? "hidden" : "inline"
                    }`}>
                    <h4 className="text-xs xl:text-lg">Editar</h4>
                    <FaPencilAlt size={8} />
                  </button>
                </div>
              )}
              {dashBoardFilter === "Datos de vendedor" && (
                <div className="absolute right-0 text-primary-dark w-fit h-fit">
                  <button
                    onClick={() => setEditSeller(!editSeller)}
                    className={`flex gap-1 items-center hover:underline ${
                      editSeller ? "hidden" : "inline"
                    }`}>
                    <h4 className="text-xs xl:text-lg">Editar</h4>
                    <FaPencilAlt size={8} />
                  </button>
                </div>
              )}
            </div>

            <div>
              {dashBoardFilter === "Mis datos de contacto" &&
                userDtos?.role === "user" && (
                  <ProfileContact
                    formikSeller={formikSeller}
                    getPropsSeller={getPropsSeller}
                    formikUser={formikUser}
                    getPropsUser={getPropsUser}
                    edit={edit}
                  />
                )}

              {dashBoardFilter === "Mis datos de contacto" &&
                userDtos?.role === "seller" && (
                  <ProfileContactSeller
                    formikSeller={formikSeller}
                    getPropsSeller={getPropsSeller}
                    formikUser={formikUser}
                    getPropsUser={getPropsUser}
                    edit={edit}
                  />
                )}

              {dashBoardFilter === "Datos de vendedor" && (
                <ProfilePayments
                  formikSellerPayments={formikSellerPayments}
                  getPropsSellerPayments={getPropsSellerPayments}
                  editSeller={editSeller}
                  formikSeller={formikSeller}
                  setEditSeller={setEditSeller}
                />
              )}

              {dashBoardFilter === "Ferias" && (
                <ProfileFairs
                  selectedOption={selectedOption}
                  fairs={activeArray}
                  handleSelect={handleSelect}
                  fairFilter={fairFilter}
                />
              )}

              {dashBoardFilter === "Ajustes de cuenta" && (
                <ProfileSettings getProps={getProps} formikPass={formikPass} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WithAuthProtect({
  Component: Welcome,
});
