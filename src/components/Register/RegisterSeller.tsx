"use client";

import { postSellerRegister } from "@/helpers/services";
import { formTypeEnum, IRegisterProps, ISeller } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { registerSellerValidations } from "@/helpers/validations";
import Input from "../Input";
import { Checkbox, Label } from "flowbite-react";
import { notify } from "../Notifications/Notifications";

const RegisterSeller: React.FC = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const signUpSeller = async (seller: ISeller) => {
    const completeParsedSeller: ISeller = {
      ...seller,
    };
    try {
      await postSellerRegister(completeParsedSeller);
      formikSeller.resetForm();
      router.push("/login");
            notify(
              "ToastRedirect",
              "Revisa tu casilla de correo para confirmar tu cuenta"
            );
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const formikSeller = useFormik({
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
      id: "",
    },
    onSubmit: signUpSeller,
    validate: registerSellerValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      userType: true,
      formType: formTypeEnum.login,
      onChange: formikSeller.handleChange,
      onBlur: formikSeller.handleBlur,
      value: formikSeller.values[name as keyof ISeller],
      touched: formikSeller.touched[name as keyof ISeller],
      errors: formikSeller.errors[name as keyof ISeller],
    };
  };
  return (
    <form onSubmit={formikSeller.handleSubmit}>
      <div className="flex gap-4">
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Nombre"
            type="text"
            placeholder="Juan"
            {...getProps("name")}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Apellido"
            type="text"
            placeholder="Gomez"
            {...getProps("lastname")}
          />
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
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Email"
            type="email"
            placeholder="juangomez@gmail.com"
            {...getProps("email")}
          />
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
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Repetir contraseña"
            type="password"
            placeholder="********"
            {...getProps("confirmPassword")}
          />
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
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Dirección"
            type="text"
            placeholder="Av. Siempreviva 123"
            {...getProps("address")}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mb-6 relative flex flex-col">
          <Input
            label="CBU / CVU / Alias"
            type="text"
            placeholder="12345678"
            {...getProps("bank_account")}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <Input
            label="Instagram"
            type="text"
            placeholder="juan.gomez"
            {...getProps("social_media")}
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
          <span className={`${"text-primary-darker"} `}>Acepto los </span>
          <a href="#" className={`${"text-secondary-darker"} hover:underline `}>
            Términos y Condiciones
          </a>
        </Label>
      </div>
      <div className="flex justify-center">
        <button
          className={`
      bg-primary-dark w-32 h-9 my-6 rounded-3xl text-center text-white text-base font-bold
      ${
        !isChecked || !formikSeller.isValid
          ? "opacity-50 cursor-not-allowed"
          : ""
      }
    `}
          type="submit"
          disabled={!isChecked || !formikSeller.isValid}>
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default RegisterSeller;
