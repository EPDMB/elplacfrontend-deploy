"use client";

import { postUserRegister } from "@/helpers/services";
import { formTypeEnum, IRegisterProps, IUser } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { notify } from "../Notifications/Notifications";
import { useFormik } from "formik";
import { registerUserValidations } from "@/helpers/validations";
import Input from "../Input";
import { Checkbox, Label } from "flowbite-react";

const RegisterUser: React.FC = () => {
  const router = useRouter();

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

      formikUser.resetForm();
      router.push("/login");
      notify(
        "ToastRedirect",
        "Revisa tu casilla de correo para confirmar tu cuenta"
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const formikUser = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: signUp,
    validate: registerUserValidations,
  });

  const getPropsUser = (name: string) => {
    return {
      name: name,
      userType: false,
      formType: formTypeEnum.login,
      onChange: formikUser.handleChange,
      onBlur: formikUser.handleBlur,
      value: formikUser.values[name as keyof IUser],
      touched: formikUser.touched[name as keyof IUser],
      errors: formikUser.errors[name as keyof IUser],
    };
  };

  return (
    <form onSubmit={formikUser.handleSubmit}>
      <div className="flex gap-4">
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Nombre"
            type="text"
            placeholder="Juan"
            {...getPropsUser("name")}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Apellido"
            type="text"
            placeholder="Gomez"
            {...getPropsUser("lastname")}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-6 relative flex flex-col">
          <Input
            label="DNI"
            type="text"
            placeholder="40500300"
            {...getPropsUser("dni")}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Email"
            type="email"
            placeholder="juangomez@gmail.com"
            {...getPropsUser("email")}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            {...getPropsUser("password")}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Repetir contraseña"
            type="password"
            placeholder="********"
            {...getPropsUser("confirmPassword")}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="accept"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Label>
          <span className={` ${"text-secondary-darker"}`}>Acepto los </span>
          <a href="#" className={`${"text-primary-dark"} hover:underline `}>
            Términos y Condiciones
          </a>
        </Label>
      </div>
      <div className="flex justify-center">
        <button
          className={`
      bg-secondary-darker
      w-32 h-9 my-6 rounded-3xl text-center text-white text-base font-bold
      ${
        !isChecked || !formikUser.isValid ? "opacity-50 cursor-not-allowed" : ""
      }
    `}
          type="submit"
          disabled={!isChecked || !formikUser.isValid}>
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default RegisterUser;
