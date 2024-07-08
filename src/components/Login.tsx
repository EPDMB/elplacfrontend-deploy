"use client";
import { useFormik } from "formik";
import { postUserLogin } from "@/helpers/services";
import { IUserLogin, formTypeEnum } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { loginValidations } from "@/helpers/validations";
import Input from "./Input";
import Image from "next/image";
import profile from "@/assets/profile.svg";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./Notifications/Notifications";
import { useAuth } from "@/context/AuthProvider";

export const Login = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [ isLoading, setIsLoading ] = React.useState(false);

  const signIn = async (user: IUserLogin) => {
    try {
      const res = await postUserLogin(user);

      localStorage.setItem("token", res.token);
      setToken(res.token);

      formik.resetForm();
      notify("ToastSuccess", "¡Sesión iniciada!");
      router.push("/dashboard");
    } catch (error: any) {
      notify("ToastError", "Datos Incorrectos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: signIn,
    validate: loginValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.login,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IUserLogin],
      touched: formik.touched[name as keyof IUserLogin],
      errors: formik.errors[name as keyof IUserLogin],
    };
  };

  return (
    <div className="grow-down">
      <div className="relative h-max -translate-y-20 p-10  bg-white  rounded-[30px] shadow-lg mt-6">
        <div className="w-full text-center mb-6">
          <h1 className="text-secondary-darker mb-3 font-bold text-lg leading-relaxed">
            ¡RENOVÁ TU PLACARD!
          </h1>
          <div className="border border-secondary-darker w-[75%] m-auto mb-5"></div>
        </div>
        <button
          type="button"
          className="hidden lg:inline-block px-6 py-20 z-0 cursor-default bg-white rounded-tr-3xl rounded-br-3xl absolute right-0 translate-x-[99%] shadow-customRight">
          <p className="absolute font-medium left-[120%] text-secondary-darker">
            #Ingresá
          </p>
          <Image src={profile} alt="Icono de perfil" />
        </button>
        <form onSubmit={formik.handleSubmit} className="loginFormContent">
          <div className="mb-6 relative flex flex-col">
            <Input
              label="Email"
              type="email"
              placeholder="Juan"
              {...getProps("email")}
            />
          </div>
          <div className="mb-6 relative flex flex-col">
            <Input
              label="Password"
              type="password"
              placeholder="******"
              {...getProps("password")}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-secondary-darker w-32 h-9 my-6 rounded-3xl text-center text-white text-base font-bold"
              type="submit"
              disabled={!formik.isValid || isLoading}>
              
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                </div>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>
          <p className="font-semibold text-secondary-darker text-center">
            Olvidé mi contraseña
          </p>
        </form>
      </div>
    </div>
  );
};
