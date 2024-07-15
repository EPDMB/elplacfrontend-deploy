import { formTypeEnum, IForgot, IUserLogin, ModalProps } from "@/types";
import React from "react";
import Input from "./Input";
import { useFormik } from "formik";
import { forgotPassValidations, loginValidations } from "@/helpers/validations";
import { notify } from "./Notifications/Notifications";
import "react-toastify/dist/ReactToastify.css";
import { postForgotPassword } from "@/helpers/services";

const ForgotPass: React.FC<ModalProps> = ({ onCloseModal, message }) => {
  const forgotPassword = async (mail: IForgot) => {
    console.log(mail.email);
    try {
      await postForgotPassword(mail.email);
      notify("ToastSuccess", "¡Contraseña enviada!");
      onCloseModal();
    } catch (error: any) {
      notify("ToastError", "Datos Incorrectos");
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgotPassword,
    validate: forgotPassValidations,
  });

  const getProps = (name: string) => {
    return {
      name: name,
      formType: formTypeEnum.login,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name as keyof IForgot],
      touched: formik.touched[name as keyof IForgot],
      errors: formik.errors[name as keyof IForgot],
    };
  };

  return (
    <div
      className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onCloseModal}
    >
      <div
        className="bg-primary-lighter h-[40vh] w-[50vw] p-8 m-3 md:m-0 rounded-3xl relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-primary-darker rounded-full"
          onClick={onCloseModal}
        >
          ✖
        </button>
        <div className="flex justify-center items-center text-primary-darker">
          <p className="font-bold text-3xl flex items-center justify-center text-center text-primary-darker">
            {message}
          </p>
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Ingresa tu mail para recuperar tu contraseña"
              type="email"
              placeholder="juan@mail.com"
              {...getProps("email")}
            />
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="mt-4 px-4 py-2 text-white rounded-md hover:bg-primary-dark focus:outline-none bg-primary-darker disabled:cursor-not-allowed disabled:bg-primary-light"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
