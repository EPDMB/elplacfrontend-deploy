"use client";
import { useFormik } from "formik";
import { postSellerRegister, postUserRegister } from "@/helpers/services";
import { IRegisterProps, ISeller, IUser, formTypeEnum } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { registerValidations } from "@/helpers/validations";
import Input from "../Input";
import buy from "@/assets/buy.svg";
import sell from "@/assets/sell.svg";
import Image from "next/image";
import { Checkbox, Label } from "flowbite-react";
import { notify } from "../Notifications/Notifications";

export const Register: React.FC<IRegisterProps> = ({
  onUserTypeChange,
  userType,
}) => {
  const router = useRouter();
  // seller = true
  // buyer = false

  const handleUserTypeChange = (newUserType: boolean) => {
    onUserTypeChange(newUserType);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const signUp = async (user: IUser) => {
    const filteredParsedUser: Partial<IUser> = Object.fromEntries(
      Object.entries(user).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    try {
      await postUserRegister(filteredParsedUser);

      formik.resetForm();
      router.push("/login");
      notify(
        "ToastRedirect",
        "Revisa tu casilla de correo para confirmar tu cuenta"
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const signUpSeller = async (seller: ISeller) => {
    const completeParsedSeller: ISeller = {
      ...seller,
    };
    try {
      await postSellerRegister(completeParsedSeller);
      formik.resetForm();
      router.push("/login");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      dni: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      bank_account: "",
      social_media: "",
    },
    onSubmit: userType ? signUpSeller : signUp,
    validate: registerValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      userType: userType,
      formType: formTypeEnum.login,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IUser],
    };
  };

  return (
    <div className="grow-down">
      <div className=" relative h-max -translate-y-20 p-10  bg-white  rounded-b-[30px] lg:rounded-[30px] shadow-lg mt-6">
        {userType ? (
          <>
            <div className="w-80 m-auto">
              <h1 className="text-primary-dark h-12 mb-3  font-bold text-lg leading-relaxed text-center">
                ¿QUERÉS VENDER TUS PRODUCTOS EN LA PRÓXIMA FERIA?
              </h1>
            </div>
            <div className="border border-primary-default w-[75%] m-auto mb-5"></div>
          </>
        ) : (
          <>
            <div className="w-80 m-auto">
              <h1 className="text-secondary-darker h-12 mb-3 font-bold text-lg leading-relaxed text-center">
                ¿QUERÉS RENOVAR EL PLACARD?
              </h1>
            </div>
            <div className="border border-secondary-darker w-[75%] m-auto mb-5"></div>
          </>
        )}
        <button
          type="button"
          onClick={() => handleUserTypeChange(false)}
          className={`w-[51%] lg:w-fit py-6 lg:px-6 lg:py-20 cursor-pointer ${
            userType ? "bg-[#F8F8F8]" : "bg-white"
          } lg:rounded-tl-3xl lg:rounded-bl-3xl flex flex-col items-center gap-2 absolute top-0 lg:top-auto rounded-tl-[30px]  -translate-y-[99%] lg:-translate-y-0  left-0 lg:-translate-x-[99%] shadow-lg sm:shadow-mobileLeft lg:shadow-customLeft`}>
          <p className="lg:absolute font-medium max-h-5 lg:-left-[120%] text-secondary-darker">
            #Comprá
          </p>
          <Image src={buy} className="h-5" alt="Icono de compra" />
        </button>
        <button
          type="button"
          onClick={() => handleUserTypeChange(true)}
          className={`w-1/2 lg:w-fit py-6  lg:px-6 lg:py-20 cursor-pointer ${
            userType ? "bg-white" : "bg-[#F8F8F8]"
          } lg:rounded-tl-3xl lg:rounded-bl-3xl flex flex-col items-center gap-2 absolute rounded-tr-[30px] lg:rounded-tr-[0px] top-0 lg:top-auto translate-x-[100%] -translate-y-[99%] left-0 lg:-translate-x-[99%] lg:translate-y-[99%] shadow-mobileRight lg:shadow-customLeft`}>
          <p className="lg:absolute font-medium max-h-5  lg:-left-[120%] text-primary-dark">
            #Vendé
          </p>
          <Image src={sell} className="h-5" alt="Icono de venta" />
        </button>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Nombre"
                type="text"
                placeholder="Juan"
                {...getProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Apellido"
                type="text"
                placeholder="Gomez"
                {...getProps("lastname")}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.lastname}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="DNI"
                type="text"
                placeholder="40500300"
                {...getProps("dni")}
              />
              {formik.touched.dni && formik.errors.dni && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.dni}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Email"
                type="email"
                placeholder="juangomez@gmail.com"
                {...getProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Teléfono"
                type="text"
                placeholder="+54 11 3030-3030"
                {...getProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Dirección"
                type="text"
                placeholder="Av. Siempreviva 123"
                {...getProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Contraseña"
                type="password"
                placeholder="********"
                {...getProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="mb-6 relative flex flex-col">
              <Input
                label="Repetir contraseña"
                type="password"
                placeholder="********"
                {...getProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>
          {userType && (
            <>
              <div className="flex gap-4">
                <div className="mb-6 relative flex flex-col">
                  <Input
                    label="CBU / CVU / Alias"
                    type="text"
                    placeholder="12345678"
                    {...getProps("bank_account")}
                  />
                  {formik.touched.bank_account &&
                    formik.errors.bank_account && (
                      <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                        {formik.errors.bank_account}
                      </p>
                    )}
                </div>
                <div className="mb-6 relative flex flex-col">
                  <Input
                    label="Instagram"
                    type="text"
                    placeholder="juan.gomez"
                    {...getProps("social_media")}
                  />
                  {formik.touched.social_media &&
                    formik.errors.social_media && (
                      <p className="text-red-600 absolute left-0 bottom-0 translate-y-[100%] font-medium text-center text-sm">
                        {formik.errors.social_media}
                      </p>
                    )}
                </div>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              id="accept"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Label
              htmlFor="accept"
              className={`flex ${
                userType ? "text-primary-dark" : "text-secondary-darker"
              }`}>
              Acepto los&nbsp;
              <a
                href="#"
                className={`${
                  userType ? "text-secondary-darker" : "text-primary-dark"
                } hover:underline `}>
                Términos y Condiciones
              </a>
            </Label>
          </div>
          <div className="flex justify-center">
            <button
              className={`
                ${userType ? "bg-primary-dark" : "bg-secondary-darker"}
                w-32 h-9 my-6 rounded-3xl text-center text-white text-base font-bold
                ${
                  !isChecked || !formik.isValid
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
              type="submit"
              disabled={!isChecked || !formik.isValid}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
